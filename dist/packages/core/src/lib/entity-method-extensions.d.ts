/**
 * Entity method extension registry: register per-entity, per-method extensions with priority.
 * runWithExtensions runs the base effect then each registered extension in priority order (ascending).
 * Used for Odoo-like extension chains (e.g. Contact.update: base then ext1 then ext2).
 * @see docs/learnings/architecture.md
 */
import * as Effect from "effect/Effect";
export interface EntityMethodExtensionContext<Req, Res> {
    readonly entityType: string;
    readonly method: string;
    readonly entityId: string;
    readonly request: Req;
    readonly baseResult: Res;
}
export interface EntityMethodExtension<Req, Res, E = never, R = never> {
    readonly priority: number;
    readonly extensionId: string;
    /** Run after the base handler. Receives context (entityType, method, entityId, request, baseResult). */
    readonly run: (ctx: EntityMethodExtensionContext<Req, Res>) => Effect.Effect<void, E, R>;
}
/**
 * Register an entity method extension. Same (entityType, method) can have multiple extensions; they run in priority order (ascending).
 */
export declare function registerEntityMethodExtension<Req, Res, E = never, R = never>(entityType: string, method: string, options: EntityMethodExtension<Req, Res, E, R>): void;
/**
 * Get registered extensions for (entityType, method), sorted by priority (ascending).
 */
export declare function getExtensions<Req, Res>(entityType: string, method: string): ReadonlyArray<EntityMethodExtension<Req, Res>>;
/**
 * Run the base effect, then each registered extension in priority order.
 * Each extension receives context with entityType, method, entityId, request, and baseResult.
 * Extensions run sequentially; if one fails, the rest are not run.
 */
export declare function runWithExtensions<Req, A, E, R>(entityType: string, method: string, baseEffect: (request: Req) => Effect.Effect<A, E, R>, request: Req & {
    address: {
        entityId: string;
    };
    payload: unknown;
}): Effect.Effect<A, E, R>;
//# sourceMappingURL=entity-method-extensions.d.ts.map