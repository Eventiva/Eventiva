import { describe, it } from 'vitest';
import { HelloWorld, HelloWorldLayer, HelloWorldConfig, HelloWorldConfigLayer, sayHelloHandler, HelloWorldWorkflowAndLoadLayer } from '@eventiva/extensions.hello-world';

describe('extensions/hello-world/index', () => {
    it('exports HelloWorld', () => {
        expect(HelloWorld).toBeDefined();
    });

    it('exports HelloWorldLayer', () => {
        expect(HelloWorldLayer).toBeDefined();
    });

    it('exports HelloWorldConfig', () => {
        expect(HelloWorldConfig).toBeDefined();
    });

    it('exports HelloWorldConfigLayer', () => {
        expect(HelloWorldConfigLayer).toBeDefined();
    });

    it('exports sayHelloHandler', () => {
        expect(sayHelloHandler).toBeDefined();
    });

    it('exports HelloWorldWorkflowAndLoadLayer', () => {
        expect(HelloWorldWorkflowAndLoadLayer).toBeDefined();
    });
});
