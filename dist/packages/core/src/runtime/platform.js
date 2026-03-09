/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer";
import * as Scope from "effect/Scope";
import { createServer } from "node:http";
import { ObservabilityLive } from "../observability/layer.js";
import { clusterLayerDefault } from "../cluster/config.js";
import { NodeHttpServer } from "@effect/platform-node";
import { makeEntityEndpointsLayer, EntityEndpointsServer } from "../cluster/entity-endpoints.js";
import { PiiEncryptionLive } from "../security/index.js";
import { ExtensionHooksLive, WorkflowEngineLayerInMemory } from "../extensions/extension-hooks.js";
import { mergeEntityLayers } from "../extensions/extension-registry.js";
import { WorkflowRegistryLive } from "../workflow/engine.js";
import { StartupBannerLayer } from "./startup-banner.js";
import { FinalTableStoreLive, SchemaFinalizer, SchemaFinalizerNoOp, SchemaRegistryConfigLive, TableColumnRegistryLive, TableRelationsRegistryLive } from "../schema/index.js";
/**
 * Builds a platform Layer that provides Observability + Cluster + Database +
 * ExtensionHooks + WorkflowEngine + WorkflowRegistry + merged extension layers,
 * and optionally an HTTP server for entity endpoints.
 */
export function createPlatformTemplate(options) {
    const scopeLayer = Layer.scoped(Scope.Scope, Scope.make());
    const schemaConfigLayer = SchemaRegistryConfigLive(options.extensions.length);
    const schemaStack = TableColumnRegistryLive.pipe(Layer.provideMerge(FinalTableStoreLive), Layer.provideMerge(TableRelationsRegistryLive), Layer.provideMerge(schemaConfigLayer), Layer.provideMerge(Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp)));
    const hooksStack = Layer.mergeAll(ExtensionHooksLive, WorkflowEngineLayerInMemory, WorkflowRegistryLive);
    const base = Layer.mergeAll(ObservabilityLive, clusterLayerDefault, PiiEncryptionLive, schemaStack, options.databaseLayer, hooksStack, scopeLayer);
    const entitiesLayer = mergeEntityLayers([
        ...options.extensions.map((e) => e.layer),
        StartupBannerLayer
    ]);
    let stack = entitiesLayer.pipe(Layer.provideMerge(base));
    const endpoints = options.entityEndpoints ?? [];
    const port = options.endpointsPort ?? 3000;
    if (endpoints.length > 0 || options.endpointsPort !== undefined) {
        // Start HTTP server when entity endpoints are provided or endpointsPort is set (for /api/docs, shutdown, etc.)
        const serverLayer = NodeHttpServer.layer(() => createServer(), { port, host: "0.0.0.0" });
        const platformContextLayer = NodeHttpServer.layerContext;
        const endpointsLayer = makeEntityEndpointsLayer(endpoints, { port });
        stack = Layer.merge(stack, endpointsLayer.pipe(Layer.provide(stack), Layer.provide(serverLayer), Layer.provide(platformContextLayer)));
    }
    else {
        // No HTTP server: provide dummy so defaultRuntimeProgram's yield* EntityEndpointsServer succeeds
        stack = Layer.merge(stack, Layer.succeed(EntityEndpointsServer, { port: 0 }));
    }
    return stack;
}
