import { MysqlClient } from "@effect/sql-mysql2"
import { PgClient } from "@effect/sql-pg"
import { Config } from "effect"

/**
 * Postgres `SqlClient` layer from standard cluster env (`DB_*`), matching FPK / local dev.
 */
export const postgresClusterSqlLayer = PgClient.layerConfig({
  database: Config.string("DB_DATABASE"),
  username: Config.string("DB_USER"),
  password: Config.redacted("DB_PASSWORD"),
  host: Config.string("DB_HOST"),
  port: Config.number("DB_PORT").pipe(Config.withDefault(5432)),
})

/**
 * MySQL `SqlClient` layer from standard cluster env (`DB_*`).
 */
export const mysqlClusterSqlLayer = MysqlClient.layerConfig({
  host: Config.string("DB_HOST"),
  port: Config.number("DB_PORT").pipe(Config.withDefault(3306)),
  database: Config.string("DB_DATABASE"),
  username: Config.string("DB_USER"),
  password: Config.redacted("DB_PASSWORD"),
})
