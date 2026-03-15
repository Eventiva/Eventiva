import { describe, it } from 'vitest';
import { ContactEntity, CONTACT_ENTITY_ID, contactColumns, type Contact, type ContactRpc, type ContactRecord } from '@eventiva/extensions.contact';

describe('ContactEntity', () => {
    it('defines contactColumns', () => {
        expect(contactColumns).toBeDefined();
        expect(contactColumns.id).toBeDefined();
        expect(contactColumns.fullname).toBeDefined();
        expect(contactColumns.dateOfBirth).toBeDefined();
        expect(contactColumns.email).toBeDefined();
        expect(contactColumns.phone).toBeDefined();
    });

    it('defines ContactEntity class', () => {
        expect(ContactEntity).toBeDefined();
    });

    it('defines CONTACT_ENTITY_ID', () => {
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
