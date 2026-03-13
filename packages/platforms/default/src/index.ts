/* eslint-disable @nx/enforce-module-boundaries */
/**
 * Default platform: single entry point via createPlatformTemplateTwoPhase + runMainTwoPhase.
 * Set databaseLayer, extensions, and optional entityEndpoints; core handles all merging.
 * Two-phase ensures entity endpoints are built after runCoreStartup so Contact and other
 * EntityRegistry entities appear in /api/rpc/:pathPrefix and Swagger.
 * @see docs/learnings/architecture.md
 */
import * as Layer from 'effect/Layer';
import {
    createPlatformTemplate,
    createPlatformTemplateTwoPhase,
    DatabaseLiveInMemory,
    type DefaultRunnerProfile,
    type ExtensionRegistration,
} from '@eventiva/core';
import { SchemaFinalizerPg } from '@eventiva/databases.pg';
import { HelloWorldConfigLayer, HelloWorldLayer } from '@eventiva/extensions.hello-world';
import { ContactConfigLayer, ContactLayer } from '@eventiva/extensions.contact';

/**
 * A platform template is a Layer that provides Sharding (and Runner) plus any
 * composed services. Built by createPlatformTemplate from database + extensions + optional HTTP endpoints.
 */
export type PlatformTemplate = Layer.Layer<never, any, unknown>;

/**
 * Database implementation. Use DatabaseLiveInMemory for dev/tests;
 * replace with pgDatabaseLayer from @eventiva/extensions.database-pg for PostgreSQL.
 * replace with mySQLDatabaseLayer from @eventiva/extensions.database-mysql for MySQL.
 */
const databaseLayer = DatabaseLiveInMemory;

/**
 * Extensions to load (id used for schema markReady). Core adds the startup banner automatically.
 */
const extensions: ReadonlyArray<ExtensionRegistration> = [
    { id: 'hello-world', layer: HelloWorldLayer, configLayer: HelloWorldConfigLayer },
    { id: 'contact', layer: ContactLayer, configLayer: ContactConfigLayer },
];

/** Re-export so existing code can use the type from the platform package. */
export type { DefaultRunnerProfile };

const platformOptions = {
    databaseLayer,
    extensions,
    schemaFinalizerLayer: SchemaFinalizerPg,
    entityEndpoints: [], // Entities are discovered from EntityRegistry (populated by runCoreStartup); only extensions that create an entity appear in /api/docs
    endpointsPort: 3000,
} as const;

/**
 * Default platform Layer (legacy one-phase). Prefer defaultPlatformTemplateTwoPhase + runMainTwoPhase
 * so Contact and other dynamic entities are in the entity route map.
 */
export const defaultPlatformTemplate: PlatformTemplate = createPlatformTemplate(platformOptions);

/**
 * Default platform two-phase template. Use with runMainTwoPhase() so entity endpoints
 * are built after EntityRegistry is populated (runCoreStartup).
 */
export const defaultPlatformTemplateTwoPhase = createPlatformTemplateTwoPhase(platformOptions);