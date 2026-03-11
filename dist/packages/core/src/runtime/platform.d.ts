/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer";
import { type EntityEndpointDescriptor } from "../cluster/entity-endpoints.js";
import { Database } from "../database/database.js";
import { type ExtensionRegistration } from "../extensions/extension-registry.js";
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
    /** When set, an HTTP server is started exposing RPC (and REST for CRUD entities) for these descriptors. */
    readonly entityEndpoints?: ReadonlyArray<EntityEndpointDescriptor>;
    /** Port for the entity endpoints server (default 3000). */
    readonly endpointsPort?: number;
}
/**
 * Builds a platform Layer that provides Observability + Cluster + Database +
 * ExtensionHooks + WorkflowEngine + WorkflowRegistry + merged extension layers,
 * and optionally an HTTP server for entity endpoints.
 */
export declare function createPlatformTemplate(options: CreatePlatformTemplateOptions): Layer.Layer<never, any, unknown>;
//# sourceMappingURL=platform.d.ts.map