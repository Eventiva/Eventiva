import { describe, it } from 'vitest';
import { HelloWorldWorkflowAndLoadLayer } from '@eventiva/extensions.hello-world';

describe('HelloWorldWorkflowAndLoadLayer', () => {
    it('defines workflow layer', () => {
        expect(HelloWorldWorkflowAndLoadLayer).toBeDefined();
    });
});
