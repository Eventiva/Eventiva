import { describe } from 'vitest';
import * as Layer from 'effect/Layer';
import { ContactWorkflowLayer } from '@eventiva/extensions.contact';

describe('ContactWorkflowLayer', () => {
    it('defines workflow layer', () => {
        expect(ContactWorkflowLayer).toBeDefined();
    });
});
