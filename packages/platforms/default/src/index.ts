/**
 * Default platform: single entry point via createPlatformTemplate. Set databaseLayer,
 * extensions, and optional entityEndpoints; core handles all merging.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer"
import {
  createPlatformTemplate,
  DatabaseLiveInMemory,
  runMain,
  type DefaultRunnerProfile
} from "@eventiva/core"
import { HelloWorldLayer } from "@eventiva/extensions.hello-world"
import { ContactLayer } from "@eventiva/extensions.contact"

/**
 * A platform template is a Layer that provides Sharding (and Runner) plus any
 * composed services. Built by createPlatformTemplate from database + extensions + optional HTTP endpoints.
 */
export type PlatformTemplate = Layer.Layer<never, any, unknown>

/**
 * Database implementation. Use DatabaseLiveInMemory for dev/tests; 
 * replace with pgDatabaseLayer from @eventiva/extensions.database-pg for PostgreSQL.
 * replace with mySQLDatabaseLayer from @eventiva/extensions.database-mysql for MySQL.
 */
const databaseLayer = DatabaseLiveInMemory

/**
 * Extensions to load (id used for schema markReady). Core adds the startup banner automatically.
 */
const extensions: Array<{ id: string; layer: Layer.Layer<unknown, unknown, unknown> }> = [
  { id: "hello-world", layer: HelloWorldLayer },
  { id: "contact", layer: ContactLayer }
]

/** Re-export so existing code can use the type from the platform package. */
export type { DefaultRunnerProfile }

/**
 * Default platform Layer. Customise by changing databaseLayer or extensions above, then re-run.
 */
export const defaultPlatformTemplate: PlatformTemplate = createPlatformTemplate({
  databaseLayer,
  extensions,
  endpointsPort: 3000
})

/**
 * Runtime entrypoint: run core's default program with DevTools and the default platform layer.
 * Run via: nx run platforms-default:run
 *
 * Entity endpoints: POST /api/rpc/contacts with body { method, payload } (entityId defaults to "store").
 * Example: curl -X POST http://localhost:3000/api/rpc/contacts -H "Content-Type: application/json" -d '{"method":"list","payload":{}}'
 */

runMain(defaultPlatformTemplate as any)