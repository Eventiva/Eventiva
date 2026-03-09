/*
 * File: postgres.node.runtime.ts
 * Last Modified: 19/02/2025, 08:30
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */

import { type ConfigEntry, ConfigMap, TypedConfigMap } from '@encircle-marketing/crm.utilities.helpers.config'
import { EffectProviderReturn } from '@encircle-marketing/crm.utilities.helpers.providers'
import { Config, Context, Effect, Layer, Redacted, Ref } from 'effect'
import pg from 'pg'
import { PostgresConfig, PostgresConfigType } from './postgres-config.js'

const { Pool } = pg

/**
 * The `PostgresConfigService` class manages PostgreSQL configuration settings.
 *
 * This class extends `Context.Tag` to provide configuration services
 * specifically for PostgreSQL. It utilizes a configuration map to store
 * and retrieve PostgreSQL settings.
 */
export class PostgresConfigService
    extends Context.Tag( 'PostgresConfigService' )<
        PostgresConfigService,
        ConfigMap<PostgresConfig>
    >() {
}

/**
 * PgClient class that extends a contextual tag for managing PostgreSQL connections.
 * This class is intended to interface with the pg.Pool class from the 'pg' module,
 * leveraging contextual typing and tagging for better type inference and management within
 * a PostgreSQL database environment.
 *
 * Inherits from:
 *  Context.Tag( 'PgClient' ) >
 *
 * Type Parameters:
 *  - PgClient: The current PgClient class instance.
 *  - pg.Pool: The pg.Pool instance from the 'pg' module, representing the connection pool.
 */
export class PgClient
    extends Context.Tag( 'PgClient' )<
        PgClient,
        { pool: pg.Pool, name: string }[]
    >() {
}


/**
 * Class representing a PostgreSQL Node with configuration and provider setup for a PostgreSQL client.
 */
export class PostgresNode {
    static dependencies = []

    /**
     * Generates and returns the default configuration for the Postgres database.
     * @returns The default configuration object for the Postgres database.
     */
    static get defaultConfig (): PostgresConfigType {
        return Effect.runSync(
            Effect.gen( function* () {
                return yield* Config.nested( PostgresConfig.config, 'DATABASE' )
            } )
        )
    }

    /**
     * Provides the necessary effect layers for configuring and connecting to a PostgreSQL database.
     * @param config The configuration settings required to connect to the PostgreSQL database.
     * @returns An object containing the necessary layers for PostgreSQL configuration and connection.
     */
    static provider (
        []: [],
        config: PostgresConfig
    ): EffectProviderReturn<PostgresNode> {
        return {
            layers: [
                Layer.effect(
                    PostgresConfigService,
                    Effect.gen( function* () {
                        return new ConfigMap(
                            yield* Ref.make(
                                new TypedConfigMap<PostgresConfigType>( Object.entries( config ) as ConfigEntry<PostgresConfigType>[] )
                            )
                        )
                    } )
                ),
                Layer.effect(
                    PgClient,
                    Effect.gen( function* () {
                        return [
                            {
                                pool: new Pool( {
                                    host: Redacted.value( config.host ),
                                    port: config.port,
                                    user: Redacted.value( config.user ),
                                    password: Redacted.value( config.password ),
                                    database: config.database,
                                    ssl: config.ssl
                                    // idleTimeoutMillis: 10000,
                                    // connectionTimeoutMillis: 30000
                                } ),
                                name: 'primary'
                            },
                            ...( config.replicas?.map( ( replica ) => ( {
                                    pool: new Pool( {
                                        host: replica,
                                        port: config.port,
                                        user: Redacted.value( config.user ),
                                        password: Redacted.value( config.password ),
                                        database: config.database,
                                        ssl: config.ssl
                                        // idleTimeoutMillis: 10000,
                                        // connectionTimeoutMillis: 30000
                                    } ),
                                    name: replica
                                } )
                            ) ?? [] )
                        ]
                    } )
                )
            ]
        }
    }
}

export default PostgresNode
