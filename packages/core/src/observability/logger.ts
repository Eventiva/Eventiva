import { PlatformLogger } from "@effect/platform"
import type { PlatformError } from "@effect/platform/Error"
import { NodeFileSystem } from "@effect/platform-node"
import { Effect, Layer, Logger } from "effect"

function logFilePath(): string | undefined {
  const p = process.env.EVENTIVA_LOG_FILE?.trim()
  if (p === undefined || p === "") {
    return undefined
  }
  return p
}

/**
 * Pretty console plus optional logfmt file sink.
 * Set `EVENTIVA_LOG_FILE` to a writable path for file output; if unset, console-only (pretty).
 */
export function dualLoggerLayer(): Layer.Layer<never, PlatformError, never> {
  const path = logFilePath()
  if (path === undefined) {
    return Logger.replaceScoped(
      Logger.defaultLogger,
      Effect.succeed(Logger.prettyLoggerDefault),
    ) as Layer.Layer<never, PlatformError, never>
  }

  const fileLogger = Logger.logfmtLogger.pipe(PlatformLogger.toFile(path))
  const bothLoggers = Effect.map(fileLogger, (file) =>
    Logger.zip(Logger.prettyLoggerDefault, file),
  )

  return Logger.replaceScoped(Logger.defaultLogger, bothLoggers).pipe(
    Layer.provide(NodeFileSystem.layer),
  )
}
