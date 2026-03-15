import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import { HelloWorldConfig, HelloWorldConfigLayer } from '@eventiva/extensions.hello-world';

describe('extensions/hello-world/config', () => {
    describe('HelloWorldConfigLayer', () => {
        it.effect('provides HelloWorldConfig service', () =>
            Effect.gen(function* () {
                const config = yield* Layer.build(HelloWorldConfigLayer);
                expect(config).toBeDefined();
                expect(config).toHaveProperty('greeting');
                expect(typeof config.greeting).toBe('string');
            })
        );

        it.effect('uses default greeting when HELLO_WORLD_GREETING not set', () =>
            Effect.gen(function* () {
                // Save original value
                const original = process.env.HELLO_WORLD_GREETING;
                delete process.env.HELLO_WORLD_GREETING;

                const config = yield* Layer.build(HelloWorldConfigLayer);
                expect(config.greeting).toBe('Hello World');

                // Restore original
                if (original !== undefined) {
                    process.env.HELLO_WORLD_GREETING = original;
                }
            })
        );

        it.effect('uses custom greeting from environment', () =>
            Effect.gen(function* () {
                const original = process.env.HELLO_WORLD_GREETING;
                process.env.HELLO_WORLD_GREETING = 'Custom Greeting';

                const config = yield* Layer.build(HelloWorldConfigLayer);
                expect(config.greeting).toBe('Custom Greeting');

                // Restore original
                if (original !== undefined) {
                    process.env.HELLO_WORLD_GREETING = original;
                } else {
                    delete process.env.HELLO_WORLD_GREETING;
                }
            })
        );
    });

    describe('HelloWorldConfig tag', () => {
        it.effect('HelloWorldConfig tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = HelloWorldConfig;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/extensions.hello-world/HelloWorldConfig');
            })
        );
    });
});
