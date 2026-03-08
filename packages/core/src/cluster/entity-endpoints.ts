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
import { Sharding } from "@effect/cluster"
import type * as Entity from "@effect/cluster/Entity"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Runtime from "effect/Runtime"
import * as Schema from "effect/Schema"

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
): Layer.Layer<EntityEndpointsServer, never, Sharding.Sharding> {
  const port = options.port ?? 3000
  return Layer.scoped(
    EntityEndpointsServer,
    Effect.gen(function* () {
      yield* Sharding.Sharding
      const runtime = yield* Effect.runtime<Sharding.Sharding>()
      const map = new Map<
        string,
        {
          entity: Entity.Any
          getClient: (entityId: string) => Record<string, (payload: unknown) => Effect.Effect<unknown>>
          defaultEntityId: string
        }
      >()
      for (const d of descriptors) {
        const entity = d.entity as Entity.Any
        const getClient = yield* entity.client
        map.set(d.pathPrefix, {
          entity,
          getClient: getClient as unknown as (entityId: string) => Record<string, (payload: unknown) => Effect.Effect<unknown>>,
          defaultEntityId: d.defaultEntityId
        })
      }
      const { createServer } = yield* Effect.promise(() => import("node:http"))
      const buildOpenApiSpec = (): object => {
        const paths: Record<string, object> = {}
        const crudMethods = ["list", "get", "create", "update", "delete"] as const
        for (const [pathPrefix, entry] of map) {
          const rpcPath = `/api/rpc/${pathPrefix}`
          const methods = Array.from(entry.entity.protocol.requests.keys())
          const hasCrud = crudMethods.every((m) => entry.entity.protocol.requests.has(m))
          paths[rpcPath] = {
            post: {
              summary: `RPC proxy for entity ${pathPrefix}`,
              description: `Body: { entityId?: string, method: string, payload?: object }. Methods: ${methods.join(", ")}. Default entityId: ${entry.defaultEntityId}.`,
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["method"],
                      properties: {
                        entityId: { type: "string", description: "Entity ID (defaults to entity default)" },
                        method: { type: "string", enum: methods, description: "RPC method name" },
                        payload: { type: "object", description: "Method payload (JSON); decoded with entity schema (e.g. dateOfBirth as ISO date string)" }
                      }
                    }
                  }
                }
              },
              responses: {
                "200": { description: "RPC success", content: { "application/json": { schema: { type: "object", properties: { success: {} } } } } },
                "400": { description: "Bad request (unknown method or invalid payload)" },
                "500": { description: "RPC or decode error" }
              }
            }
          }
          if (hasCrud) {
            const restBase = `/api/${pathPrefix}`
            paths[restBase] = {
              get: {
                summary: `List ${pathPrefix}`,
                description: `Returns all items. Uses default entityId: ${entry.defaultEntityId}.`,
                responses: {
                  "200": {
                    description: "List of items",
                    content: { "application/json": { schema: { type: "object", properties: { success: { type: "array", items: {} } } } } }
                  },
                  "500": { description: "Server error" }
                }
              },
              post: {
                summary: `Create ${pathPrefix} item`,
                description: `Request body = entity fields (e.g. fullname, dateOfBirth, email, phone). Returns { success: { id } }.`,
                requestBody: {
                  required: true,
                  content: { "application/json": { schema: { type: "object", description: "Entity fields" } } }
                },
                responses: {
                  "200": {
                    description: "Created",
                    content: { "application/json": { schema: { type: "object", properties: { success: { type: "object", properties: { id: { type: "string" } } } } } } }
                  },
                  "400": { description: "Invalid body" },
                  "500": { description: "Server error" }
                }
              }
            }
            paths[`${restBase}/{id}`] = {
              get: {
                summary: `Get ${pathPrefix} by id`,
                description: `Returns a single item or 404.`,
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                  "200": { description: "Item", content: { "application/json": { schema: { type: "object", properties: { success: {} } } } } },
                  "404": { description: "Not found" },
                  "500": { description: "Server error" }
                }
              },
              patch: {
                summary: `Update ${pathPrefix} item`,
                description: `Request body = partial fields to update.`,
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                requestBody: {
                  content: { "application/json": { schema: { type: "object", description: "Partial entity fields" } } }
                },
                responses: {
                  "200": { description: "Updated", content: { "application/json": { schema: { type: "object", properties: { success: { type: "object", nullable: true } } } } } },
                  "404": { description: "Not found" },
                  "500": { description: "Server error" }
                }
              },
              delete: {
                summary: `Delete ${pathPrefix} item`,
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                  "200": { description: "Deleted" },
                  "404": { description: "Not found" },
                  "500": { description: "Server error" }
                }
              }
            }
          }
        }
        return {
          openapi: "3.0.0",
          info: { title: "Eventiva Entity API", version: "0.0.1", description: "REST and RPC proxy to cluster entity CRUD." },
          paths
        }
      }
      const server = createServer((req, res) => {
        const send = (status: number, body: object) => {
          res.statusCode = status
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify(body))
        }
        const url = req.url ?? ""
        if (req.method === "GET" && (url === "/api/openapi.json" || url === "/api/openapi.json/")) {
          send(200, buildOpenApiSpec())
          return
        }
        if (req.method === "GET" && (url === "/api/docs" || url === "/api/docs/")) {
          res.statusCode = 200
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Eventiva Entity RPC - Swagger UI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({ url: "/api/openapi.json", dom_id: "#swagger-ui" });
  </script>
</body>
</html>`)
          return
        }
        if ((req.method === "GET" || req.method === "POST") && (url === "/api/shutdown" || url === "/api/shutdown/")) {
          send(200, { ok: true, message: "Shutting down" })
          setImmediate(() => process.exit(0))
          return
        }
        const pathname = (url.split("?")[0] ?? "").replace(/\/$/, "") || "/"
        const pathParts = pathname.split("/").filter(Boolean)
        const isNotFoundError = (err: unknown) =>
          typeof err === "object" && err !== null && "_tag" in err && (err as { _tag: string })._tag === "NotFound"
        if (pathParts[0] === "api" && pathParts.length >= 2) {
          const pathPrefix = pathParts[1]
          const id = pathParts[2] ?? null
          const entry = map.get(pathPrefix)
          const crudMethods = ["list", "get", "create", "update", "delete"] as const
          const hasCrud = entry && crudMethods.every((m) => entry.entity.protocol.requests.has(m))
          if (hasCrud && req.method === "GET" && pathParts.length === 2) {
            const run = (method: string, payload: unknown) => {
              const entityIdFinal = entry!.defaultEntityId
              const client = entry!.getClient(entityIdFinal)
              const fn = client[method]
              const rpc = entry!.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
              const decodeEffect =
                rpc?.payloadSchema != null
                  ? Schema.decodeUnknown(rpc.payloadSchema)(payload ?? {})
                  : Effect.succeed(payload ?? {})
              return decodeEffect.pipe(Effect.flatMap((decoded) => fn(decoded)))
            }
            Runtime.runPromise(runtime, run("list", {})).then(
              (result: unknown) => send(200, { success: result }),
              (err: unknown) => send(500, { error: err instanceof Error ? err.message : String(err) })
            )
            return
          }
          if (hasCrud && req.method === "GET" && pathParts.length === 3 && id) {
            const run = (method: string, payload: unknown) => {
              const entityIdFinal = entry!.defaultEntityId
              const client = entry!.getClient(entityIdFinal)
              const fn = client[method]
              const rpc = entry!.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
              const decodeEffect =
                rpc?.payloadSchema != null
                  ? Schema.decodeUnknown(rpc.payloadSchema)(payload ?? {})
                  : Effect.succeed(payload ?? {})
              return decodeEffect.pipe(Effect.flatMap((decoded) => fn(decoded)))
            }
            Runtime.runPromise(runtime, run("get", { id })).then(
              (result: unknown) => send(200, { success: result }),
              (err: unknown) => {
                if (isNotFoundError(err)) send(404, { error: "Not found" })
                else send(500, { error: err instanceof Error ? err.message : String(err) })
              }
            )
            return
          }
          if (hasCrud && req.method === "POST" && pathParts.length === 2) {
            let body = ""
            req.on("data", (chunk: Buffer) => { body += chunk.toString() })
            req.on("end", () => {
              try {
                const payload = body ? JSON.parse(body) : {}
                const run = (method: string, p: unknown) => {
                  const entityIdFinal = entry!.defaultEntityId
                  const client = entry!.getClient(entityIdFinal)
                  const fn = client[method]
                  const rpc = entry!.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
                  const decodeEffect =
                    rpc?.payloadSchema != null ? Schema.decodeUnknown(rpc.payloadSchema)(p) : Effect.succeed(p)
                  return decodeEffect.pipe(Effect.flatMap((decoded) => fn(decoded)))
                }
                Runtime.runPromise(runtime, run("create", payload)).then(
                  (result: unknown) => send(200, { success: result }),
                  (err: unknown) => send(500, { error: err instanceof Error ? err.message : String(err) })
                )
              } catch (e) {
                send(400, { error: e instanceof Error ? e.message : String(e) })
              }
            })
            return
          }
          if (hasCrud && (req.method === "PATCH" || req.method === "PUT") && pathParts.length === 3 && id) {
            let body = ""
            req.on("data", (chunk: Buffer) => { body += chunk.toString() })
            req.on("end", () => {
              try {
                const patch = body ? JSON.parse(body) : {}
                const run = (method: string, p: unknown) => {
                  const entityIdFinal = entry!.defaultEntityId
                  const client = entry!.getClient(entityIdFinal)
                  const fn = client[method]
                  const rpc = entry!.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
                  const decodeEffect =
                    rpc?.payloadSchema != null ? Schema.decodeUnknown(rpc.payloadSchema)(p) : Effect.succeed(p)
                  return decodeEffect.pipe(Effect.flatMap((decoded) => fn(decoded)))
                }
                Runtime.runPromise(runtime, run("update", { id, patch })).then(
                  () => send(200, { success: null }),
                  (err: unknown) => {
                    if (isNotFoundError(err)) send(404, { error: "Not found" })
                    else send(500, { error: err instanceof Error ? err.message : String(err) })
                  }
                )
              } catch (e) {
                send(400, { error: e instanceof Error ? e.message : String(e) })
              }
            })
            return
          }
          if (hasCrud && req.method === "DELETE" && pathParts.length === 3 && id) {
            const run = (method: string, p: unknown) => {
              const entityIdFinal = entry!.defaultEntityId
              const client = entry!.getClient(entityIdFinal)
              const fn = client[method]
              const rpc = entry!.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
              const decodeEffect =
                rpc?.payloadSchema != null ? Schema.decodeUnknown(rpc.payloadSchema)(p) : Effect.succeed(p)
              return decodeEffect.pipe(Effect.flatMap((decoded) => fn(decoded)))
            }
            Runtime.runPromise(runtime, run("delete", { id })).then(
              () => send(200, { success: null }),
              (err: unknown) => {
                if (isNotFoundError(err)) send(404, { error: "Not found" })
                else send(500, { error: err instanceof Error ? err.message : String(err) })
              }
            )
            return
          }
        }
        if (req.method !== "POST" || !url.startsWith("/api/rpc/")) {
          send(404, { error: "Not found. Use GET/POST /api/:pathPrefix (REST), POST /api/rpc/:pathPrefix (RPC), GET/POST /api/shutdown, or GET /api/openapi.json, GET /api/docs" })
          return
        }
        const pathPrefix = url.replace(/^\/api\/rpc\//, "").split("/")[0] ?? ""
        const entry = map.get(pathPrefix)
        if (!entry) {
          send(404, { error: `Unknown pathPrefix: ${pathPrefix}` })
          return
        }
        let body = ""
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString()
        })
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}") as {
              entityId?: string
              method: string
              payload?: unknown
            }
            const { entityId, method, payload } = parsed
            if (typeof method !== "string") {
              send(400, { error: "body.method is required" })
              return
            }
            const entityIdFinal = entityId ?? entry.defaultEntityId
            const client = entry.getClient(entityIdFinal)
            const fn = client[method]
            if (typeof fn !== "function") {
              send(400, { error: `Unknown method: ${method}` })
              return
            }
            const rpc = entry.entity.protocol.requests.get(method) as { payloadSchema: Schema.Schema<unknown> } | undefined
            const rawPayload = payload ?? {}
            const decodeEffect =
              rpc?.payloadSchema != null
                ? Schema.decodeUnknown(rpc.payloadSchema)(rawPayload)
                : Effect.succeed(rawPayload)
            const runEffect = decodeEffect.pipe(
              Effect.flatMap((decoded) => fn(decoded))
            )
            Runtime.runPromise(runtime, runEffect).then(
              (result: unknown) => send(200, { success: result }),
              (err: unknown) => send(500, { error: err instanceof Error ? err.message : String(err) })
            )
          } catch (e) {
            send(400, { error: e instanceof Error ? e.message : String(e) })
          }
        })
      })
      server.listen(port)
      const paths = descriptors.map((d) => `POST /api/rpc/${d.pathPrefix}`)
      yield* Effect.log("Entity HTTP endpoints up", { port, paths, service: "eventiva-core" })
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          server.close()
        })
      )
      return { port }
    })
  )
}

/**
 * Tag for the entity endpoints server (holds port after start). Use for tests or logging.
 */
export class EntityEndpointsServer extends Context.Tag("@eventiva/core/EntityEndpointsServer")<
  EntityEndpointsServer,
  { readonly port: number }
>() {}
