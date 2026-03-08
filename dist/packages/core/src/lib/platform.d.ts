/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer";
import { type EntityEndpointDescriptor } from "../cluster/entity-endpoints.js";
import { Database } from "./database.js";
import { type ExtensionLayer } from "./extension-registry.js";
/**
 * Options for createPlatformTemplate. Provide a database layer and an array of
 * extension layers; optionally register entity HTTP endpoints.
 */
export interface CreatePlatformTemplateOptions {
    /**
     * Database implementation. Use DatabaseLiveInMemory for dev/tests; replace with
     * PgDatabaseLayer from @eventiva/extensions.database-pg for PostgreSQL.
     */
    readonly databaseLayer: Layer.Layer<Database>;
    /** Extension layers to merge (e.g. HelloWorldLayer, ContactLayer). */
    readonly extensions: ReadonlyArray<ExtensionLayer>;
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
export declare function createPlatformTemplate(options: CreatePlatformTemplateOptions): Layer.Layer<never, never, unknown>;
//# sourceMappingURL=platform.d.ts.map