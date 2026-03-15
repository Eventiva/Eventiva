import { describe, it } from 'vitest';
import { createTable, pgTable, testColumns, SchemaFinalizerPg, typeid, type AllBuilders } from '@eventiva/databases.pg';

describe('databases/pg/index', () => {
    it('exports createTable', () => {
        expect(createTable).toBeDefined();
    });

    it('exports pgTable', () => {
        expect(pgTable).toBeDefined();
    });

    it('exports testColumns', () => {
        expect(testColumns).toBeDefined();
    });

    it('exports SchemaFinalizerPg', () => {
        expect(SchemaFinalizerPg).toBeDefined();
    });

    it('exports typeid', () => {
        expect(typeid).toBeDefined();
    });

    it('exports AllBuilders type', () => {
        // Type-only export
        type _Test = AllBuilders;
        expect(true).toBe(true);
    });
});
