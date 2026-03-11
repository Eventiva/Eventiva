import type { ExtensionLayer } from "@eventiva/core";
export { HelloWorld } from "./entity.js";
export { HelloWorldConfig, HelloWorldConfigLayer } from "./config.js";
export { sayHelloHandler } from "./handlers.js";
export { HelloWorldWorkflowAndLoadLayer } from "./workflow.js";
/**
 * HelloWorld extension Layer: workflow (listens to core/loaded, publishes hello-world/onLoad) + entity with hooks.
 * Requires ExtensionHookPubSub (as ExtensionHooks) and WorkflowEngine.
 */
export declare const HelloWorldLayer: ExtensionLayer;
//# sourceMappingURL=index.d.ts.map