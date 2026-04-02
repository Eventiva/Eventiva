import type { TransformContext, TransformStep } from "./types.js"

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.getPrototypeOf(v) === Object.prototype
  )
}

/** JSON Pointer–style path segment join (`""` + `"a"` → `"/a"`, `"/a"` + `"b"` → `"/a/b"`). */
export function joinTransformPath(base: string, segment: string): string {
  if (base === "") {
    return `/${segment}`
  }
  return `${base}/${segment}`
}

export interface LeafDiff {
  readonly path: string
  readonly before: unknown
  readonly after: unknown
}

/**
 * Collects leaf-level differences between two JSON-serializable values (plain objects, arrays, primitives).
 * Used to build {@link TransformStep} rows without hand-writing paths.
 */
export function collectDeepDiffs(
  before: unknown,
  after: unknown,
  path: string,
): ReadonlyArray<LeafDiff> {
  if (Object.is(before, after)) {
    return []
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    const out: LeafDiff[] = []
    const minLen = Math.min(before.length, after.length)
    for (let i = 0; i < minLen; i++) {
      out.push(
        ...collectDeepDiffs(before[i], after[i], joinTransformPath(path, String(i))),
      )
    }
    for (let i = minLen; i < before.length; i++) {
      out.push({
        path: joinTransformPath(path, String(i)),
        before: before[i],
        after: undefined,
      })
    }
    for (let i = minLen; i < after.length; i++) {
      out.push({
        path: joinTransformPath(path, String(i)),
        before: undefined,
        after: after[i],
      })
    }
    return out
  }

  if (Array.isArray(before) !== Array.isArray(after)) {
    return [{ path: path === "" ? "/" : path, before, after }]
  }

  if (isPlainObject(before) && isPlainObject(after)) {
    const keys = new Set([...Object.keys(before), ...Object.keys(after)])
    const out: LeafDiff[] = []
    for (const k of keys) {
      out.push(...collectDeepDiffs(before[k], after[k], joinTransformPath(path, k)))
    }
    return out
  }

  if (typeof before === "object" && before !== null && typeof after === "object" && after !== null) {
    if (isPlainObject(before) !== isPlainObject(after)) {
      return [{ path: path === "" ? "/" : path, before, after }]
    }
  }

  return [{ path: path === "" ? "/" : path, before, after }]
}

/**
 * Snapshot of `ctx.current` before a transform runs — safe for plain RPC payloads.
 */
export function cloneTransformSnapshot<T>(value: T): T {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(value)
    } catch {
      /* fall through */
    }
  }
  return JSON.parse(JSON.stringify(value)) as T
}

/**
 * Appends one {@link TransformStep} per differing leaf between `before` and `ctx.current`.
 * Does not modify `ctx.current` (extensions should mutate `current` themselves).
 */
export function appendTransformStepsFromDiff<T>(
  ctx: TransformContext<T>,
  before: T,
  extensionId: string,
  transformId: string,
): void {
  const leaves = collectDeepDiffs(before, ctx.current, "")
  for (const leaf of leaves) {
    const step: TransformStep = {
      extensionId,
      transformId,
      path: leaf.path,
      before: leaf.before,
      after: leaf.after,
    }
    ctx.steps.push(step)
  }
}
