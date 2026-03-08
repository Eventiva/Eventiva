/**
 * Cluster entities: one extension = one Entity.
 * Handlers must require Logger, Tracer, and Metric in context for observability.
 * @see docs/learnings/architecture.md
 */
import type * as Entity from "@effect/cluster/Entity";
/**
 * **One extension = one Entity.**
 * Each extension is a single `Entity` (Entity.make(type, protocol)). Registration is
 * `entity.toLayer(handlers)`; composition is merging these layers. Do not bundle
 * multiple extensions into one entity type—each extension is its own entity type
 * and its own Layer for independent scaling and sharding.
 *
 * **Observability in handlers:** Every handler must run with Logger, Tracer, and
 * Metric in context. Use the ObservabilityLive layer and ensure handler effects
 * require `Logger`, `Tracer`, and `Metric` (e.g. use `withSpanAndLog` or
 * Effect.withSpan + Effect.log + Metric in each handler). No handler may ship
 * without span, structured log, and at least one metric where appropriate.
 */
export type ExtensionEntity = Entity.Any;
export type { Entity } from "@effect/cluster/Entity";
export { CurrentAddress, CurrentRunnerAddress, make, type Request } from "@effect/cluster/Entity";
//# sourceMappingURL=entities.d.ts.map