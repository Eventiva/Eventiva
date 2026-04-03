import {
  clusterExtensionsProfileFromEnv,
  clusterObservabilityLayer,
  clusterPlatformContextSync,
  clusterPlatformMainFor,
  mysqlClusterSqlLayer,
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

const profile = clusterExtensionsProfileFromEnv()

const hookRegistrationLayers = (
  profile === "copyright-notice"
    ? Layer.mergeAll(
        CopyrightNoticeExtension.Default,
        HooksKafkaDemoRegistrationExtension.Default,
      )
    : profile === "example-transform"
      ? Layer.mergeAll(
          ExampleTransformExtension.Default,
          HooksKafkaDemoRegistrationExtension.Default,
        )
      : Layer.mergeAll(
          CopyrightNoticeExtension.Default,
          ExampleTransformExtension.Default,
          HooksKafkaDemoRegistrationExtension.Default,
        )
) as Layer.Layer<any, any, any>

const applicationLayers = Layer.mergeAll(
  RunnerExtension.Default,
  ShooterExtension.Default,
  SpeedShooterExtension.Default,
  SlowShooterExtension.Default,
) as Layer.Layer<unknown, unknown, never>

export class MysqlClusterPlatform extends Effect.Service<MysqlClusterPlatform>()(
  "eventiva/platform/mysql/ClusterPlatform",
  {
    sync: clusterPlatformContextSync({
      sqlLayer: mysqlClusterSqlLayer,
      observabilityLayer: clusterObservabilityLayer,
      hookSidecarLayers: hookRegistrationLayers,
      kafkaHookBootstrapLayer: hooksKafkaDemoBootstrapLayer,
    }),
  },
) {}

export const mysqlClusterMain = clusterPlatformMainFor(MysqlClusterPlatform, applicationLayers)

runClusterPlatformIfEsmMain(import.meta.url, mysqlClusterMain)
