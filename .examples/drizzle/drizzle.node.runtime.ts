/*
 * File: drizzle.node.runtime.ts
 * Last Modified: 04/04/2025, 19:00
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */

import { relations } from '@encircle-marketing/crm.entities.db.drizzle.relations'
import { type ConfigEntry, ConfigMap, TypedConfigMap } from '@encircle-marketing/crm.utilities.helpers.config'
import { PgClient, PostgresAspect, PostgresNode } from '@encircle-marketing/crm.utilities.helpers.postgres'
import { EffectProviderReturn } from '@encircle-marketing/crm.utilities.helpers.providers'
import { ConsoleService, LoggerAspect, LoggerNode } from '@encircle-marketing/crm.utilities.logging.logger'
import { Logger } from 'drizzle-orm/logger'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { PgWithReplicas, withReplicas } from 'drizzle-orm/pg-core'
import { Config, Context, Effect, Layer, Ref } from 'effect'
import { DrizzleConfig, type DrizzleConfigType } from './drizzle-config.js'

/**
 * The AspectLogger class is a logging utility that implements the Logger interface.
 * It leverages the LoggerNode instance provided at construction to log detailed information
 * about database queries.
 *
 * Constructor:
 * @param Console - An instance of LoggerNode used for logging operations.
 *
 * Methods:
 * logQuery(query: string, params: unknown[]): void
 *   Logs the execution of a query, including the query string and its parameters.
 *   @param query - The SQL query string being executed.
 *   @param params - An array of parameters associated with the query.
 */
class AspectLogger
    implements Logger {
    constructor (
        private Console: LoggerNode,
        private readonly connection_name: string
    ) {
    }

    /**
     * Logs the execution of a database query with its parameters for debugging purposes.
     * @param query The SQL query string to be logged.
     * @param params An array of parameters associated with the query.
     * @returns void
     */
    logQuery (
        query: string,
        params: unknown[]
    ): void {
        Effect.runSync( this.Console.debug(
            `[${ this.connection_name }] Executing a query on database: `,
            { query, params }
        ) )
    }
}

/**
 * The DrizzleConfigService class extends the functionality of Context.Tag with a specific configuration for Drizzle.
 * This service is responsible for managing Drizzle configurations within the application's context.
 *
 * DrizzleConfigService works with a ConfigMap containing DrizzleConfig objects to facilitate configuration management.
 *
 * Extends:
 *   Context.Tag
 */
export class DrizzleConfigService
    extends Context.Tag( 'DrizzleConfigService' )<
        DrizzleConfigService,
        ConfigMap<DrizzleConfig>
    >() {
}

export type DBType = PgWithReplicas<NodePgDatabase<Record<string, never>, typeof relations>>

/**
 * `DB` class extending the `Context.Tag` with configuration for
 * database connection and operations.
 *
 * This class is used to initialize and maintain the database
 * connection using the drizzle configuration and schema.
 * Context.Tag
 *
 * The generic parameters provide typing for the `DB` instance and
 * the return type of the drizzle configuration based on the schema.
 */
export class DB
    extends Context.Tag( 'DB' )<
        DB,
        DBType
    >() {
}

/**
 * The DrizzleNode class is responsible for integrating logging and
 * PostgreSQL database functionalities within an application. It
 * provides default configuration and sets up necessary layers for
 * effectful operations.
 */
export class DrizzleNode {
    static dependencies = [ LoggerAspect, PostgresAspect ]

    /**
     * Retrieves the default configuration for Drizzle.
     * @returns The default Drizzle configuration with predefined values for logger and client.
     */
    static get defaultConfig (): DrizzleConfigType {
        return Effect.runSync(
            Effect.gen( function* () {
                return yield* Config.nested( DrizzleConfig.config, 'DRIZZLE' )
            } )
        )
    }

    /**
     * Configures a provider for initializing and managing services and databases in the application.
     * @param dependancies - An array containing the PlatformNode and LoggerNode effect provider returns.
     * @param dependancies."0" - The platform node to create the platform from
     * @param dependancies."1" - The Logger Node for creating logging instances
     * @param config an object containing the configuration required for setting up the services.
     * @returns an effect provider return object containing the configured layers for DrizzleNode.
     */
    static provider (
        [ LoggerNode, PostgresNode ]: [ EffectProviderReturn<LoggerNode>, EffectProviderReturn<PostgresNode> ],
        config: DrizzleConfigType
    ): EffectProviderReturn<DrizzleNode> {

        // @ts-ignore
        return {
            /**
             * This object represents the configuration layers required for initializing and managing
             * the services and database in the application.
             *
             * The following layers are included:
             *
             * - `DrizzleConfigService` is instantiated with a generator function that creates a new
             *   `ConfigMap` using a `Ref` containing a `TypedConfigMap` of `DrizzleConfigType`. The config
             *   entries are derived from the provided `config` object.
             *
             * - `DB` is instantiated with a generator function that retrieves a PostgreSQL client (`PgClient`),
             *   registers a logger using the `ConsoleService`, and creates an aspect logger with the logger
             *   configuration from the provided `config` object. The `drizzle` function is then called with
             *   the client, schema, and logger to set up the database interaction.
             *
             * These layers are then further processed using `Layer.provide` and `Layer.mergeAll` to combine
             * them with additional layers from `PostgresNode` and `LoggerNode`.
             */
            layers: [
                Layer.effect(
                    DrizzleConfigService,
                    Effect.gen( function* () {
                        return new ConfigMap(
                            yield* Ref.make(
                                new TypedConfigMap<DrizzleConfigType>( Object.entries( config ) as ConfigEntry<DrizzleConfigType>[] )
                            )
                        )
                    } )
                ),
                Layer.effect(
                    DB,
                    Effect.gen( function* () {
                        const Client = yield* PgClient
                        const Logger = yield* ( yield* ConsoleService ).registerLogger( [ config.logger ] )
                        const Console = yield* Logger.getLogger( config.logger.module )
                        const mutableClients = [ ...Client ]
                        const primary = drizzle(
                            mutableClients.shift()!.pool,
                            { relations, logger: new AspectLogger( Console, `Primary: ${ Client[ 0 ].name }` ) }
                        )
                        const replicas = mutableClients.map(
                            ( client ) => drizzle(
                                client.pool,
                                { relations, logger: new AspectLogger( Console, `Replica: ${ client.name }` ) }
                            ) )
                        return withReplicas(
                            primary,
                            [ replicas.shift()!, ...replicas ]
                        )
                    } )
                ).pipe(
                    Layer.provide(
                        Layer.mergeAll( PostgresNode.layers![ 0 ], ...PostgresNode.layers!.slice( 1 ) )
                    ),
                    Layer.provide(
                        Layer.mergeAll( LoggerNode.layers![ 0 ], ...LoggerNode.layers!.slice( 1 ) )
                    )
                )
            ]
        }
    }
}

export default DrizzleNode
