/**
 * Workflow types: minimal Workflow descriptor and registry service interface.
 */
import type * as Effect from 'effect/Effect';
import type * as Schema from 'effect/Schema';

/**
 * Minimal workflow descriptor: name and schemas for payload, result, and error.
 */
export interface Workflow<Name extends string = string, Payload = unknown, Result = unknown, Error = unknown> {
    readonly name: Name;
    readonly payloadSchema?: Schema.Schema<Payload>;
    readonly resultSchema?: Schema.Schema<Result>;
    readonly errorSchema?: Schema.Schema<Error>;
}

/**
 * Options passed to execute.
 */
export interface WorkflowExecuteOptions<Payload = unknown> {
    readonly payload: Payload;
}

/**
 * Workflow registry service: register workflows and execute by name.
 */
export interface WorkflowRegistry {
    readonly register: <Payload, Result, Error, R>(
        workflow: Workflow<string, Payload, Result, Error>,
        executeFn: (options: WorkflowExecuteOptions<Payload>) => Effect.Effect<Result, Error, R>
    ) => Effect.Effect<void, never, R>;

    readonly execute: <Payload, Result, Error>(
        workflow: Workflow<string, Payload, Result, Error>,
        options: WorkflowExecuteOptions<Payload>
    ) => Effect.Effect<Result, Error>;
}
