import { describe, it } from 'vitest';
import { ContactEntity, ContactLayer, ContactConfig, ContactConfigLayer, ContactWorkflowLayer, CONTACT_ENTITY_ID, type Contact, type ContactRpc, type ContactRecord } from '@eventiva/extensions.contact';

describe('extensions/contact/index', () => {
    it('exports ContactEntity', () => {
        expect(ContactEntity).toBeDefined();
    });

    it('exports ContactLayer', () => {
        expect(ContactLayer).toBeDefined();
    });

    it('exports ContactConfig', () => {
        expect(ContactConfig).toBeDefined();
    });

    it('exports ContactConfigLayer', () => {
        expect(ContactConfigLayer).toBeDefined();
    });

    it('exports ContactWorkflowLayer', () => {
        expect(ContactWorkflowLayer).toBeDefined();
    });

    it('exports CONTACT_ENTITY_ID', () => {
        expect(CONTACT_ENTITY_ID).toBe('store');
    });

    it('exports Contact type', () => {
        // Type-only export
        type _Test = Contact;
        expect(true).toBe(true);
    });

    it('exports ContactRpc type', () => {
        // Type-only export
        type _Test = ContactRpc;
        expect(true).toBe(true);
    });

    it('exports ContactRecord type', () => {
        // Type-only export
        type _Test = ContactRecord;
        expect(true).toBe(true);
    });
});
