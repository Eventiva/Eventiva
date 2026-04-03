/**
 * PostgreSQL platform template (no process lifecycle). Imported by `index.ts` and tests.
 */
import './register-database-backends.js';
import {
    CreatePlatformTemplateOptions,
    createPlatformTemplateTwoPhase,
} from '@eventiva/core';
import { extensions } from './extensions.js';
import { activateDatabaseStackFromEnv } from '@eventiva/databases.shared';

const { databaseLayer, schemaFinalizerLayer, runtimeSchemaDDLLayer } = activateDatabaseStackFromEnv();

const platformOptions: CreatePlatformTemplateOptions = {
    databaseLayer,
    extensions,
    schemaFinalizerLayer,
    runtimeSchemaDDLLayer,
    entityEndpoints: [],
    endpointsPort: Number(process.env.EVENTIVA_HTTP_PORT ?? 3000),
} as const;

export const platform = createPlatformTemplateTwoPhase(platformOptions);
