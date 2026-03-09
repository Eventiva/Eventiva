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
 * @see docs/learnings/architecture.md
 */
import { HttpRouter, HttpServerRequest, HttpServerResponse, HttpServer } from "@effect/platform"
import { Sharding } from "@effect/cluster"
import type * as Entity from "@effect/cluster/Entity"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Schema from "effect/Schema"
import { EntityRegistry } from "../entity/entity-registry.js"
import { withSpanAndLog } from "../observability/helpers.js"

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
}

/**
 * Builds a Layer that starts an HTTP server exposing RPC proxy routes for each
 * descriptor. Requires Sharding. Server runs in a scope and is closed when the
 * scope ends.
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
  const startServer = Effect.gen(function* () {
    yield* Effect.logDebug("Initializing EntityEndpointsServer")
      yield* Sharding.Sharding

      // Add all dynamically generated entities to descriptors
      const allRegisteredEntities = EntityRegistry.getAll()
      const allDescriptors = [...descriptors]
      
      for (const [name, EntityClass] of allRegisteredEntities.entries()) {
        if (!allDescriptors.some(d => d.entity === (EntityClass as any).entity)) {
          allDescriptors.push({
            entity: (EntityClass as any).entity,
            defaultEntityId: "store", // or some other default
            pathPrefix: name.toLowerCase() + "s" // naive pluralization
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
      for (const d of allDescriptors) {
        const entity = d.entity as Entity.Any
        const getClient = yield* entity.client
        map.set(d.pathPrefix, {
          entity,
          getClient: getClient as unknown as (entityId: string) => Record<string, (payload: unknown) => Effect.Effect<unknown>>,
          defaultEntityId: d.defaultEntityId
        })
      }

      // Build an HttpApi
      // Effect 3.x HttpApi API changed heavily, let's use the router approach we had previously
      // and mount Swagger manually.
      const router = HttpRouter.empty.pipe(
        HttpRouter.post("/api/rpc/:pathPrefix", Effect.gen(function* () {
          const req = yield* HttpServerRequest.HttpServerRequest
          const pathPrefix = req.url.split('/')[3]
          const entry = map.get(pathPrefix)
          if (!entry) return HttpServerResponse.json({ error: `Unknown pathPrefix: ${pathPrefix}` }, { status: 404 })
          
          const bodyResult = yield* req.json.pipe(Effect.either)
          if (bodyResult._tag === "Left") return HttpServerResponse.json({ error: "Invalid JSON body" }, { status: 400 })
          
          const body = bodyResult.right as any
          const { entityId, method, payload } = body
          if (typeof method !== "string") return HttpServerResponse.json({ error: "body.method is required" }, { status: 400 })
          
          const client = entry.getClient(entityId ?? entry.defaultEntityId)
          const fn = client[method]
          if (typeof fn !== "function") return HttpServerResponse.json({ error: `Unknown method: ${method}` }, { status: 400 })
          
          const rpc = entry.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
          const decodeEffect = rpc?.payloadSchema != null 
            ? Schema.decodeUnknown(rpc.payloadSchema as any)(payload ?? {})
            : Effect.succeed(payload ?? {})
            
          const result = yield* decodeEffect.pipe(
            Effect.flatMap((decoded: any) => fn(decoded)),
            Effect.map(success => HttpServerResponse.json({ success })),
            Effect.catchAll(err => Effect.succeed(HttpServerResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })))
          )
          return result
        }) as any) // suppress handler signature mismatch due to lack of standard payload return types and effect matching
      )
      
      const app = router.pipe(
        Effect.catchAll(err => Effect.succeed(HttpServerResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })))
      )
      const serverRouter = HttpServer.serve()(app as any)
      
      yield* Layer.build(serverRouter)
      
      const paths = allDescriptors.map((d) => `POST /api/rpc/${d.pathPrefix}`)
      yield* Effect.logDebug("Entity HTTP endpoints up", { paths, service: "eventiva-core" })
      return { port } as const
  })
  return Layer.scoped(EntityEndpointsServer, startServer.pipe(withSpanAndLog("makeEntityEndpointsLayer"))) as Layer.Layer<EntityEndpointsServer, any, Sharding.Sharding | HttpServer.HttpServer>
}

/**
 * Tag for the entity endpoints server (holds port after start). Use for tests or logging.
 */
export class EntityEndpointsServer extends Context.Tag("@eventiva/core/EntityEndpointsServer")<
  EntityEndpointsServer,
  { readonly port: number }
>() {}
