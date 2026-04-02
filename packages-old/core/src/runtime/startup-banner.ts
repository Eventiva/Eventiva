/**
 * Startup banner: logs Eventiva wordart, By Resnovas wordart, and copyright via `Effect.logInfo`
 * (same tee as other logs: console + EVENTIVA_LOG_FILE).
 *
 * Word art uses **one string per `logInfo`** plus `Effect.annotateLogs` for metadata. Passing
 * `logInfo(string, object)` makes the message a tuple, so `Inspectable.toStringUnknown` serializes
 * it as `[...]` and multiline ASCII breaks; real newlines are preserved only for a single string.
 *
 * Listens on extension/hello-world/onLoad and extension/hello-world/afterCall using **in-process**
 * pubsub only. Do **not** use `Workflow.execute` here when the platform uses ClusterWorkflowEngine:
 * cluster message persistence calls `JSON.stringify` on envelopes and throws on `BigInt`, which
 * caused "Defect in entity, restarting" and hid banner output.
 *
 * Wired in `createPlatformTemplate` (hooks stack).
 */
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { withSpanAndLog } from '../observability/helpers.js';
import {
    ExtensionHookPubSub,
    extensionHookTopic,
    type ExtensionCallContext,
} from '../extensions/extension-hook-pubsub.js';

const EVENTIVA_WORDART = `
 ███████╗██╗   ██╗███████╗███╗   ██╗████████╗██╗██╗   ██╗ █████╗ 
 ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██║██║   ██║██╔══██╗
 █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║██║   ██║███████║
 ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║╚██╗ ██╔╝██╔══██║
 ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ██║ ╚████╔╝ ██║  ██║
 ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═══╝  ╚═╝  ╚═╝
`.trimEnd();

const BY_RESNOVAS_WORDART = `
 ██████╗ ██╗   ██╗    ██████╗ ███████╗███████╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ███████╗
 ██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔════╝██╔════╝████╗  ██║██╔═══██╗██║   ██║██╔══██╗██╔════╝
 ██████╔╝ ╚████╔╝     ██████╔╝█████╗  ███████╗██╔██╗ ██║██║   ██║██║   ██║███████║███████╗
 ██╔══██╗  ╚██╔╝      ██╔══██╗██╔══╝  ╚════██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║╚════██║
 ██████╔╝   ██║       ██║  ██║███████╗███████║██║ ╚████║ ██████╗  ╚████╔╝ ██║  ██║███████║
 ╚═════╝    ╚═╝       ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝   ╚══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝
`.trimEnd();

const COPYRIGHT_STATEMENT = '© 2026 Eventiva. All rights reserved.';

const HELLO_WORLD = 'hello-world';

function logBannerWordartAndCopyright(): Effect.Effect<void> {
    return Effect.gen(function* () {
        // One string per log — `Effect.logInfo(a, b)` turns the message into a tuple and
        // `Inspectable.toStringUnknown` flattens newlines. Metadata goes on `annotateLogs`.
        yield* Effect.logInfo(EVENTIVA_WORDART).pipe(
            Effect.annotateLogs({ service: 'eventiva-core', banner: 'eventiva-wordart' })
        );
        yield* Effect.logInfo(BY_RESNOVAS_WORDART).pipe(
            Effect.annotateLogs({ service: 'eventiva-core', banner: 'by-resnovas-wordart' })
        );
        yield* Effect.logInfo(COPYRIGHT_STATEMENT).pipe(
            Effect.annotateLogs({ service: 'eventiva-core', banner: 'copyright' })
        );
    });
}

function logBannerOnExtensionHelloWorldOnLoad(): Effect.Effect<void> {
    return Effect.gen(function* () {
        yield* Effect.logInfo('Eventiva startup banner (core)', { service: 'eventiva-core' });
        yield* logBannerWordartAndCopyright();
    });
}

/**
 * Layer that registers startup banner listeners on the in-process hook PubSub.
 * Requires ExtensionHookPubSub. Does not register cluster workflows.
 */
export const StartupBannerLayer = Layer.effectDiscard(
    Effect.gen(function* () {
        yield* Effect.logInfo('Registering startup banner listeners');
        const pubsub = yield* ExtensionHookPubSub;
        yield* pubsub.listenTo(extensionHookTopic(HELLO_WORLD, 'onLoad'), (_payload, messageId) =>
            logBannerOnExtensionHelloWorldOnLoad().pipe(
                withSpanAndLog('startupBannerOnLoad', { attributes: { messageId: messageId ?? 'none' } }),
                Effect.asVoid
            )
        );
        yield* pubsub.listenTo(extensionHookTopic(HELLO_WORLD, 'afterCall'), (payload, messageId) =>
            Effect.gen(function* () {
                const ctx = payload as ExtensionCallContext | undefined;
                if (ctx?.entityType === 'HelloWorld' && ctx?.method === 'sayHello') {
                    yield* Effect.logInfo('Printing startup banner for HelloWorld');
                    yield* logBannerWordartAndCopyright();
                }
            }).pipe(
                withSpanAndLog('startupBannerAfterCall', { attributes: { messageId: messageId ?? 'none' } }),
                Effect.asVoid
            )
        );
    }).pipe(withSpanAndLog('registerStartupBannerListeners'))
);
