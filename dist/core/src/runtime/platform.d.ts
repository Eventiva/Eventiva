/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 *
 * Two-phase model: System 1 (bootstrap) runs DB/schema and runCoreStartup so EntityRegistry
 * is populated; System 2 (runtime) runs only after bootstrap and adds HTTP + entity endpoints.
 * Use getBootstrapLayer() and getRuntimeLayer() with runMainTwoPhase() for correct route map.
 *
 * @see docs/learnings/architecture.md
 */
import * as Layer from 'effect/Layer';
import { type EntityEndpointDescriptor } from '../cluster/entity-endpoints.js';
import { Database } from '../database/database.js';
import { type ExtensionRegistration } from '../extensions/extension-registry.js';
import { SchemaFinalizer } from '../schema/index.js';
import { type FeatureFlagOverrides } from '../feature-flags/index.js';
/**
 * Options for createPlatformTemplate. Provide a database layer and an array of
 * extension layers (each with an id for schema markReady); optionally register entity HTTP endpoints.
 */
export interface CreatePlatformTemplateOptions {
    /**
     * Database implementation. Use DatabaseLiveInMemory for dev/tests; replace with
     * a layer that includes SchemaFinalizer (e.g. SchemaFinalizerPg from @eventiva/databases.pg) for PostgreSQL.
     */
    readonly databaseLayer: Layer.Layer<Database>;
    /** Extensions to load (id used for schema markReady and finalization count). */
    readonly extensions: ReadonlyArray<ExtensionRegistration>;
    /** Schema finalizer for building Drizzle tables. Use SchemaFinalizerPg for real tables; SchemaFinalizerNoOp for in-memory placeholders. */
    readonly schemaFinalizerLayer?: Layer.Layer<SchemaFinalizer>;
    /** When set, an HTTP server is started exposing RPC (and REST for CRUD entities) for these descriptors. */
    readonly entityEndpoints?: ReadonlyArray<EntityEndpointDescriptor>;
    /** Port for the entity endpoints server (default 3000). */
    readonly endpointsPort?: number;
    /**
     * Feature flag overrides for debugging. When a key is false, that feature is disabled.
     * Env fallback: EVENTIVA_FEATURE_OBSERVABILITY, EVENTIVA_FEATURE_CLUSTER, etc.
     */
    readonly featureOverrides?: FeatureFlagOverrides;
}
/**
 * Result of createPlatformTemplate with two-phase support. Use getBootstrapLayer() and
 * getRuntimeLayer() with runMainTwoPhase() so entity endpoints are built after EntityRegistry is populated.
 */
export interface PlatformTemplateTwoPhase {
    /** Phase 1: everything runCoreStartup needs (no HTTP, no entity endpoints). Run bootstrap with this. */
    getBootstrapLayer(): Layer.Layer<never, any, unknown>;
    /** Phase 2: HTTP server + entity endpoints. Requires bootstrap in scope; provide after bootstrap has run. */
    getRuntimeLayer(): Layer.Layer<never, any, unknown>;
}
/**
 * Builds a two-phase platform template exposing separate bootstrap and runtime layers.
 *
 * The bootstrap layer performs core startup (including population of the EntityRegistry).
 * The runtime layer exposes HTTP and entity endpoints and must be started after the bootstrap layer has populated runtime state.
 *
 * @returns An object with `getBootstrapLayer()` to obtain the bootstrap layer and `getRuntimeLayer()` to obtain the runtime layer
 */
export declare function createPlatformTemplateTwoPhase(options: CreatePlatformTemplateOptions): PlatformTemplateTwoPhase;
/**
 * Create a legacy one-phase platform Layer that combines bootstrap and runtime.
 *
 * The returned Layer initialises entity endpoints as part of its construction; because endpoints
 * are created when the layer is built (not after bootstrap completes), dynamically discovered
 * entities may be absent from the exposed route map.
 *
 * @param options - Configuration for building the platform
 * @returns A composite Layer that provides the full platform where entity endpoints are initialised during layer construction
 */
export declare function createPlatformTemplate(options: CreatePlatformTemplateOptions): Layer.Layer<never, any, unknown>;
//# sourceMappingURL=platform.d.ts.map