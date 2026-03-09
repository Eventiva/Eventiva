/**
 * Entity method extension registry: register per-entity, per-method extensions with priority.
 * runWithExtensions runs the base effect then each registered extension in priority order (ascending).
 * Used for Odoo-like extension chains (e.g. Contact.update: base then ext1 then ext2).
 * @see docs/learnings/architecture.md
 */
import * as Effect from "effect/Effect";
import { withSpanAndLog } from "../observability/helpers.js";
const registry = new Map();
function key(entityType, method) {
    return `${entityType}:${method}`;
}
/**
 * Register an entity method extension. Same (entityType, method) can have multiple extensions; they run in priority order (ascending).
 */
export function registerEntityMethodExtension(entityType, method, options) {
    const k = key(entityType, method);
    const list = (registry.get(k) ?? []);
    const next = [...list, options].sort((a, b) => a.priority - b.priority);
    registry.set(k, next);
}
/**
 * Get registered extensions for (entityType, method), sorted by priority (ascending).
 */
export function getExtensions(entityType, method) {
    return (registry.get(key(entityType, method)) ?? []);
}
/**
 * Run the base effect, then each registered extension in priority order.
 * Each extension receives context with entityType, method, entityId, request, and baseResult.
 * Extensions run sequentially; if one fails, the rest are not run.
 */
export function runWithExtensions(entityType, method, baseEffect, request) {
    return Effect.gen(function* () {
        yield* Effect.logInfo(`Running with extensions: ${entityType}.${method}`);
        const result = yield* baseEffect(request);
        const exts = getExtensions(entityType, method);
        const ctx = {
            entityType,
            method,
            entityId: request.address.entityId,
            request,
            baseResult: result
        };
        for (const ext of exts) {
            yield* ext.run(ctx);
        }
        return result;
    }).pipe(withSpanAndLog("runWithExtensions", { attributes: { entityType, method } }));
}
