import * as TestRunner from "@effect/cluster/TestRunner";
/**
 * Default cluster layer for the platform. Provides Sharding and Runner in one process
 * using @effect/cluster TestRunner (in-memory). Entity layers merged on top get
 * registered with this runner.
 * Use this in platform templates (e.g. defaultPlatform) so cluster setup is centralized.
 */
export const clusterLayerDefault = TestRunner.layer;
/** Re-export for platforms that need to reference TestRunner directly. */
export { TestRunner };
