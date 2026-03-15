import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    ExtensionHookPubSub,
    ExtensionHookPubSubLive,
    extensionHookTopic,
    CORE_LOADED_TOPIC,
    EXTENSIONS_LOADED_TOPIC,
    PROCESS_RUNTIME_READY_TOPIC,
    CORE_SHUTDOWN_TOPIC,
    type HookPhase,
    type ExtensionCallContext,
    type ExtensionRegisterContext,
} from '@eventiva/core';

describe('extensions/extension-hook-pubsub', () => {
    describe('extensionHookTopic', () => {
        it.effect('builds topic string from extensionId and phase', () =>
            Effect.gen(function* () {
                const topic = extensionHookTopic('hello-world', 'onLoad');
                expect(topic).toBe('extension/hello-world/onLoad');
            })
        );

        it.effect('builds different topics for different extensions', () =>
            Effect.gen(function* () {
                const topic1 = extensionHookTopic('hello-world', 'onLoad');
                const topic2 = extensionHookTopic('contact', 'onLoad');
                expect(topic1).toBe('extension/hello-world/onLoad');
                expect(topic2).toBe('extension/contact/onLoad');
            })
        );

        it.effect('builds different topics for different phases', () =>
            Effect.gen(function* () {
                const topic1 = extensionHookTopic('hello-world', 'onLoad');
                const topic2 = extensionHookTopic('hello-world', 'beforeCall');
                expect(topic1).toBe('extension/hello-world/onLoad');
                expect(topic2).toBe('extension/hello-world/beforeCall');
            })
        );
    });

    describe('topic constants', () => {
        it.effect('defines CORE_LOADED_TOPIC', () =>
            Effect.gen(function* () {
                expect(CORE_LOADED_TOPIC).toBe('core/loaded');
            })
        );

        it.effect('defines EXTENSIONS_LOADED_TOPIC', () =>
            Effect.gen(function* () {
                expect(EXTENSIONS_LOADED_TOPIC).toBe('core/extensions-loaded');
            })
        );

        it.effect('defines PROCESS_RUNTIME_READY_TOPIC', () =>
            Effect.gen(function* () {
                expect(PROCESS_RUNTIME_READY_TOPIC).toBe('core/process-runtime-ready');
            })
        );

        it.effect('defines CORE_SHUTDOWN_TOPIC', () =>
            Effect.gen(function* () {
                expect(CORE_SHUTDOWN_TOPIC).toBe('core/shutdown');
            })
        );
    });

    describe('ExtensionHookPubSubLive', () => {
        it.effect('provides ExtensionHookPubSub service', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);
                expect(pubsub).toBeDefined();
                expect(pubsub.listenTo).toBeDefined();
                expect(pubsub.publish).toBeDefined();
                expect(pubsub.getTopics).toBeDefined();
                expect(pubsub.getTopicsForPhase).toBeDefined();
            })
        );

        it.effect('listenTo registers a listener', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);
                let listenerCalled = false;

                yield* pubsub.listenTo('test-topic', () => {
                    listenerCalled = true;
                    return Effect.void;
                });

                yield* pubsub.publish('test-topic', {});
                expect(listenerCalled).toBe(true);
            })
        );

        it.effect('publish invokes all listeners', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);
                let callCount = 0;

                yield* pubsub.listenTo('test-topic', () => {
                    callCount++;
                    return Effect.void;
                });
                yield* pubsub.listenTo('test-topic', () => {
                    callCount++;
                    return Effect.void;
                });

                yield* pubsub.publish('test-topic', {});

                expect(callCount).toBe(2);
            })
        );

        it.effect('publish does nothing when no listeners', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);
                const result = yield* Effect.exit(pubsub.publish('no-listeners', {}));
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );

        it.effect('getTopics returns all topics with listeners', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);

                yield* pubsub.listenTo('topic-1', () => Effect.void);
                yield* pubsub.listenTo('topic-2', () => Effect.void);

                const topics = yield* pubsub.getTopics();

                expect(topics).toContain('topic-1');
                expect(topics).toContain('topic-2');
            })
        );

        it.effect('getTopicsForPhase filters by phase suffix', () =>
            Effect.gen(function* () {
                const pubsub = yield* Layer.build(ExtensionHookPubSubLive);

                yield* pubsub.listenTo('extension/ext1/onLoad', () => Effect.void);
                yield* pubsub.listenTo('extension/ext2/onLoad', () => Effect.void);
                yield* pubsub.listenTo('extension/ext1/beforeCall', () => Effect.void);

                const onLoadTopics = yield* pubsub.getTopicsForPhase('onLoad');

                expect(onLoadTopics.length).toBe(2);
                expect(onLoadTopics).toContain('extension/ext1/onLoad');
                expect(onLoadTopics).toContain('extension/ext2/onLoad');
            })
        );
    });

    describe('ExtensionHookPubSub tag', () => {
        it.effect('ExtensionHookPubSub tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = ExtensionHookPubSub;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/ExtensionHookPubSub');
            })
        );
    });
});
