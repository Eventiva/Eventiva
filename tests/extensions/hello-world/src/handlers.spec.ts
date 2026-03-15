import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { sayHelloHandler } from '@eventiva/extensions.hello-world';
import { HelloWorldConfigLive } from '@eventiva/extensions.hello-world';
import { Request } from '@eventiva/core';

describe('sayHelloHandler', () => {
    itEffect('returns greeting from config', () =>
        Effect.gen(function* () {
            const envelope: Request<any> = {
                address: { entityId: 'test-entity' },
                payload: {},
            } as any;
            const result = yield* sayHelloHandler(envelope);
            expect(result).toBeDefined();
        }).pipe(Effect.provide(HelloWorldConfigLive))
    );
});
