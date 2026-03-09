/**
 * Minimal test script to identify the problematic process.
 * This script enables processes one by one and catches errors.
 */
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import {
  createPlatformTemplate,
  DatabaseLiveInMemory,
  runCoreStartup,
  type DefaultRunnerProfile
} from "@eventiva/core"
import { NodeRuntime } from "@effect/platform-node"

type PlatformTemplate = Layer.Layer<never, any, unknown>

const databaseLayer = DatabaseLiveInMemory

// Test configuration - enable one at a time
const testConfig = {
  enableObservability: false,
  enableCluster: false,
  enablePiiEncryption: false,
  enableSchema: false,
  enableDatabase: false,
  enableHooks: false,
  enableStartupBanner: false,
  enableEntityEndpoints: false
}

function createTestPlatform(): PlatformTemplate {
  return createPlatformTemplate({
    databaseLayer,
    extensions: [],
    debug: {
      disableObservability: !testConfig.enableObservability,
      disableCluster: !testConfig.enableCluster,
      disablePiiEncryption: !testConfig.enablePiiEncryption,
      disableSchema: !testConfig.enableSchema,
      disableDatabase: !testConfig.enableDatabase,
      disableHooks: !testConfig.enableHooks,
      disableStartupBanner: !testConfig.enableStartupBanner,
      disableEntityEndpoints: !testConfig.enableEntityEndpoints
    }
  })
}

async function testPlatform() {
  console.log("Testing with config:", testConfig)
  const platform = createTestPlatform()
  
  try {
    // Try to build the layer
    const program = Effect.gen(function* () {
      yield* Effect.logInfo("Testing platform layer build...")
      // Just try to access the layer, don't run startup
      yield* Layer.build(platform)
      yield* Effect.logInfo("Platform layer built successfully!")
    })
    
    const runnable = program.pipe(
      Effect.provide(platform),
      Effect.catchAll((error) => {
        console.error("ERROR CAUGHT:", error)
        console.error("Error details:", JSON.stringify(error, null, 2))
        if (error instanceof Error) {
          console.error("Error stack:", error.stack)
        }
        return Effect.succeed(undefined)
      })
    )
    
    await Effect.runPromise(runnable)
    console.log("✓ Test passed")
  } catch (error) {
    console.error("✗ Test failed with error:", error)
    if (error instanceof Error) {
      console.error("Stack:", error.stack)
      if (error.message.includes("initial")) {
        console.error("*** FOUND THE ERROR! This configuration causes the 'initial' property error ***")
        process.exit(1)
      }
    }
    throw error
  }
}

testPlatform().catch(console.error)
