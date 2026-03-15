import { describe, it, expect } from 'vitest';
import { testColumns, createTableFinal, pgTable, status, statusEnum, type AllBuilders } from '@eventiva/databases.pg';
import { typeid } from '@eventiva/databases.shared';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';

describe('table-builder', () => {
    const db: AllBuilders = {
        ...getPgColumnBuilders(),
        typeid,
    };

    describe('testColumns', () => {
        it('validates columns with id', () => {
            const columns = testColumns('test', db, (columnTypes) => ({
                id: columnTypes.typeid('id'),
                name: columnTypes.text('name'),
            }));
            expect(columns.id).toBeDefined();
            expect(columns.name).toBeDefined();
        });

        it('throws when id is missing', () => {
            expect(() => {
                testColumns('test', db, (columnTypes) => ({
                    name: columnTypes.text('name'),
                } as any));
            }).toThrow('must include an "id"');
        });

        it('throws when createdAt is present', () => {
            expect(() => {
                testColumns('test', db, (columnTypes) => ({
                    id: columnTypes.typeid('id'),
                    createdAt: columnTypes.timestamp('created_at'),
                } as any));
            }).toThrow('must not include a "createdAt"');
        });

        it('throws when updatedAt is present', () => {
            expect(() => {
                testColumns('test', db, (columnTypes) => ({
                    id: columnTypes.typeid('id'),
                    updatedAt: columnTypes.timestamp('updated_at'),
                } as any));
            }).toThrow('must not include a "updatedAt"');
        });

        it('throws when active is present', () => {
            expect(() => {
                testColumns('test', db, (columnTypes) => ({
                    id: columnTypes.typeid('id'),
                    active: columnTypes.text('active'),
                } as any));
            }).toThrow('must not include an "active"');
        });
    });

    describe('createTableFinal', () => {
        it('creates table with standard metadata fields', () => {
            const table = createTableFinal('test_table', (columnTypes) => ({
                id: columnTypes.typeid('id'),
                name: columnTypes.text('name'),
            }));
            expect(table).toBeDefined();
            expect(table.createdAt).toBeDefined();
            expect(table.updatedAt).toBeDefined();
            expect(table.deletedAt).toBeDefined();
            expect(table.active).toBeDefined();
        });

        it('creates table with extra config', () => {
            const table = createTableFinal(
                'test_table',
                (columnTypes) => ({
                    id: columnTypes.typeid('id'),
                }),
                (self) => []
            );
            expect(table).toBeDefined();
        });
    });

    describe('pgTable', () => {
        it('creates table without validation', () => {
            const table = pgTable('test_table', (columnTypes) => ({
                id: columnTypes.typeid('id'),
                name: columnTypes.text('name'),
            }));
            expect(table).toBeDefined();
        });
    });

    describe('status', () => {
        it('defines status constants', () => {
            expect(status.Inactive).toBe('inactive');
            expect(status.Active).toBe('active');
        });
    });

    describe('statusEnum', () => {
        it('defines status enum', () => {
            expect(statusEnum).toBeDefined();
        });
    });
});
