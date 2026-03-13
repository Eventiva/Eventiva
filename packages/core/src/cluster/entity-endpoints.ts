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
import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSwagger,
  HttpServer
} from "@effect/platform"
import { NodeHttpServer } from "@effect/platform-node"
import { Sharding } from "@effect/cluster"
import type * as Entity from "@effect/cluster/Entity"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Schema from "effect/Schema"
import { EntityRegistry } from "../entity/entity-registry.js"
import { withSpanAndLog } from "../observability/helpers.js"
import {
  FeatureFlagKeys,
  type FeatureFlagOverrides
} from "../feature-flags/index.js"

/** Request body for entity RPC invoke. */
const RpcInvokePayload = Schema.Struct({
  entityId: Schema.optional(Schema.String),
  method: Schema.String,
  payload: Schema.optional(Schema.Unknown)
})

/** Success response: { success: unknown }. */
const RpcInvokeSuccess = Schema.Struct({
  success: Schema.Unknown
})

/** Shutdown response. */
const ShutdownSuccess = Schema.Struct({
  ok: Schema.Literal(true),
  message: Schema.String
})

/** Entity RPC API: one group "EntityRpc", one endpoint POST /api/rpc/:pathPrefix. */
const EntityRpcEndpoint = HttpApiEndpoint.post("invoke", "/api/rpc/:pathPrefix")
  .setPath(Schema.Struct({ pathPrefix: Schema.String }))
  .setPayload(RpcInvokePayload)
  .addSuccess(RpcInvokeSuccess)

const EntityRpcGroup = HttpApiGroup.make("EntityRpc").add(EntityRpcEndpoint)

/** Shutdown: GET and POST /api/shutdown — return 200 then exit process. */
const ShutdownGetEndpoint = HttpApiEndpoint.get("shutdownGet", "/api/shutdown").addSuccess(ShutdownSuccess)
const ShutdownPostEndpoint = HttpApiEndpoint.post("shutdownPost", "/api/shutdown")
  .setPayload(Schema.Struct({}))
  .addSuccess(ShutdownSuccess)
const ShutdownGroup = HttpApiGroup.make("Shutdown").add(ShutdownGetEndpoint).add(ShutdownPostEndpoint)

/** Top-level API used by HttpApiBuilder.serve and HttpApiSwagger. */
const EntityRpcApi = HttpApi.make("EventivaEntityRpc").add(EntityRpcGroup).add(ShutdownGroup)

/**
 * Descriptor for exposing an entity over HTTP/RPC. Register with the platform
 * so the gateway creates POST /api/rpc/:pathPrefix for that entity.
 */
export interface EntityEndpointDescriptor {
  /** The cluster entity (e.g. Contact). */
  readonly entity: Entity.Any
  /** Default entityId when the request omits it (e.g. "store" for Contact). */
  readonly defaultEntityId: string
  /** URL path segment (e.g. "contacts"). Request path is /api/rpc/:pathPrefix. */
  readonly pathPrefix: string
}

/**
 * Build a single entity endpoint descriptor. Pass to createPlatformTemplate entityEndpoints
 * so the HTTP server exposes POST /api/rpc/:pathPrefix for this entity.
 */
export function makeEntityEndpointDescriptor(
  entity: Entity.Any,
  defaultEntityId: string,
  pathPrefix: string
): EntityEndpointDescriptor {
  return { entity, defaultEntityId, pathPrefix }
}

export interface EntityEndpointsOptions {
  readonly port?: number
  /** Feature flag overrides for debugging. Env: EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER, etc. */
  readonly featureOverrides?: FeatureFlagOverrides
}

