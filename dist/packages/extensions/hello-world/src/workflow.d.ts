/**
 * Hello-world extension workflow: runs when core/loaded is published.
 * Publishes extension/hello-world/onLoad so listeners (startup banner, etc.) run;
 * then calls sayHello once so afterCall banner runs during startup.
 */
import * as Workflow from "@effect/workflow/Workflow";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
export declare const HelloWorldWorkflow: Workflow.Workflow<"hello-world", Schema.Struct<{
    messageId: Schema.optional<typeof Schema.String>;
}>, typeof Schema.Void, typeof Schema.Never>;
export declare const HelloWorldWorkflowAndLoadLayer: Layer.Layer<never, never, unknown>;
//# sourceMappingURL=workflow.d.ts.map