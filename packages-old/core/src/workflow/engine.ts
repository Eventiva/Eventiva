/**
 * Workflow engine: in-memory registry with observability (span, log, metric).
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Ref from 'effect/Ref';
import { withSpanAndLog } from '../observability/helpers.js';
import type { Workflow, WorkflowExecuteOptions, WorkflowRegistry as WorkflowRegistryService } from './types.js';

const WorkflowRegistryTypeId = Symbol.for('@eventiva/core/WorkflowRegistry');

class WorkflowRegistryImpl implements WorkflowRegistryService {
    readonly _tag = 'WorkflowRegistry';
    readonly [WorkflowRegistryTypeId] = WorkflowRegistryTypeId;

    constructor(
        private readonly registry: Ref.Ref<
            Map<string, (opts: WorkflowExecuteOptions<unknown>) => Effect.Effect<unknown, unknown>>
        >
    ) {}

    register<Payload, Result, Error, R>(
        workflow: Workflow<string, Payload, Result, Error>,
        executeFn: (options: WorkflowExecuteOptions<Payload>) => Effect.Effect<Result, Error, R>
    ): Effect.Effect<void, never, R> {
        return withSpanAndLog(`workflow.register`, { attributes: { workflow: workflow.name } })(
            Effect.flatMap(Ref.get(this.registry), (map) =>
                Ref.set(
                    this.registry,
                    new Map(map).set(
                        workflow.name,
                        executeFn as (opts: WorkflowExecuteOptions<unknown>) => Effect.Effect<unknown, unknown>
                    )
                )
            )
        ) as Effect.Effect<void, never, R>;
    }

    execute<Payload, Result, Error>(
        workflow: Workflow<string, Payload, Result, Error>,
        options: WorkflowExecuteOptions<Payload>
    ): Effect.Effect<Result, Error> {
        return withSpanAndLog(`workflow.execute`, {
            attributes: { workflow: workflow.name },
            metricName: 'workflow.execute.duration',
        })(
            Effect.flatMap(Ref.get(this.registry), (map) => {
                const fn = map.get(workflow.name);
                if (!fn) return Effect.die(new Error(`Workflow not registered: ${workflow.name}`));
                return fn(options) as Effect.Effect<Result, Error>;
            })
        ) as Effect.Effect<Result, Error>;
    }
}

export const WorkflowRegistry = Context.GenericTag<WorkflowRegistryService>('@eventiva/core/WorkflowRegistry');

const makeRegistry = Effect.gen(function* () {
    const ref = yield* Ref.make<
        Map<string, (opts: WorkflowExecuteOptions<unknown>) => Effect.Effect<unknown, unknown>>
    >(new Map());
    return new WorkflowRegistryImpl(ref) as WorkflowRegistryService;
}).pipe(withSpanAndLog('makeRegistry'));

export const WorkflowRegistryLive = Layer.scoped(WorkflowRegistry, makeRegistry);
