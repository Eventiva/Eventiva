/**
 * Contact extension: entity (class-based schema + cluster entity) and workflows.
 * Platform must provide Database layer when building the program.
 * Use CONTACT_ENTITY_ID when calling the Contact client.
 */
import * as Layer from 'effect/Layer';
import type { ExtensionLayer } from '@eventiva/core';
import { ContactEntity } from './entity.js';
import { ContactWorkflowLayer } from './workflow.js';

export { ContactEntity, type Contact, type ContactRpc, type ContactRecord, CONTACT_ENTITY_ID } from './entity.js';

/** Contact entity layer (CRUD handlers) + workflow layer. Merge so the cluster has Contact registered. */
export const ContactLayer: ExtensionLayer = Layer.mergeAll(
    ContactWorkflowLayer,
    ContactEntity.layer
) as unknown as ExtensionLayer;

export { ContactConfig, ContactConfigLayer } from './config.js';
export { ContactWorkflowLayer };
