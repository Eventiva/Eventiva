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
import * as Effect from 'effect/Effect';
import * as Scope from 'effect/Scope';
import { createServer } from 'node:http';
import { ObservabilityStackLive } from '../observability/layer.js';
import { clusterLayerDefault } from '../cluster/config.js';
import { NodeHttpServer } from '@effect/platform-node';
import {
    makeEntityEndpointsLayer,
    EntityEndpointsServer,
    type EntityEndpointDescriptor,
} from '../cluster/entity-endpoints.js';
import { PiiEncryptionLive } from '../security/index.js';
import { Database } from '../database/database.js';
import {
    ExtensionHooksLive,
    WorkflowEngineLayerInMemory,
    ClusterWorkflowEngineLayer,
} from '../extensions/extension-hooks.js';
import { StartupBannerLayer } from './startup-banner.js';
import { mergeConfigLayers, mergeEntityLayers, type ExtensionRegistration } from '../extensions/extension-registry.js';
import { WorkflowRegistryLive } from '../workflow/engine.js';
import { RuntimeConfigLive } from '../config/runtime-config.js';
import {
    FinalTableStoreLive,
    RuntimeSchemaDDLNoOpLayer,
    SchemaFinalizer,
    SchemaFinalizerNoOp,
    SchemaRegistryConfigLive,
    TableColumnRegistryLive,
    TableRelationsRegistryLive,
    type RuntimeSchemaDDLService,
} from '../schema/index.js';
import { FeatureFlagKeys, type FeatureFlagOverrides } from '../feature-flags/index.js';
import * as NodeSdk from '@effect/opentelemetry/NodeSdk';

/**
 * Options for createPlatformTemplate. Provide a database layer and an array of
 * extension layers (each with an id for schema markReady); optionally register entity HTTP endpoints.
 */
