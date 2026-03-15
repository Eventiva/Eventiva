import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    makeTopicListenerLayer,
    makeExtensionWorkflowLayer,
    withExtensionHooksWith,
    ExtensionHookPubSub,
    ExtensionHookPubSubLive,
    CORE_LOADED_TOPIC,
} from '@eventiva/core';

describe('extensions/extension-hooks', () => {
    describe('makeTopicListenerLayer', () => {
        it.effect('creates layer that registers listener', () =>
            Effect.gen(function* () {
                let listenerCalled = false;
                const layer = makeTopicListenerLayer('test-topic', () => {
                    listenerCalled = true;
                    return Effect.void;
                });

                yield* Layer.build(Layer.mergeAll(ExtensionHookPubSubLive, layer));
                const pubsub = yield* ExtensionHookPubSub;
                yield* pubsub.publish('test-topic', {});

                expect(listenerCalled).toBe(true);
            })
        );
    });

    describe('makeExtensionWorkflowLayer', () => {
        it.effect('creates workflow and listener layer', () =>
            Effect.gen(function* () {
                const layer = makeExtensionWorkflowLayer('test-ext', 'onLoad', CORE_LOADED_TOPIC);
                expect(layer).toBeDefined();
            })
        );

        it.effect('creates layer with custom effect', () =>
            Effect.gen(function* () {
                const customEffect = Effect.log('Custom effect');
                const layer = makeExtensionWorkflowLayer('test-ext', 'onLoad', CORE_LOADED_TOPIC, customEffect);
                expect(layer).toBeDefined();
            })
        );
    });

    describe('withExtensionHooksWith', () => {
        it.effect('wraps handler with beforeCall and afterCall hooks', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);
                let beforeCallCalled = false;
                let afterCallCalled = false;

                yield* pubsub.listenTo('extension/test-ext/beforeCall', () => {
                    beforeCallCalled = true;
                    return Effect.void;
                });
                yield* pubsub.listenTo('extension/test-ext/afterCall', () => {
                    afterCallCalled = true;
                    return Effect.void;
                });

                const handler = (req: { payload: string }) => Effect.succeed(req.payload.length);
                const wrapped = withExtensionHooksWith(pubsub, 'test-ext', 'TestEntity', 'testMethod', handler);

                const result = yield* wrapped({
                    address: { entityId: 'test-id' },
                    payload: 'test',
                });

                expect(result).toBe(4);
                expect(beforeCallCalled).toBe(true);
                expect(afterCallCalled).toBe(true);
            })
        );

        it.effect('returns handler result even if hooks fail', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);

                yield* pubsub.listenTo('extension/test-ext/beforeCall', () => Effect.fail('hook error'));

                const handler = (req: { payload: string }) => Effect.succeed(req.payload.length);
                const wrapped = withExtensionHooksWith(pubsub, 'test-ext', 'TestEntity', 'testMethod', handler);

                const result = yield* wrapped({
                    address: { entityId: 'test-id' },
                    payload: 'test',
                });

                expect(result).toBe(4);
            })
        );
    });
});
