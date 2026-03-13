/**
 * Contact extension: entity (class-based schema + cluster entity) and workflows.
 * Platform must provide Database layer when building the program.
 * Use CONTACT_ENTITY_ID when calling the Contact client.
 */
import type { ExtensionLayer } from '@eventiva/core';
import { ContactWorkflowLayer } from './workflow.js';

export { type Contact, type ContactRpc, type ContactRecord, CONTACT_ENTITY_ID } from './entity.js';

export const ContactLayer: ExtensionLayer = ContactWorkflowLayer as unknown as ExtensionLayer;

export { ContactConfig, ContactConfigLayer } from './config.js';
export { ContactWorkflowLayer };