export interface CreatePlatformTemplateOptions {
    /**
     * Database implementation from the active platform backend (e.g. PgDatabaseLayer or SqliteDatabaseLayer).
     */
    readonly databaseLayer: Layer.Layer<Database>;
    /** Extensions to load (id used for schema markReady and finalization count). */
    readonly extensions: ReadonlyArray<ExtensionRegistration>;
    /** Schema finalizer for building Drizzle tables (e.g. SchemaFinalizerPg). Omit only when SCHEMA_STACK is disabled; defaults to SchemaFinalizerNoOp. */
    readonly schemaFinalizerLayer?: Layer.Layer<SchemaFinalizer>;
    /** After table finalization, apply DDL to the physical DB (drizzle-kit). Defaults to no-op. */
    readonly runtimeSchemaDDLLayer?: Layer.Layer<RuntimeSchemaDDLService>;
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
 * Determine whether a feature flag is enabled, honouring explicit overrides and environment variables.
 *
 * Checks the provided `overrides` map first; if no explicit override is present it reads the environment variable
 * `EVENTIVA_FEATURE_<KEY>` (accepting `true`/`false` or `1`/`0`). If neither an override nor a recognised environment
 * value is present the feature is enabled by default.
 *
 * @param overrides - Optional map of feature flag overrides keyed by `FeatureFlagKeys`
 * @param key - The feature flag key to evaluate (a key of `FeatureFlagKeys`)
 * @returns `true` if the feature is enabled, `false` otherwise.
 */
function isFeatureEnabled(overrides: FeatureFlagOverrides | undefined, key: keyof typeof FeatureFlagKeys): boolean {
    const k = FeatureFlagKeys[key];
    if (overrides && k in overrides) return overrides[k] ?? true;
    const envKey = `EVENTIVA_FEATURE_${key}` as const;
    const v = process.env[envKey];
    if (v === 'false' || v === '0') return false;
    if (v === 'true' || v === '1') return true;
    return true;
}

/**
 * Build the platform bootstrap layer that initialises core services and configuration used in phase 1.
 *
 * @param options - Options controlling which sub-layers are included (database layer, extensions, optional schema finalizer, endpoints port and feature flag overrides)
 * @returns A composed `Layer` that provides observability, runtime configuration, PII encryption, extension configuration, optional cluster and schema stacks, the database layer, extension hooks and workflow components, and a scoped lifecycle; extension entity layers are merged on top of this base layer
 */
function buildBootstrapStack(
    options: CreatePlatformTemplateOptions
): Layer.Layer<never, any, unknown> {
    const fo = options.featureOverrides;
    const scopeLayer = Layer.scoped(Scope.Scope, Scope.make());
    const endpointsPort = options.endpointsPort ?? 3000;
    const runtimeConfigLayer = RuntimeConfigLive({ endpointsPort });
    const piiLayer = PiiEncryptionLive.pipe(Layer.provide(runtimeConfigLayer));
    const extensionConfigLayer = mergeConfigLayers(
        options.extensions.flatMap((extension) => (extension.configLayer ? [extension.configLayer] : []))
    );
    const schemaConfigLayer = SchemaRegistryConfigLive(options.extensions.length);
    const schemaFinalizerLayer = options.schemaFinalizerLayer ?? Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp);
    const schemaStack = TableColumnRegistryLive.pipe(
        Layer.provideMerge(FinalTableStoreLive),
        Layer.provideMerge(TableRelationsRegistryLive),
        Layer.provideMerge(schemaConfigLayer),
        Layer.provideMerge(schemaFinalizerLayer)
    );
    const runtimeSchemaDdlLayer = options.runtimeSchemaDDLLayer ?? RuntimeSchemaDDLNoOpLayer;
    // Use ClusterWorkflowEngine when cluster is enabled, otherwise use in-memory workflow engine
    const workflowEngineLayer = isFeatureEnabled(fo, 'CLUSTER')
        ? ClusterWorkflowEngineLayer.pipe(Layer.provide(clusterLayerDefault))
        : WorkflowEngineLayerInMemory;
    // StartupBannerLayer must not merge in parallel with ExtensionHooksLive: it needs ExtensionHookPubSub
    // and WorkflowEngine from the hooks stack (sequenced provideMerge).
    const hooksStack = StartupBannerLayer.pipe(
        Layer.provideMerge(Layer.mergeAll(ExtensionHooksLive, workflowEngineLayer, WorkflowRegistryLive))
    );
    // Base observability layer (Logger, Tracer, Metrics)
    // Note: ClusterMetrics from @effect/cluster exports individual Gauge metrics
    // (entities, singletons, runners, runnersHealthy, shards) but not a Layer.
    // These metrics are automatically registered when cluster components are used.
    /** Effect Logger + OTEL (traces, metrics, logs); OTLP when configured, plus local format mirrors. */
    const observabilityLayer = isFeatureEnabled(fo, 'OBSERVABILITY')
        ? ObservabilityStackLive
        : (NodeSdk.layerEmpty as Layer.Layer<never, any, unknown>);
    // Do not put observability inside mergeAll with PII / hooks: parallel Layer scopes race on
    // FiberRef currentLoggers, so layers that log during Layer.effect (e.g. PiiEncryptionLive) can
    // run with default/pretty loggers while the tee is not installed — stdout shows timestamp=… lines
    // that never reach EVENTIVA_LOG_FILE. Sequencing observability outermost fixes that.
    const baseLayers: Layer.Layer<never, any, unknown>[] = [
        runtimeConfigLayer,
        extensionConfigLayer,
        isFeatureEnabled(fo, 'CLUSTER') ? clusterLayerDefault : Layer.empty,
        piiLayer,
        isFeatureEnabled(fo, 'SCHEMA_STACK') ? schemaStack : Layer.empty,
        options.databaseLayer,
        isFeatureEnabled(fo, 'SCHEMA_STACK') ? runtimeSchemaDdlLayer : RuntimeSchemaDDLNoOpLayer,
        hooksStack,
        scopeLayer,
    ];
    const baseMerged = Layer.mergeAll(
        ...(baseLayers as [Layer.Layer<never, any, unknown>, ...Layer.Layer<never, any, unknown>[]])
    );
    const base = isFeatureEnabled(fo, 'OBSERVABILITY')
        ? baseMerged.pipe(Layer.provideMerge(observabilityLayer))
        : baseMerged;
    const entitiesLayer = isFeatureEnabled(fo, 'EXTENSIONS')
        ? mergeEntityLayers([...options.extensions.map((e) => e.layer)])
        : Layer.empty;
    return entitiesLayer.pipe(Layer.provideMerge(base)) as Layer.Layer<never, any, unknown>;
}

