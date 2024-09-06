/*
 * Project: Eventiva
 * File: symphony.node.runtime.ts
 * Last Modified: 06/09/2024, 08:12
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 *  and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 *  welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 *  https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 *  (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 *   in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 *   functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 *   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 *   PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 *   copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 *   licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 *   https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 *  or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 *  License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 *  Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 *  https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import {
    PlatformDeployerContext,
    SymphonyPlatformAspect,
    type SymphonyPlatformNode
} from '@bitdev/symphony.symphony-platform'
import { LaneId } from '@teambit/lane-id'
import { App as TFApp, TerraformStack } from 'cdktf'
import { Construct as TFConstruct } from 'constructs'
import type { Construct, ConstructSlot } from './construct'
import { type Stack, StackSlot } from './stack'
import type { SymphonyConfig } from './symphony-config'

class SymphonyStack
    extends TerraformStack {
    constructor (
        scope: TFConstruct,
        id: string,
        Constructs: ConstructSlot,
        config: SymphonyConfig & Stack['condition']
    ) {
        super( scope, id )
        for ( let construct of Constructs.flatValues() ) {
            if ( config.type === 'stackVariable' ) {
                if ( !config[ config.target as keyof SymphonyConfig ] === config.value ) {
                    continue
                }
            } else if ( config.type === 'constructVariable' ) {
                if ( !construct.config[ config.target ] === config.value ) {
                    continue
                }
            }

            construct.node( this, construct.name, construct.config )
        }
    }
}

export class SymphonyNode {
    static dependencies = [ SymphonyPlatformAspect ]
    static defaultConfig: SymphonyConfig = {
        runtime: 'development'
    }

    constructor (
        private config: SymphonyConfig,
        private constructSlot: ConstructSlot,
        private stackSlot: StackSlot
    ) {

    }

    static async provider (
        [ symphonyPlatformNode ]: [ SymphonyPlatformNode ],
        config: SymphonyConfig,
        [ constructSlot, stackSlot ]: [ ConstructSlot, StackSlot ]
    ) {
        const symphony = new SymphonyNode( config, constructSlot, stackSlot )

        symphonyPlatformNode.registerDeplorers( [
            {
                deploy: async ( context: PlatformDeployerContext ) => {
                    await symphony.deploy( context )
                    return {}
                }
            }
        ] )

        return symphony
    }

    registerConstructs<TConfig extends {} = {}> ( constructs: Construct<TConfig>[] ) {
        this.constructSlot.register( constructs )
        return this
    }

    registerStacks ( stacks: Stack[] ) {
        this.stackSlot.register( stacks )
        return this
    }

    async deploy ( deployContext: PlatformDeployerContext ) {
        const { appName, version, runtimesContext, inSecure, laneId } = deployContext

        console.log( appName, version, runtimesContext, inSecure, laneId )
        const namespace = this.generateNamespaceId( appName, laneId )
        console.log( namespace )

        const terraform = new TFApp()
        // const stack = new MyStack(app, namespace);

        for ( let stack of this.stackSlot.flatValues().values() ) {
            new SymphonyStack( terraform, stack.name, this.constructSlot, {
                ...this.config,
                ...stack.condition
            } )
        }

        // 1. Synthesize the configuration
        terraform.synth()

        // 2. Execute `cdktf plan` programmatically
        // await app.run(["plan"]); // TODO: this doesn't exist. Need to interface with the command instead maybe?

        // Optionally: check plan output and decide if you want to proceed

        // 3. Apply the plan
        // await app.run(["apply", "-auto-approve"]); // TODO: this doesn't exist. Need to interface with the command
        // instead maybe?
    }

    private generateNamespaceId (
        appName: string,
        laneId?: LaneId
    ) {
        if ( !laneId ) {
            return 'main'
        }
        const safeLaneId = laneId.toString().replaceAll( '.', '-' ).replaceAll( '/', '-' );
        return `${ appName }-${ safeLaneId }`;
    }
}

export default SymphonyNode
