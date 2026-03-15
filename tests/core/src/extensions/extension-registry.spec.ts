import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    mergeEntityLayers,
    mergeConfigLayers,
    profileToLayer,
    registerProfile,
    getProfile,
    type ExtensionLayer,
    type ExtensionConfigLayer,
    type ExtensionRegistration,
    type RunnerProfile,
} from '@eventiva/core';

describe('extensions/extension-registry', () => {
    describe('mergeEntityLayers', () => {
        it.effect('returns empty layer for empty array', () =>
            Effect.gen(function* () {
                const merged = mergeEntityLayers([]);
                expect(merged).toBeDefined();
                const result = yield* Effect.exit(Layer.build(merged));
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );

        it.effect('returns single layer for single element', () =>
            Effect.gen(function* () {
                const layer = Layer.empty;
                const merged = mergeEntityLayers([layer]);
                expect(merged).toBeDefined();
            })
        );

        it.effect('merges multiple layers', () =>
            Effect.gen(function* () {
                const layer1 = Layer.empty;
                const layer2 = Layer.empty;
                const merged = mergeEntityLayers([layer1, layer2]);
                expect(merged).toBeDefined();
            })
        );
    });

    describe('mergeConfigLayers', () => {
        it.effect('returns empty layer for empty array', () =>
            Effect.gen(function* () {
                const merged = mergeConfigLayers([]);
                expect(merged).toBeDefined();
                const result = yield* Effect.exit(Layer.build(merged));
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );

        it.effect('returns single layer for single element', () =>
            Effect.gen(function* () {
                const layer = Layer.empty;
                const merged = mergeConfigLayers([layer]);
                expect(merged).toBeDefined();
            })
        );

        it.effect('merges multiple config layers', () =>
            Effect.gen(function* () {
                const layer1 = Layer.empty;
                const layer2 = Layer.empty;
                const merged = mergeConfigLayers([layer1, layer2]);
                expect(merged).toBeDefined();
            })
        );
    });

    describe('profileToLayer', () => {
        it.effect('converts profile to layer', () =>
            Effect.gen(function* () {
                const profile: RunnerProfile = {
                    name: 'test-profile',
                    entityLayers: [Layer.empty],
                };

                const layer = profileToLayer(profile);
                expect(layer).toBeDefined();
            })
        );
    });

    describe('registerProfile and getProfile', () => {
        it.effect('registers and retrieves profile', () =>
            Effect.gen(function* () {
                const profile: RunnerProfile = {
                    name: 'test-profile',
                    entityLayers: [Layer.empty],
                };

                registerProfile(profile);
                const retrieved = getProfile('test-profile');

                expect(retrieved).toBeDefined();
                expect(retrieved?.name).toBe('test-profile');
            })
        );

        it.effect('returns undefined for non-existent profile', () =>
            Effect.gen(function* () {
                const profile = getProfile('non-existent');
                expect(profile).toBeUndefined();
            })
        );

        it.effect('can register multiple profiles', () =>
            Effect.gen(function* () {
                const profile1: RunnerProfile = {
                    name: 'profile-1',
                    entityLayers: [Layer.empty],
                };
                const profile2: RunnerProfile = {
                    name: 'profile-2',
                    entityLayers: [Layer.empty],
                };

                registerProfile(profile1);
                registerProfile(profile2);

                expect(getProfile('profile-1')?.name).toBe('profile-1');
                expect(getProfile('profile-2')?.name).toBe('profile-2');
            })
        );
    });
});
