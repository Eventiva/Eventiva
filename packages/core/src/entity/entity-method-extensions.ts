/**
 * Entity method extension registry: register per-entity, per-method extensions with priority.
 * runWithExtensions runs the base effect then each registered extension in priority order (ascending).
 * Used for Odoo-like extension chains (e.g. Contact.update: base then ext1 then ext2).
 * @see docs/learnings/architecture.md
 */
import * as Effect from "effect/Effect"
import { withSpanAndLog } from "../observability/helpers.js"

export interface EntityMethodExtensionContext<Req, Res> {
  readonly entityType: string
  readonly method: string
  readonly entityId: string
  readonly request: Req
  readonly baseResult: Res
}

export interface EntityMethodExtension<Req, Res, E = never, R = never> {
  readonly priority: number
  readonly extensionId: string
  /** Run after the base handler. Receives context (entityType, method, entityId, request, baseResult). */
  readonly run: (ctx: EntityMethodExtensionContext<Req, Res>) => Effect.Effect<void, E, R>
}

const registry = new Map<string, EntityMethodExtension<unknown, unknown, any, any>[]>()

function key(entityType: string, method: string): string {
  return `${entityType}:${method}`
}

/**
 * Register an entity method extension. Same (entityType, method) can have multiple extensions; they run in priority order (ascending).
 */
export function registerEntityMethodExtension<Req, Res, E = never, R = never>(
  entityType: string,
  method: string,
  options: EntityMethodExtension<Req, Res, E, R>
): void {
  const k = key(entityType, method)
  const list = (registry.get(k) ?? []) as EntityMethodExtension<unknown, unknown, any, any>[]
  const next = [...list, options as EntityMethodExtension<unknown, unknown, any, any>].sort(
    (a, b) => a.priority - b.priority
  )
  registry.set(k, next)
}

/**
 * Get registered extensions for (entityType, method), sorted by priority (ascending).
 */
export function getExtensions<Req, Res>(
  entityType: string,
  method: string
): ReadonlyArray<EntityMethodExtension<Req, Res>> {
  return (registry.get(key(entityType, method)) ?? []) as unknown as ReadonlyArray<EntityMethodExtension<Req, Res>>
}

/**
 * Run the base effect, then each registered extension in priority order.
 * Each extension receives context with entityType, method, entityId, request, and baseResult.
 * Extensions run sequentially; if one fails, the rest are not run.
 */
export function runWithExtensions<Req, A, E, R>(
  entityType: string,
  method: string,
  baseEffect: (request: Req) => Effect.Effect<A, E, R>,
  request: Req & { address: { entityId: string }; payload: unknown }
): Effect.Effect<A, E, R> {
  return Effect.gen(function* () {
    yield* Effect.logInfo(`Running with extensions: ${entityType}.${method}`)
    const result = yield* baseEffect(request)
    const exts = getExtensions<Req, A>(entityType, method)
    const ctx: EntityMethodExtensionContext<Req, A> = {
      entityType,
      method,
      entityId: request.address.entityId,
      request,
      baseResult: result
    }
    for (const ext of exts) {
      yield* ext.run(ctx)
    }
    return result
  }).pipe(withSpanAndLog("runWithExtensions", { attributes: { entityType, method } }))
}
