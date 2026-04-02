import { MysqlClient } from "@effect/sql-mysql2"
import { Config } from "effect"

export const SqlLayer = MysqlClient.layerConfig({
  host: Config.string("DB_HOST"),
  port: Config.number("DB_PORT").pipe(Config.withDefault(3306)),
  database: Config.string("DB_DATABASE"),
  username: Config.string("DB_USER"),
  password: Config.redacted("DB_PASSWORD"),
})
