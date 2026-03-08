/**
 * Default platform: single entry point via createPlatformTemplate. Set databaseLayer,
 * extensions, and optional entityEndpoints; core handles all merging.
 * @see docs/learnings/architecture.md
 */
import type * as Layer from "effect/Layer";
import { type EntityEndpointDescriptor, type DefaultRunnerProfile } from "@eventiva/core";
/**
 * A platform template is a Layer that provides Sharding (and Runner) plus any
 * composed services. Built by createPlatformTemplate from database + extensions + optional HTTP endpoints.
 */
export type PlatformTemplate = Layer.Layer<never, never, unknown>;
/** Re-export so existing code can use the type from the platform package. */
export type { DefaultRunnerProfile };
/**
 * Entity endpoints: each gets POST /api/rpc/:pathPrefix. Built with core's makeEntityEndpointDescriptor.
 */
export declare const defaultEntityEndpoints: ReadonlyArray<EntityEndpointDescriptor>;
/**
 * Default platform Layer. Customise by changing databaseLayer or extensions above, then re-run.
 */
export declare const defaultPlatformTemplate: PlatformTemplate;
//# sourceMappingURL=index.d.ts.map