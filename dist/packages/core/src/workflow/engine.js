/**
 * Workflow engine: in-memory registry with observability (span, log, metric).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import { withSpanAndLog } from "../observability/helpers.js";
const WorkflowRegistryTypeId = Symbol.for("@eventiva/core/WorkflowRegistry");
class WorkflowRegistryImpl {
    registry;
    _tag = "WorkflowRegistry";
    [WorkflowRegistryTypeId] = WorkflowRegistryTypeId;
    constructor(registry) {
        this.registry = registry;
    }
    register(workflow, executeFn) {
        return withSpanAndLog(`workflow.register`, { attributes: { workflow: workflow.name } })(Effect.flatMap(Ref.get(this.registry), (map) => Ref.set(this.registry, new Map(map).set(workflow.name, executeFn))));
    }
    execute(workflow, options) {
        return withSpanAndLog(`workflow.execute`, {
            attributes: { workflow: workflow.name },
            metricName: "workflow.execute.duration"
        })(Effect.flatMap(Ref.get(this.registry), (map) => {
            const fn = map.get(workflow.name);
            if (!fn)
                return Effect.die(new Error(`Workflow not registered: ${workflow.name}`));
            return fn(options);
        }));
    }
}
export const WorkflowRegistry = Context.GenericTag("@eventiva/core/WorkflowRegistry");
const makeRegistry = Effect.gen(function* () {
    const ref = yield* Ref.make(new Map());
    return new WorkflowRegistryImpl(ref);
}).pipe(withSpanAndLog("makeRegistry"));
export const WorkflowRegistryLive = Layer.scoped(WorkflowRegistry, makeRegistry);
