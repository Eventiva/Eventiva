/**
 * PostgreSQL cluster platform entry.
 *
 * `EVENTIVA_CLUSTER_INFRASTRUCTURE`: `distributed` (default) — Postgres-backed cluster; `local` — in-memory cluster (`CLUSTER_HOOK_BUS=off` typical).
 */
import {
  createPlatform,
  defaultClusterObservability,
  postgresqlDatabase,
} from "@eventiva/core"
import { CopyrightNoticeExtension } from "@eventiva/extensions.copyright-notice"
import { ExampleTransformExtension } from "@eventiva/extensions.example-transform"
import {
  hooksKafkaDemoBootstrapLayer,
  HooksKafkaDemoRegistrationExtension,
} from "@eventiva/extensions.hooks-kafka-demo"
import { demoEntityLayers as entityLayers, RunnerExtension } from "@eventiva/extensions.runner"
import { shooterProgram, ShooterExtension } from "@eventiva/extensions.shooter"
import { slowShooterProgram, SlowShooterExtension } from "@eventiva/extensions.slow-shooter"
import { speedShooterProgram, SpeedShooterExtension } from "@eventiva/extensions.speed-shooter"
import { Layer } from "effect"

const hookRegistrationLayers = Layer.mergeAll(
  CopyrightNoticeExtension.Default,
  ExampleTransformExtension.Default,
  HooksKafkaDemoRegistrationExtension.Default,
) as Layer.Layer<unknown, unknown, never>

const applicationLayers = Layer.mergeAll(
  RunnerExtension.Default,
  ShooterExtension.Default,
  SpeedShooterExtension.Default,
  SlowShooterExtension.Default,
) as Layer.Layer<unknown, unknown, never>

const { Platform: PostgresqlClusterPlatform, runIfMain } = createPlatform({
  serviceId: "eventiva/platform/postgresql/ClusterPlatform",
  database: postgresqlDatabase(),
  observability: defaultClusterObservability(),
  hookRegistrationLayers,
  applicationLayers,
  kafkaHookBootstrapLayer: hooksKafkaDemoBootstrapLayer,
  localColocated: {
    entityLayers: entityLayers as unknown as Layer.Layer<any, any, any>,
    shooterPrograms: [shooterProgram, speedShooterProgram, slowShooterProgram],
  },
})

runIfMain(import.meta.url)

export { PostgresqlClusterPlatform }
