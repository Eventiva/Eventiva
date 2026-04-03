import {
  clusterObservabilityLayer,
  clusterPlatformContextSync,
  clusterPlatformMainFor,
  postgresClusterSqlLayer,
  runClusterPlatformIfEsmMain,
} from "@eventiva/core"
import { CopyrightNoticeExtension } from "@eventiva/extensions.copyright-notice"
import { ExampleTransformExtension } from "@eventiva/extensions.example-transform"
import {
  hooksKafkaDemoBootstrapLayer,
  HooksKafkaDemoRegistrationExtension,
} from "@eventiva/extensions.hooks-kafka-demo"
import { RunnerExtension } from "@eventiva/extensions.runner"
import { ShooterExtension } from "@eventiva/extensions.shooter"
import { SlowShooterExtension } from "@eventiva/extensions.slow-shooter"
import { SpeedShooterExtension } from "@eventiva/extensions.speed-shooter"
import { Effect, Layer } from "effect"

const hookRegistrationLayers = Layer.mergeAll(
  CopyrightNoticeExtension.Default,
  ExampleTransformExtension.Default,
  HooksKafkaDemoRegistrationExtension.Default,
) as Layer.Layer<any, any, any>

const applicationLayers = Layer.mergeAll(
  RunnerExtension.Default,
  ShooterExtension.Default,
  SpeedShooterExtension.Default,
  SlowShooterExtension.Default,
) as Layer.Layer<unknown, unknown, never>

export class PostgresqlClusterPlatform extends Effect.Service<PostgresqlClusterPlatform>()(
  "eventiva/platform/postgresql/ClusterPlatform",
  {
    sync: clusterPlatformContextSync({
      sqlLayer: postgresClusterSqlLayer,
      observabilityLayer: clusterObservabilityLayer,
      hookSidecarLayers: hookRegistrationLayers,
      kafkaHookBootstrapLayer: hooksKafkaDemoBootstrapLayer,
    }),
  },
) {}


runClusterPlatformIfEsmMain(import.meta.url, clusterPlatformMainFor(
  PostgresqlClusterPlatform,
  applicationLayers,
))