/**
 * Construct the runtime layer that provides the HTTP server and optional entity endpoints; must be provided after bootstrap so the EntityRegistry is populated.
 *
 * @param options - Platform template options controlling ports, feature overrides and explicit entity endpoint descriptors
 * @returns A layer that yields an `EntityEndpointsServer` descriptor:
 * - If `ENTITY_ENDPOINTS` is enabled and a port is configured, the layer starts an HTTP server and exposes entity endpoints on that port.
 * - If a port is configured but entity endpoints are disabled, the layer starts an HTTP server that responds with a static message and returns the server descriptor.
 * - If no port is configured, returns a descriptor with `port: 0` (no server started).
 */
function buildRuntimeLayer(options: CreatePlatformTemplateOptions): Layer.Layer<EntityEndpointsServer, any, unknown> {
    const fo = options.featureOverrides;
    const endpointsPort = options.endpointsPort ?? 3000;
    const useEntityEndpoints = isFeatureEnabled(fo, 'ENTITY_ENDPOINTS');
    const explicitDescriptors = options.entityEndpoints ?? [];
    // Build entity endpoints layer when feature is on and port is set. Descriptors can be empty;
    // makeEntityEndpointsLayer discovers entities from EntityRegistry (populated by runCoreStartup).
    if (useEntityEndpoints && options.endpointsPort !== undefined) {
        const serverLayer = NodeHttpServer.layer(() => createServer(), { port: endpointsPort, host: '0.0.0.0' });
        const platformContextLayer = NodeHttpServer.layerContext;
        const endpointsLayer = makeEntityEndpointsLayer(explicitDescriptors, {
            port: endpointsPort,
            featureOverrides: options.featureOverrides,
        });
        return endpointsLayer.pipe(
            Layer.provide(serverLayer),
            Layer.provide(platformContextLayer)
        ) as Layer.Layer<EntityEndpointsServer, any, unknown>;
    }
    if (options.endpointsPort !== undefined) {
        const serverLayer = Layer.scopedDiscard(
            Effect.acquireRelease(
                Effect.sync(() => {
                    const server = createServer((_req, res) => {
                        res.statusCode = 200;
                        res.end('Eventiva runtime');
                    });
                    server.listen(endpointsPort, '0.0.0.0');
                    return server;
                }),
                (server) =>
                    Effect.promise(
                        () =>
                            new Promise<void>((resolve, reject) => {
                                server.close((error) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve();
                                });
                            })
                    ).pipe(Effect.catchAll(() => Effect.void))
            )
        );
        return Layer.merge(serverLayer, Layer.succeed(EntityEndpointsServer, { port: endpointsPort })) as Layer.Layer<
            EntityEndpointsServer,
            any,
            unknown
        >;
    }
    return Layer.succeed(EntityEndpointsServer, { port: 0 }) as Layer.Layer<EntityEndpointsServer, any, unknown>;
}

/**
 * Builds a two-phase platform template exposing separate bootstrap and runtime layers.
 *
 * The bootstrap layer performs core startup (including population of the EntityRegistry).
 * The runtime layer exposes HTTP and entity endpoints and must be started after the bootstrap layer has populated runtime state.
 *
 * @returns An object with `getBootstrapLayer()` to obtain the bootstrap layer and `getRuntimeLayer()` to obtain the runtime layer
 */
export function createPlatformTemplateTwoPhase(
    options: CreatePlatformTemplateOptions
): PlatformTemplateTwoPhase {
    const bootstrapLayer = buildBootstrapStack(options);
    return {
        getBootstrapLayer: () => bootstrapLayer,
        getRuntimeLayer: () => buildRuntimeLayer(options),
    };
}

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
export function createPlatformTemplate(options: CreatePlatformTemplateOptions): Layer.Layer<never, any, unknown> {
    const template = createPlatformTemplateTwoPhase(options);
    return template.getRuntimeLayer().pipe(Layer.provide(template.getBootstrapLayer())) as Layer.Layer<
        never,
        any,
        unknown
    >;
}
