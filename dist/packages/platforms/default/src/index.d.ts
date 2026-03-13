/**
 * Default platform: single entry point via createPlatformTemplateTwoPhase + runMainTwoPhase.
 * Set databaseLayer, extensions, and optional entityEndpoints; core handles all merging.
 * Two-phase ensures entity endpoints are built after runCoreStartup so Contact and other
 * EntityRegistry entities appear in /api/rpc/:pathPrefix and Swagger.
 * @see docs/learnings/architecture.md
 */
import * as Layer from 'effect/Layer';
import { type DefaultRunnerProfile } from '@eventiva/core';
/**
 * A platform template is a Layer that provides Sharding (and Runner) plus any
 * composed services. Built by createPlatformTemplate from database + extensions + optional HTTP endpoints.
 */
export type PlatformTemplate = Layer.Layer<never, any, unknown>;
/** Re-export so existing code can use the type from the platform package. */
export type { DefaultRunnerProfile };
/**
 * Default platform Layer (legacy one-phase). Prefer defaultPlatformTemplateTwoPhase + runMainTwoPhase
 * so Contact and other dynamic entities are in the entity route map.
 */
export declare const defaultPlatformTemplate: PlatformTemplate;
/**
 * Default platform two-phase template. Use with runMainTwoPhase() so entity endpoints
 * are built after EntityRegistry is populated (runCoreStartup).
 */
export declare const defaultPlatformTemplateTwoPhase: import("@eventiva/core").PlatformTemplateTwoPhase;
//# sourceMappingURL=index.d.ts.map