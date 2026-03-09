/**
 * HelloWorld handlers: sayHello with full observability (span, log, metric) and extension lifecycle hooks.
 * sayHelloHandler is used with withExtensionHooksWith in the layer so ExtensionHooks is captured at build time.
 */
import * as Effect from "effect/Effect";
import { type Request } from "@eventiva/core";
/** Raw handler for sayHello; wrapped with extension hooks in the layer via withExtensionHooksWith. */
export declare function sayHelloHandler(envelope: Request<any>): Effect.Effect<string, never, never>;
//# sourceMappingURL=handlers.d.ts.map