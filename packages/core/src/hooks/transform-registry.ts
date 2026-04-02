import * as Ref from "effect/Ref"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import {
  appendTransformStepsFromDiff,
  cloneTransformSnapshot,
} from "./transform-diff.js"
import type { TransformContext } from "./types.js"

export type TransformFn<T> = (
  ctx: TransformContext<T>,
) => Effect.Effect<TransformContext<T>, never, never>

interface RegisteredTransform<T = unknown> {
  readonly rpcName: string
  readonly phase: "pre" | "post"
  readonly extensionId: string
  readonly transformId: string
  readonly fn: TransformFn<T>
}

export class TransformRegistry extends Context.Tag("@eventiva/core/TransformRegistry")<
  TransformRegistry,
  {
    readonly registerPre: <T>(
      rpcName: string,
      extensionId: string,
      transformId: string,
      fn: TransformFn<T>,
    ) => Effect.Effect<void, never, never>
    readonly registerPost: <T>(
      rpcName: string,
      extensionId: string,
      transformId: string,
      fn: TransformFn<T>,
    ) => Effect.Effect<void, never, never>
    readonly runPre: <T>(
      rpcName: string,
      ctx: TransformContext<T>,
    ) => Effect.Effect<TransformContext<T>, never, never>
    readonly runPost: <T>(
      rpcName: string,
      ctx: TransformContext<T>,
    ) => Effect.Effect<TransformContext<T>, never, never>
  }
>() {}

/**
 * After each registered pre/post transform runs, compares `ctx.current` to a snapshot
 * taken immediately before the handler and appends leaf diff steps (see `collectDeepDiffs`).
 */
export const TransformRegistryLive: Layer.Layer<TransformRegistry> = Layer.scoped(
  TransformRegistry,
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<RegisteredTransform>>([])
    return {
      registerPre: (rpcName, extensionId, transformId, fn) =>
        Ref.update(ref, (xs) => [
          ...xs,
          {
            rpcName,
            phase: "pre" as const,
            extensionId,
            transformId,
            fn: fn as TransformFn<unknown>,
          },
        ]),
      registerPost: (rpcName, extensionId, transformId, fn) =>
        Ref.update(ref, (xs) => [
          ...xs,
          {
            rpcName,
            phase: "post" as const,
            extensionId,
            transformId,
            fn: fn as TransformFn<unknown>,
          },
        ]),
      runPre: <T>(rpcName: string, ctx: TransformContext<T>) =>
        Effect.gen(function* () {
          const xs = yield* Ref.get(ref)
          let out = ctx
          for (const t of xs) {
            if (t.rpcName === rpcName && t.phase === "pre") {
              const snapshot = cloneTransformSnapshot(out.current)
              out = yield* t.fn(out as TransformContext<unknown>) as Effect.Effect<
                TransformContext<T>,
                never,
                never
              >
              appendTransformStepsFromDiff(out, snapshot, t.extensionId, t.transformId)
            }
          }
          return out
        }),
      runPost: <T>(rpcName: string, ctx: TransformContext<T>) =>
        Effect.gen(function* () {
          const xs = yield* Ref.get(ref)
          let out = ctx
          for (const t of xs) {
            if (t.rpcName === rpcName && t.phase === "post") {
              const snapshot = cloneTransformSnapshot(out.current)
              out = yield* t.fn(out as TransformContext<unknown>) as Effect.Effect<
                TransformContext<T>,
                never,
                never
              >
              appendTransformStepsFromDiff(out, snapshot, t.extensionId, t.transformId)
            }
          }
          return out
        }),
    }
  }),
)
