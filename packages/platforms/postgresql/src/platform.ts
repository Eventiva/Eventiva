/**
 * PostgreSQL cluster platform entry.
 *
 * `EVENTIVA_CLUSTER_INFRASTRUCTURE`: `distributed` (default) — Postgres-backed cluster; `local` — in-memory cluster (Effect PubSub hook bus default; override with `CLUSTER_HOOK_BUS`).
 */
import {
  createPlatform,
  defaultClusterObservability,
  postgresqlDatabase,
} from "@eventiva/core"
import { postgresClusterDrizzleBootstrapLayers } from "@eventiva/databases.pg"
import { schemaDemoDrizzleLayer } from "@eventiva/extensions.schema-demo"
import { CopyrightNoticeExtension } from "@eventiva/extensions.copyright-notice"
import { ExampleTransformExtension } from "@eventiva/extensions.example-transform"
import { clusterHookKafkaStackFromEnv } from "@eventiva/integrations.kafka"
import {
  HooksKafkaDemoRegistrationExtension,
} from "@eventiva/extensions.hooks-kafka-demo"
import { demoEntityLayers as entityLayers, RunnerExtension } from "@eventiva/extensions.runner"
// import { ShooterExtension } from "@eventiva/extensions.shooter"
import { SlowShooterExtension } from "@eventiva/extensions.slow-shooter"
// import { SpeedShooterExtension } from "@eventiva/extensions.speed-shooter"

const applicationLayers = [
  CopyrightNoticeExtension,
  ExampleTransformExtension,
  HooksKafkaDemoRegistrationExtension,
  RunnerExtension,
  // ShooterExtension,
  // SpeedShooterExtension,
  SlowShooterExtension,
]

const database = postgresqlDatabase()
const sqlLayer = database.sqlLayer

const { Platform: PostgresqlClusterPlatform, runIfMain } = createPlatform({
  serviceId: "eventiva/platform/postgresql/ClusterPlatform",
  database,
  observability: defaultClusterObservability(),
  applicationLayers,
  HookImplementationLayer: clusterHookKafkaStackFromEnv(),
  drizzleSchemaBootstrap: {
    layers: postgresClusterDrizzleBootstrapLayers({
      sqlLayer,
      expectedReadyCount: 2,
      extraLayers: [schemaDemoDrizzleLayer],
    }),
  },
  localColocated: {
    entityLayers: entityLayers,
  },
})

runIfMain(import.meta.url)

export { PostgresqlClusterPlatform }
