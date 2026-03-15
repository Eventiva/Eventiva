import { describe, it } from 'vitest';
import type { Workflow, WorkflowExecuteOptions, IWorkflowRegistry } from '@eventiva/core';
import * as Schema from 'effect/Schema';

describe('Workflow types', () => {
    it('defines Workflow interface', () => {
        const workflow: Workflow<'test', string, number> = {
            name: 'test',
        };
        expect(workflow.name).toBe('test');
    });

    it('supports Workflow with schemas', () => {
        const workflow: Workflow<'test', string, number> = {
            name: 'test',
            payloadSchema: Schema.String,
            resultSchema: Schema.Number,
            errorSchema: Schema.String,
        };
        expect(workflow.payloadSchema).toBeDefined();
        expect(workflow.resultSchema).toBeDefined();
        expect(workflow.errorSchema).toBeDefined();
    });

    it('defines WorkflowExecuteOptions interface', () => {
        const opts: WorkflowExecuteOptions<string> = {
            payload: 'test',
        };
        expect(opts.payload).toBe('test');
    });

    it('defines IWorkflowRegistry interface', () => {
        // Type-only, just verify it's importable
        type _Test = IWorkflowRegistry;
        expect(true).toBe(true);
    });
});
