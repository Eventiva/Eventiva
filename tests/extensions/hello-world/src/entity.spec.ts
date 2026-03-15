import { describe, it } from 'vitest';
import { HelloWorld, type HelloWorld as HelloWorldType } from '@eventiva/extensions.hello-world';

describe('HelloWorld', () => {
    it('defines HelloWorld entity', () => {
        expect(HelloWorld).toBeDefined();
    });

    it('exports HelloWorld type', () => {
        // Type-only export
        type _Test = HelloWorldType;
        expect(true).toBe(true);
    });
});
