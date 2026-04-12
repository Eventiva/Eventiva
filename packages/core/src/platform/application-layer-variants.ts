import type { Effect } from "effect"
import { Layer } from "effect"

/**
 * Where this extension participates in cluster wiring.
 *
 * - **`entry`** — `Layer.launch` with `ClusterPlatformContext` (runner, shooter, …).
 * - **`registration`** — merged into `PlatformContext.extensionLayers` inside the SQL runner stack
 *   (hook / transform registration against hook and transform registries).
 *
 * @see {@link partitionApplicationLayersByRole}
 */
export type ClusterExtensionRole = "entry" | "registration"

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
  /**
   * Defaults to **`entry`**. Set to **`registration`** for hook/transform layers merged into the
   * runner `extensionLayers` graph (see {@link ClusterExtensionRole}).
   */
  readonly clusterExtensionRole?: ClusterExtensionRole
}

/**
 * Pass an extension **class** (`RunnerExtension`, …) or an explicit `{ Default, Local }` object.
 * Classes are resolved with `Class.Default` / `Class.Local` like {@link ApplicationLayerVariant}.
 */
export type ApplicationLayerInput =
  | ApplicationServiceStatics
  | (abstract new (...args: never[]) => unknown) & ApplicationServiceStatics

/** Defaults to **`entry`**. */
export function clusterExtensionRoleOf(input: ApplicationLayerInput): ClusterExtensionRole {
  if (typeof input === "function") {
    return (input as unknown as { readonly clusterExtensionRole?: ClusterExtensionRole }).clusterExtensionRole ?? "entry"
  }
  return input.clusterExtensionRole ?? "entry"
}

/** Split platform `applicationLayers` into cluster `Layer.launch` entries vs runner `extensionLayers` registrations. */
export function partitionApplicationLayersByRole(
  layers: ReadonlyArray<ApplicationLayerInput>,
): {
  readonly entry: ReadonlyArray<ApplicationLayerInput>
  readonly registration: ReadonlyArray<ApplicationLayerInput>
} {
  const entry: ApplicationLayerInput[] = []
  const registration: ApplicationLayerInput[] = []
  for (const layer of layers) {
    if (clusterExtensionRoleOf(layer) === "registration") {
      registration.push(layer)
    } else {
      entry.push(layer)
    }
  }
  return { entry, registration }
}

/** Merged {@link Default} layers for hook/transform registration (same graph for distributed and local runner). */
export function mergeRegistrationLayers(
  layers: ReadonlyArray<ApplicationLayerInput>,
): Layer.Layer<unknown, unknown, never> {
  if (layers.length === 0) {
    return Layer.empty as unknown as Layer.Layer<unknown, unknown, never>
  }
  const defaults = layers.map((l) => resolveApplicationLayerInput(l).Default)
  const [head, ...tail] = defaults
  let acc = head as Layer.Layer<unknown, unknown, never>
  for (const v of tail) {
    acc = Layer.merge(acc, v as Layer.Layer<unknown, unknown, never>)
  }
  return acc
}

/** Normalize class or object specifier to a variant (same runtime shape). */
export function resolveApplicationLayerInput(input: ApplicationLayerInput): ApplicationLayerVariant {
  return { Default: input.Default, Local: input.Local }
}

/** Collect `Program` from each **entry** application layer (order preserved); skips entries without one. */
export function collectColocatedShooterPrograms(
  layers: ReadonlyArray<ApplicationLayerInput>,
): ReadonlyArray<Effect.Effect<any, any, any>> {
  const out: Array<Effect.Effect<any, any, any>> = []
  for (const input of layers) {
    if (clusterExtensionRoleOf(input) !== "entry") {
      continue
    }
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
