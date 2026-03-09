/*
 * File: postgres-config.ts
 * Last Modified: 12/03/2025, 10:50
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */

import { Config, Option, Redacted } from 'effect'
import { PoolConfig } from 'pg'

/**
 * Represents the configuration settings required for establishing a connection
 * to a PostgreSQL database. Combines redacted properties for security purposes
 * along with additional configuration settings inherited from PoolConfig.
 * The 'host', 'user', and 'password' attributes are encapsulated within a Redacted type.
 */
export type PostgresConfigType = {
    host: Redacted.Redacted<string>
    user: Redacted.Redacted<string>
    password: Redacted.Redacted<string>
    replicas?: string[] | undefined
} & Omit<PoolConfig, 'host' | 'user' | 'password'>


/**
 * Configuration class for PostgreSQL database connection.
 *
 * This class is responsible for mapping and storing configuration values
 * required to establish a connection with a PostgreSQL database. The configuration
 * values are read from the environment variables and have default values where applicable.
 *
 * Configuration fields:
 * - host: The hostname of the PostgreSQL server.
 * - port: The port number on which the PostgreSQL server is listening.
 * - user: The username used to authenticate with the PostgreSQL server.
 * - password: The password used to authenticate with the PostgreSQL server.
 * - database: The name of the database to connect to.
 * - ssl: A boolean flag indicating whether to use SSL for the connection.
 */
export class PostgresConfig
    implements Readonly<PostgresConfigType> {
    static config = Config.map(
        Config.all(
            [
                Config.redacted( 'HOST' ),
                Config.number( 'PORT' ).pipe( Config.withDefault( 5432 ) ),
                Config.redacted( 'USERNAME' ).pipe( Config.withDefault( Redacted.make( 'postgres' ) ) ),
                Config.redacted( 'PASSWORD' ),
                Config.nonEmptyString( 'DATABASE' ).pipe( Config.withDefault( 'postgres' ) ),
                Config.boolean( 'SSL' ).pipe( Config.withDefault( true ) ),
                Config.option( Config.string( 'REPLICAS' ) ),
                Config.option( Config.string( 'SSL_CA_FILE' ) )
            ]
        ),
        (
            [
                host,
                port,
                user,
                password,
                database,
                ssl,
                replicas,
                ca
            ]
        ) => new PostgresConfig( {
            host,
            port,
            user,
            password,
            database,
            ssl: Option.getOrUndefined( ca )
                ? {
                    ca: require( 'fs' ).readFileSync( Option.getOrUndefined( ca ) ).toString()
                }
                : ssl,
            replicas: ( Option.getOrUndefined( replicas ) )?.split( ',' )
        } )
    )
    readonly host!: PostgresConfigType['host']
    readonly port?: PostgresConfigType['port']
    readonly user!: PostgresConfigType['user']
    readonly password!: PostgresConfigType['password']
    readonly database?: PostgresConfigType['database']
    readonly ssl?: PostgresConfigType['ssl']
    readonly replicas?: PostgresConfigType['replicas']


    constructor ( config: PostgresConfigType ) {
        Object.assign( this, config )
    }
}
