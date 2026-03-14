import type { ExtensionLayer } from '@eventiva/core';
import { ContactWorkflowLayer } from './workflow.js';
export { ContactEntity, type Contact, type ContactRpc, type ContactRecord, CONTACT_ENTITY_ID } from './entity.js';
/** Contact entity layer (CRUD handlers) + workflow layer. Merge so the cluster has Contact registered. */
export declare const ContactLayer: ExtensionLayer;
export { ContactConfig, ContactConfigLayer } from './config.js';
export { ContactWorkflowLayer };
//# sourceMappingURL=index.d.ts.map