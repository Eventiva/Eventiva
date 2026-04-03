/**
 * Hook phases (aligned with legacy extension-hooks naming).
 */
export type HookPhase =
  | "onLoad"
  | "onRegister"
  | "beforeCall"
  | "afterCall"
  | "onShutdown"
  | (string & {})

/** Where a hook was registered (used to filter dispatch). */
export type HookScope =
  | { readonly _tag: "runner" }
  | { readonly _tag: "entityType"; readonly entityType: string }
  | { readonly _tag: "singleton"; readonly name: string }
  | { readonly _tag: "rpc"; readonly rpcName: string }
  | { readonly _tag: "extension"; readonly extensionId: string }

export function hookScopeEquals(a: HookScope, b: HookScope): boolean {
  if (a._tag !== b._tag) return false
  switch (a._tag) {
    case "runner":
      return true
    case "entityType":
      return b._tag === "entityType" && a.entityType === b.entityType
    case "singleton":
      return b._tag === "singleton" && a.name === b.name
    case "rpc":
      return b._tag === "rpc" && a.rpcName === b.rpcName
    case "extension":
      return b._tag === "extension" && a.extensionId === b.extensionId
    default:
      return false
  }
}

/** One audit row for a transform step (basic shallow path). */
export interface TransformStep {
  readonly extensionId: string
  readonly transformId: string
  readonly path: string
  readonly before: unknown
  readonly after: unknown
}

/** Mutable transform context passed through pre/post chains. */
export interface TransformContext<T> {
  readonly original: T
  current: T
  steps: Array<TransformStep>
}

export function emptyTransformContext<T>(original: T): TransformContext<T> {
  return { original, current: original, steps: [] }
}

/**
 * Manually append a single audit step. Prefer mutating `ctx.current` only — the
 * {@link TransformRegistry} records leaf diffs automatically after each pre/post transform.
 */
export function appendTransformStep<T>(
  ctx: TransformContext<T>,
  step: Omit<TransformStep, "before" | "after"> & { readonly before: unknown; readonly after: unknown },
): void {
  ctx.steps.push({
    extensionId: step.extensionId,
    transformId: step.transformId,
    path: step.path,
    before: step.before,
    after: step.after,
  })
  ctx.current = step.after as T
}
