/**
 * Effect/Cluster configuration: default layers and modes for Sharding and Runner.
 * Use TestRunner for in-process development and tests; swap for SingleRunner or
 * distributed Sharding + Pods when moving to multi-process.
 * @see docs/plans/2026-03-07-effect-crm-framework-infrastructure.md
 * @see docs/learnings/architecture.md
 */
import type * as Layer from "effect/Layer"
import * as TestRunner from "@effect/cluster/TestRunner"

/**
 * Cluster execution mode. Default platform uses "test" (in-memory).
 * - test: TestRunner – single process, in-memory sharding and runner (dev/tests).
 * - single: SingleRunner – single process with real Sharding config (future).
 * - distributed: Sharding + Pods + RunnerStorage – multi-process (future).
 */
export type ClusterMode = "test" | "single" | "distributed"

/**
 * Default cluster layer for the platform. Provides Sharding and Runner in one process
 * using @effect/cluster TestRunner (in-memory). Entity layers merged on top get
 * registered with this runner.
 * Use this in platform templates (e.g. defaultPlatform) so cluster setup is centralized.
 */
export const clusterLayerDefault: Layer.Layer<never, never, never> = TestRunner.layer

/** Re-export for platforms that need to reference TestRunner directly. */
export { TestRunner }
