import { describe, it } from 'vitest';
import { WorkflowRegistry, WorkflowRegistryLive } from '@eventiva/core';
import type { Workflow, WorkflowExecuteOptions, IWorkflowRegistry } from '@eventiva/core';

describe('workflow/index', () => {
    it('exports WorkflowRegistry tag', () => {
        expect(WorkflowRegistry).toBeDefined();
    });

    it('exports WorkflowRegistryLive layer', () => {
        expect(WorkflowRegistryLive).toBeDefined();
    });

    it('exports Workflow type', () => {
        // Type-only export
        type _Test = Workflow;
        expect(true).toBe(true);
    });

    it('exports WorkflowExecuteOptions type', () => {
        // Type-only export
        type _Test = WorkflowExecuteOptions;
        expect(true).toBe(true);
    });

    it('exports IWorkflowRegistry type', () => {
        // Type-only export
        type _Test = IWorkflowRegistry;
        expect(true).toBe(true);
    });
});
