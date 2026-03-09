/**
 * Debug version of the default platform: enables core processes one by one
 * to identify which one causes the "Cannot read properties of undefined (reading 'initial')" error.
 * 
 * Usage: Modify the debug flags below to enable processes one by one.
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
const extensions = [
  { id: "contact", layer: ContactLayer },
  { id: "hello-world", layer: HelloWorldLayer }
]

/** Re-export so existing code can use the type from the platform package. */
export type { DefaultRunnerProfile }

/**
 * DEBUG: Enable processes one by one to find the problematic one.
 * Start with all false, then set to true one at a time.
 */
const debugConfig = {
  enableObservability: false,
  enableCluster: false,
  enablePiiEncryption: false,
  enableSchema: false,
  enableDatabase: false,
  enableHooks: false,
  enableStartupBanner: false,
  enableEntityEndpoints: false,
  enableExtensions: false
}

/**
 * Default platform Layer with debug flags.
 */
export const defaultPlatformTemplate: PlatformTemplate = createPlatformTemplate({
  databaseLayer,
  extensions: debugConfig.enableExtensions ? extensions : [],
  endpointsPort: debugConfig.enableEntityEndpoints ? 3000 : undefined,
  debug: {
    disableObservability: !debugConfig.enableObservability,
    disableCluster: !debugConfig.enableCluster,
    disablePiiEncryption: !debugConfig.enablePiiEncryption,
    disableSchema: !debugConfig.enableSchema,
    disableDatabase: !debugConfig.enableDatabase,
    disableHooks: !debugConfig.enableHooks,
    disableStartupBanner: !debugConfig.enableStartupBanner,
    disableEntityEndpoints: !debugConfig.enableEntityEndpoints
  }
})

/**
 * Runtime entrypoint: run core's default program with DevTools and the default platform layer.
 * Run via: nx run platforms-default:run
 *
 * Entity endpoints: POST /api/rpc/contacts with body { method, payload } (entityId defaults to "store").
 * Example: curl -X POST http://localhost:3000/api/rpc/contacts -H "Content-Type: application/json" -d '{"method":"list","payload":{}}'
 */

console.log("DEBUG CONFIG:", debugConfig)
runMain(defaultPlatformTemplate as any)
