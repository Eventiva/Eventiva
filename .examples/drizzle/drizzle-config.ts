/*
 * File: drizzle-config.ts
 * Last Modified: 11/02/2025, 14:04
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */
import { LoggerConfig, type LoggerConfigType } from '@encircle-marketing/crm.utilities.logging.logger'
import { Config } from 'effect'

// use this type for your aspect config.
/**
 * DrizzleConfigType is a configuration type for defining the settings related to logging
 * and database client selection in an application.
 *
 * The configuration includes:
 * - logger: This defines the configuration for logging. It utilizes LoggerConfigType.
 * - client: Specifies the type of database client. It can be one of 'PostgreSQL', 'MySql', or 'SQLite'.
 */
export type DrizzleConfigType = {
    logger: LoggerConfigType,
    client: 'PostgreSQL' | 'MySql' | 'SQLite'
}

/**
 * Class representing the configuration settings for the Drizzle application.
 * This class implements the Readonly interface of DrizzleConfigType.
 */
export class DrizzleConfig
    implements Readonly<DrizzleConfigType> {
    static config = Config.map(
        Config.all(
            [
                Config.nested(
                    LoggerConfig.config,
                    'LOGGER'
                ).pipe( Config.withDefault( {
                    level: 'Debug',
                    module: 'utilities:drizzle'
                } ) ),
                Config.literal( 'PostgreSQL', 'MySql', 'SQLite' )( 'CLIENT' ).pipe(
                    Config.withDefault( 'PostgreSQL' )
                )
            ]
        ),
        ( [ logger, client ] ) => new DrizzleConfig( {
            logger,
            client
        } )
    )
    readonly logger!: DrizzleConfigType['logger']
    readonly client!: DrizzleConfigType['client']

    constructor ( config: DrizzleConfigType ) {
        Object.assign( this, config )
    }
}
