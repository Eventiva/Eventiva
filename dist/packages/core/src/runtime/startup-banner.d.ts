import * as Layer from "effect/Layer";
import { ExtensionHookPubSub } from "../extensions/extension-hook-pubsub.js";
/**
 * Layer that registers the core startup banner (wordart + copyright). Requires
 * ExtensionHookPubSub and WorkflowEngine. Merged by createPlatformTemplate.
 */
export declare const StartupBannerLayer: Layer.Layer<never, never, ExtensionHookPubSub | import("@effect/workflow/WorkflowEngine").WorkflowEngine>;
//# sourceMappingURL=startup-banner.d.ts.map