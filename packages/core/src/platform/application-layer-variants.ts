import type { Effect } from "effect"
import { Layer } from "effect"

/**
 * Pair of extension layers: {@link Default} for distributed (`EVENTIVA_CLUSTER_INFRASTRUCTURE=distributed`),
 * {@link Local} for colocated local cluster (forked shooter programs + `entityLayers`; extensions that
 * duplicate that work use no-op `Local` layers — see extension packages).
 */
export type ApplicationLayerVariant = {
  readonly Default: Layer.Layer<any, any, any>
  readonly Local: Layer.Layer<any, any, never>
}

/**
 * Static `Default` / `Local` layers on an `Effect.Service` class, or the same as a plain object
 * (for overrides such as `{ Default: SlowShooterExtension.Default, Local: customLocal }`).
 */
export type ApplicationServiceStatics = {
  readonly Default: Layer.Layer<any, any, any>
  readonly Local: Layer.Layer<any, any, never>
  /**
   * When set on an extension class or override object, forked as a fiber in the local colocated
   * pipeline (see {@link collectColocatedShooterPrograms}). Omit on runner-only extensions.
   */
  readonly Program?: Effect.Effect<any, any, any>
}

/**
 * Pass an extension **class** (`RunnerExtension`, …) or an explicit `{ Default, Local }` object.
 * Classes are resolved with `Class.Default` / `Class.Local` like {@link ApplicationLayerVariant}.
 */
export type ApplicationLayerInput =
  | ApplicationServiceStatics
  | (abstract new (...args: never[]) => unknown) & ApplicationServiceStatics

/** Normalize class or object specifier to a variant (same runtime shape). */
export function resolveApplicationLayerInput(input: ApplicationLayerInput): ApplicationLayerVariant {
  return { Default: input.Default, Local: input.Local }
}

/** Collect `Program` from each application layer (order preserved); skips entries without one. */
export function collectColocatedShooterPrograms(
  layers: ReadonlyArray<ApplicationLayerInput>,
): ReadonlyArray<Effect.Effect<any, any, any>> {
  const out: Array<Effect.Effect<any, any, any>> = []
  for (const input of layers) {
    const p = (input as ApplicationServiceStatics).Program
    if (p !== undefined) out.push(p)
  }
  return out
}

/** Merge one side of each entry (typically all `Default` for distributed main). */
export function mergeApplicationLayerVariants(
  layers: ReadonlyArray<ApplicationLayerInput>,
  side: keyof ApplicationLayerVariant,
): Layer.Layer<unknown, unknown, never> {
  if (layers.length === 0) {
    return Layer.empty as unknown as Layer.Layer<unknown, unknown, never>
  }
  const variants = layers.map(resolveApplicationLayerInput)
  const [head, ...tail] = variants
  let acc = head[side] as Layer.Layer<unknown, unknown, never>
  for (const v of tail) {
    acc = Layer.merge(acc, v[side] as Layer.Layer<unknown, unknown, never>)
  }
  return acc
}
