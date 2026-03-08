import * as Layer from "effect/Layer";
import type * as Resource from "@effect/opentelemetry/Resource";
/**
 * ObservabilityLive: single Layer providing Effect Logger, Tracer, Metrics, and Resource (OTEL).
 * Use as the base for runtime and all entity handlers. Every function must use span + log + metric where appropriate.
 */
export declare const ObservabilityLive: Layer.Layer<Resource.Resource>;
//# sourceMappingURL=layer.d.ts.map