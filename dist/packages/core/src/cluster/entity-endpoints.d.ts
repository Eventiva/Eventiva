/**
 * Entity endpoint utilities: when an entity is registered on the cluster, expose
 * HTTP and RPC endpoint utilities that proxy requests to the entity client.
 *
 * - RPC over HTTP: POST /api/rpc/:pathPrefix with body { entityId?, method, payload }
 *   forwards to cluster entity client(entityId)[method](payload).
 *
 * - REST-style CRUD (when entity has list/get/create/update/delete):
 *   GET /api/:pathPrefix → list
 *   GET /api/:pathPrefix/{id} → get
 *   POST /api/:pathPrefix → create (body = fields)
 *   PATCH /api/:pathPrefix/{id} → update (body = patch)
 *   DELETE /api/:pathPrefix/{id} → delete
 *
 * Uses @effect/platform HttpApi + HttpApiBuilder so HttpApiSwagger can document the API.
 *
 * @see docs/learnings/architecture.md
 */
import { HttpServer } from '@effect/platform';
import { Sharding } from '@effect/cluster';
import type * as Entity from '@effect/cluster/Entity';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { type FeatureFlagOverrides } from '../feature-flags/index.js';
/** Required handler keys for each entity API group (used by runtime assertion and tests). */
export declare const ENTITY_GROUP_REQUIRED_HANDLER_KEYS: readonly ["invoke", "list", "get", "create", "update", "delete"];
/**
 * Validates that a built handlers object has all required entity group keys and each is a function.
 * Used in the group callback and in unit tests to surface type/shape mismatches early.
 *
 * @throws if built is null/not object, has no .handle, has no .handlers iterable, or any required key is missing or not a function
 */
export declare function validateEntityGroupHandlers(built: unknown, groupName: string, requiredKeys?: ReadonlyArray<string>): void;
/**
 * Descriptor for exposing an entity over HTTP/RPC. Register with the platform
 * so the gateway creates POST /api/rpc/:pathPrefix for that entity.
 */
export interface EntityEndpointDescriptor {
    /** The cluster entity (e.g. Contact). */
    readonly entity: Entity.Any;
    /** Default entityId when the request omits it (e.g. "store" for Contact). */
    readonly defaultEntityId: string;
    /** URL path segment (e.g. "contacts"). Request path is /api/rpc/:pathPrefix. */
    readonly pathPrefix: string;
}
/**
 * Build a single entity endpoint descriptor. Pass to createPlatformTemplate entityEndpoints
 * so the HTTP server exposes POST /api/rpc/:pathPrefix for this entity.
 *
 * @returns Effect that yields the descriptor (observable span/log/metric).
 */
export declare function makeEntityEndpointDescriptor(entity: Entity.Any, defaultEntityId: string, pathPrefix: string): Effect.Effect<EntityEndpointDescriptor>;
export interface EntityEndpointsOptions {
    readonly port?: number;
    /** Feature flag overrides for debugging. Env: EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER, etc. */
    readonly featureOverrides?: FeatureFlagOverrides;
}
/**
 * Builds a Layer that starts an HTTP server exposing RPC proxy routes for each
 * descriptor. Requires Sharding. Server runs in a scope and is closed when the
 * scope ends. Uses HttpApi + HttpApiBuilder so HttpApi.Api is provided for HttpApiSwagger.
 *
 * Route: POST /api/rpc/:pathPrefix
 * Body: { entityId?: string, method: string, payload?: unknown }
 * Response: JSON { success: result } or { error: string }
 */
export declare function makeEntityEndpointsLayer(descriptors: ReadonlyArray<EntityEndpointDescriptor>, options?: EntityEndpointsOptions): Layer.Layer<EntityEndpointsServer, any, Sharding.Sharding | HttpServer.HttpServer>;
declare const EntityEndpointsServer_base: Context.TagClass<EntityEndpointsServer, "@eventiva/core/EntityEndpointsServer", {
    readonly port: number;
}>;
/**
 * Tag for the entity endpoints server (holds port after start). Use for tests or logging.
 */
export declare class EntityEndpointsServer extends EntityEndpointsServer_base {
}
export {};
//# sourceMappingURL=entity-endpoints.d.ts.map