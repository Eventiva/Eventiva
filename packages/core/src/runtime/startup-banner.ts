/**
 * Startup banner: prints Eventiva wordart, By Resnovas wordart, and copyright as part of
 * the core startup sequence. Listens to extension/hello-world/onLoad and
 * extension/hello-world/afterCall so the banner runs when the hello-world extension
 * loads and after sayHello. Merged into the platform by createPlatformTemplate.
 */
import * as Activity from "@effect/workflow/Activity"
import * as Workflow from "@effect/workflow/Workflow"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Schema from "effect/Schema"
import { withSpanAndLog } from "../observability/helpers.js"
import {
  ExtensionHookPubSub,
  extensionHookTopic,
  type ExtensionCallContext
} from "../extensions/extension-hook-pubsub.js"

const EVENTIVA_WORDART = `
 ███████╗██╗   ██╗███████╗███╗   ██╗████████╗██╗██╗   ██╗ █████╗ 
 ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██║██║   ██║██╔══██╗
 █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║██║   ██║███████║
 ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║╚██╗ ██╔╝██╔══██║
 ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ██║ ╚████╔╝ ██║  ██║
 ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═══╝  ╚═╝  ╚═╝
`.trimEnd()

const BY_RESNOVAS_WORDART = `
 ██████╗ ██╗   ██╗    ██████╗ ███████╗███████╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ███████╗
 ██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔════╝██╔════╝████╗  ██║██╔═══██╗██║   ██║██╔══██╗██╔════╝
 ██████╔╝ ╚████╔╝     ██████╔╝█████╗  ███████╗██╔██╗ ██║██║   ██║██║   ██║███████║███████╗
 ██╔══██╗  ╚██╔╝      ██╔══██╗██╔══╝  ╚════██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║╚════██║
 ██████╔╝   ██║       ██║  ██║███████╗███████║██║ ╚████║ ██████╗  ╚████╔╝ ██║  ██║███████║
 ╚═════╝    ╚═╝       ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝   ╚══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝
`.trimEnd()

const COPYRIGHT_STATEMENT = "© 2026 Eventiva. All rights reserved."

const HELLO_WORLD = "hello-world"

// ---- OnLoad: log and print all three banners ----
const OnLoadPayload = Schema.Struct({ messageId: Schema.optional(Schema.String) })
type OnLoadPayload = Schema.Schema.Type<typeof OnLoadPayload>

const StartupBannerOnLoadWorkflow = Workflow.make({
  name: "core/startup-banner/onLoad",
  payload: OnLoadPayload,
  idempotencyKey: (p) => p.messageId ?? "onLoad",
  success: Schema.Void,
  error: Schema.Never
})

const StartupBannerOnLoadWorkflowLayer = StartupBannerOnLoadWorkflow.toLayer(
  Effect.fn((_payload: OnLoadPayload, _executionId: string) => Effect.gen(function* () {
    yield* Activity.make({
      name: "core/startup-banner/onLoad-log",
      execute: Effect.logInfo("Eventiva startup banner (core)", { service: "eventiva-core" })
    })
    yield* Effect.sync(() => {
      console.log(EVENTIVA_WORDART)
      console.log(BY_RESNOVAS_WORDART)
      console.log(COPYRIGHT_STATEMENT)
    })
  }).pipe(withSpanAndLog("startupBannerOnLoadWorkflow")))
)

// ---- AfterCall: on HelloWorld sayHello, print all three again ----
const AfterCallPayload = Schema.Struct({
  messageId: Schema.optional(Schema.String),
  context: Schema.optional(Schema.Unknown)
})
type AfterCallPayload = Schema.Schema.Type<typeof AfterCallPayload>

const StartupBannerAfterCallWorkflow = Workflow.make({
  name: "core/startup-banner/afterCall",
  payload: AfterCallPayload,
  idempotencyKey: (p) => p.messageId ?? JSON.stringify(p.context),
  success: Schema.Void,
  error: Schema.Never
})

const StartupBannerAfterCallWorkflowLayer = StartupBannerAfterCallWorkflow.toLayer(
  Effect.fn((payload: AfterCallPayload, _executionId: string) => Effect.gen(function* () {
    yield* Activity.make({
      name: "core/startup-banner/afterCall",
      execute: Effect.gen(function* () {
        const ctx = payload.context as ExtensionCallContext | undefined
        if (ctx?.entityType === "HelloWorld" && ctx?.method === "sayHello") {
          yield* Effect.logInfo("Printing startup banner for HelloWorld")
          yield* Effect.sync(() => {
            console.log(EVENTIVA_WORDART)
            console.log(BY_RESNOVAS_WORDART)
            console.log(COPYRIGHT_STATEMENT)
          })
        }
      })
    })
  }).pipe(withSpanAndLog("startupBannerAfterCallWorkflow")))
)

const RegisterListenersLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    yield* Effect.logInfo("Registering startup banner listeners")
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.listenTo(
      extensionHookTopic(HELLO_WORLD, "onLoad"),
      (_payload, messageId) =>
        StartupBannerOnLoadWorkflow.execute({ messageId }).pipe(Effect.asVoid)
    )
    yield* pubsub.listenTo(
      extensionHookTopic(HELLO_WORLD, "afterCall"),
      (payload, messageId) =>
        StartupBannerAfterCallWorkflow.execute({ context: payload, messageId }).pipe(
          Effect.asVoid
        )
    )
  }).pipe(withSpanAndLog("registerStartupBannerListeners"))
)

/**
 * Layer that registers the core startup banner (wordart + copyright). Requires
 * ExtensionHookPubSub and WorkflowEngine. Merged by createPlatformTemplate.
 */
export const StartupBannerLayer = Layer.mergeAll(
  StartupBannerOnLoadWorkflowLayer,
  StartupBannerAfterCallWorkflowLayer,
  RegisterListenersLayer
)
