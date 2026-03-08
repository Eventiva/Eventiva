/**
 * Workflow engine: in-memory registry with observability (span, log, metric).
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
import type { WorkflowRegistry as WorkflowRegistryService } from "./types.js";
export declare const WorkflowRegistry: Context.Tag<WorkflowRegistryService, WorkflowRegistryService>;
export declare const WorkflowRegistryLive: Layer.Layer<WorkflowRegistryService, never, never>;
//# sourceMappingURL=engine.d.ts.map