function isEntityEndpointFlagEnabled(
  overrides: FeatureFlagOverrides | undefined,
  key: keyof typeof FeatureFlagKeys
): boolean {
  const k = FeatureFlagKeys[key]
  if (overrides && k in overrides) return overrides[k] ?? true
  const envKey = `EVENTIVA_FEATURE_${key}` as const
  const v = process.env[envKey]
  if (v === "false" || v === "0") return false
  if (v === "true" || v === "1") return true
  return true
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
export function makeEntityEndpointsLayer(
  descriptors: ReadonlyArray<EntityEndpointDescriptor>,
  options: EntityEndpointsOptions = {}
): Layer.Layer<EntityEndpointsServer, any, Sharding.Sharding | HttpServer.HttpServer> {
  const port = options.port ?? 3000
  const fo = options.featureOverrides
  const useFullInit = isEntityEndpointFlagEnabled(fo, "ENTITY_ENDPOINTS_FULL_INIT")
  const startServer = Effect.gen(function* () {
    yield* Effect.logDebug("Initializing EntityEndpointsServer")
    if (!useFullInit) {
      yield* Effect.logDebug("EntityEndpointsServer: skipping full init (EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_INIT=false)")
      return { port } as const
    }
    if (isEntityEndpointFlagEnabled(fo, "ENTITY_ENDPOINTS_SHARDING")) {
      yield* Sharding.Sharding
    } else {
      yield* Effect.logDebug("EntityEndpointsServer: skipping Sharding (EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SHARDING=false)")
    }

    // Add all dynamically generated entities to descriptors
    const allRegisteredEntities = EntityRegistry.getAll()
    const allDescriptors = [...descriptors]

    for (const [name, EntityClass] of allRegisteredEntities.entries()) {
      if (!allDescriptors.some((d) => d.entity === (EntityClass as any).entity)) {
        allDescriptors.push({
          entity: (EntityClass as any).entity,
          defaultEntityId: "store",
          pathPrefix: name.toLowerCase() + "s"
        })
      }
    }

    const map = new Map<
      string,
      {
        entity: Entity.Any
        getClient: (entityId: string) => Record<string, (payload: unknown) => Effect.Effect<unknown>>
        defaultEntityId: string
      }
    >()
    if (isEntityEndpointFlagEnabled(fo, "ENTITY_ENDPOINTS_CLIENT_FETCH")) {
      for (const d of allDescriptors) {
        const entity = d.entity as Entity.Any
        const getClient = yield* entity.client
        map.set(d.pathPrefix, {
          entity,
          getClient: getClient as unknown as (
            entityId: string
          ) => Record<string, (payload: unknown) => Effect.Effect<unknown>>,
          defaultEntityId: d.defaultEntityId
        })
      }
    } else {
      for (const d of allDescriptors) {
        map.set(d.pathPrefix, {
          entity: d.entity as Entity.Any,
          getClient: () => ({}),
          defaultEntityId: d.defaultEntityId
        })
      }
    }

    // Implement the EntityRpc group: single handler that uses the descriptor map.
    const entityRpcGroupLive = HttpApiBuilder.group(EntityRpcApi, "EntityRpc", (handlers) =>
      handlers.handle("invoke", ({ path: { pathPrefix }, payload }) =>
        Effect.gen(function* () {
          const entry = map.get(pathPrefix)
          if (!entry)
            return { success: { error: `Unknown pathPrefix: ${pathPrefix}` } } as {
              success: unknown
            }
          const { entityId, method, payload: payloadData } = payload
          if (typeof method !== "string")
            return { success: { error: "body.method is required" } } as { success: unknown }
          const client = entry.getClient(entityId ?? entry.defaultEntityId)
          const fn = client[method]
          if (typeof fn !== "function")
            return { success: { error: `Unknown method: ${method}` } } as { success: unknown }
          const rpc = entry.entity.protocol.requests.get(method) as
            | { payloadSchema: Schema.Schema<unknown> }
            | undefined
          const decodeEffect =
            rpc?.payloadSchema != null
              ? Schema.decodeUnknown(rpc.payloadSchema as Schema.Schema<unknown>)(payloadData ?? {})
              : Effect.succeed(payloadData ?? {})
          const result = yield* decodeEffect.pipe(
            Effect.flatMap((decoded: unknown) => fn(decoded)),
            Effect.map((success) => ({ success })),
            Effect.catchAll((err) =>
              Effect.succeed({
                success: { error: err instanceof Error ? err.message : String(err) }
              })
            )
          )
          return result as { success: unknown }
        })
      )
    )

    const shutdownResponse = { ok: true as const, message: "Shutting down" }
    const scheduleExit = Effect.sync(() => setTimeout(() => process.exit(0), 100))
    const shutdownGroupLive = HttpApiBuilder.group(EntityRpcApi, "Shutdown", (handlers) =>
      handlers
        .handle("shutdownGet", () => Effect.succeed(shutdownResponse).pipe(Effect.tap(() => scheduleExit)))
        .handle("shutdownPost", () => Effect.succeed(shutdownResponse).pipe(Effect.tap(() => scheduleExit)))
    )

    // Layer that provides HttpApi.Api (required by HttpApiSwagger.layer() and HttpApiBuilder.serve).
    const apiLayer = HttpApiBuilder.api(EntityRpcApi).pipe(
      Layer.provide(entityRpcGroupLive),
      Layer.provide(shutdownGroupLive)
    )

    const useFullLayerBuild = isEntityEndpointFlagEnabled(fo, "ENTITY_ENDPOINTS_FULL_LAYER_BUILD")
    if (useFullLayerBuild) {
      // Serve the API and mount Swagger at /api/docs; both require HttpApi.Api (provided by apiLayer).
      const serveLayer = HttpApiBuilder.serve()
      const swaggerLayer = HttpApiSwagger.layer({ path: "/api/docs" })
      const serveAndSwaggerLayers = isEntityEndpointFlagEnabled(fo, "ENTITY_ENDPOINTS_SWAGGER")
        ? Layer.mergeAll(serveLayer, swaggerLayer)
        : serveLayer

      const fullServerLayer = serveAndSwaggerLayers.pipe(
        Layer.provide(apiLayer),
        Layer.provide(NodeHttpServer.layerContext)
      )

      yield* Layer.build(fullServerLayer)
    } else {
      // Minimal: server is already listening via NodeHttpServer; Layer.build would mount routes.
      // Skip full layer build to avoid "initial" crash – server responds with 404 for /api/*.
      yield* Effect.logDebug("EntityEndpointsServer: skipping full layer build (EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_LAYER_BUILD=false)")
    }

    const paths = allDescriptors.map((d) => `POST /api/rpc/${d.pathPrefix}`)
    yield* Effect.logDebug("Entity HTTP endpoints up", { paths, service: "eventiva-core" })
    return { port } as const
  })
  return Layer.scoped(
    EntityEndpointsServer,
    startServer.pipe(withSpanAndLog("makeEntityEndpointsLayer"))
  ) as Layer.Layer<
    EntityEndpointsServer,
    any,
    Sharding.Sharding | HttpServer.HttpServer
  >
}

/**
 * Tag for the entity endpoints server (holds port after start). Use for tests or logging.
 */
export class EntityEndpointsServer extends Context.Tag(
  "@eventiva/core/EntityEndpointsServer"
)<EntityEndpointsServer, { readonly port: number }>() {}
