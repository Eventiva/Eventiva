import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { ContactConfig, ContactConfigLayer } from '@eventiva/extensions.contact';

describe('ContactConfig', () => {
    describe('ContactConfigLayer', () => {
        itEffect('provides contact config with defaults', () =>
            Effect.gen(function* () {
                const config = yield* ContactConfig;
                expect(config).toBeDefined();
                expect(config.seedEnabled).toBeDefined();
                expect(config.seedFullname).toBeDefined();
                expect(config.seedDateOfBirth).toBeDefined();
                expect(config.seedEmail).toBeDefined();
                expect(config.seedPhone).toBeDefined();
            }).pipe(Effect.provide(ContactConfigLayer))
        );
    });
});
