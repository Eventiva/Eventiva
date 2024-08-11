/*
 * Project: Eventiva
 * File: discord-changelog.ts
 * Last Modified: 11/08/2024, 21:57
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ChangelogResult } from '@eventiva/workflows.generate-changelog'
import * as Discord from 'discord.js'

export type SendToDiscordConfig = {
    name: string
    channelId: string,
    authorName: string
    config: { [ key: string ]: Field }
}


export type Field = {
    title: string
    description: string
    color: Discord.ColorResolvable | null
    included: string[]
}

export async function sendToDiscord (
    results: ChangelogResult,
    config: SendToDiscordConfig
) {
    const discord = new Discord.Client( {
        intents: []
    } )

    await discord.login( ( process.env.DISCORD_BOT_TOKEN as string ) )

    const discordChannel = await discord.channels.fetch( config.channelId )

    if ( !discordChannel ) {
        throw new Error( `Discord channel ${ config.channelId } not found` )
    }

    if ( !discordChannel.isTextBased() ) {
        throw new Error( `Discord channel ${ config.channelId } is not text-based` )
    }
    const embeds: Discord.EmbedBuilder[] = []

    // Create the introduction message
    embeds.push( new Discord.EmbedBuilder()
        .setTitle( `${ results.moduleName } - Changes Summary - ${ results.latestTag }` )
        .setDescription( `I'm proud to confirm that we have released an update for the ${ results.moduleName } component.  Our team is working hard to release updates regularly, and we look forward to your feedback on the latest release.` )
        .setColor( 5777581 )
        .setAuthor( { name: config.authorName } )
    )

    Object.values( config.config ).forEach( ( field ) => {
        const embed = new Discord.EmbedBuilder()
            .setTitle( field.title )
            .setDescription( field.description )
            .setColor( field.color )

        const fields: any[] = []

        field.included.forEach( type => {
            if ( type in results.changes ) {
                fields.push( ...results.changes[ type ].map( change => {
                        return { name: String( change.name ), value: String( change.value ) }
                    } )
                )
            }
        } )

        if ( !fields.length ) {
            return
        }

        embed.addFields( fields )
        embeds.push( embed )
    } )

    const date = ( new Date( results.releaseDate ?? Date.now() ) )
    date.setFullYear( date.getFullYear() + 2 )
    const futuresDate = date.toISOString().split( 'T' )[ 0 ]

    embeds.push(
        new Discord.EmbedBuilder()
            .setTitle( 'License Reminder' )
            .setDescription( `This module is now under the Functional Source License - MIT Future License as per the current license version distributed. You can use this component as distributed version ${ results.latestTag } under the MIT License starting on the ${ futuresDate }.` )
    )

    const message = await discordChannel.send(
        Discord.MessagePayload.create( discordChannel, {
            embeds
        } )
    )
    await message.crosspost()
    await discord.destroy()
}
