import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import { DuplicateColumnError } from '@eventiva/core';

describe('schema/duplicate-column-error', () => {
    describe('DuplicateColumnError', () => {
        it.effect('creates error with table name, column name, and extension ID', () =>
            Effect.gen(function* () {
                const error = DuplicateColumnError('test_table', 'test_column', 'test-extension');

                expect(error).toBeDefined();
                expect(error._tag).toBe('DuplicateColumnError');
                expect(error.tableName).toBe('test_table');
                expect(error.columnName).toBe('test_column');
                expect(error.extensionId).toBe('test-extension');
            })
        );

        it.effect('creates errors for different tables', () =>
            Effect.gen(function* () {
                const error1 = DuplicateColumnError('table1', 'col1', 'ext1');
                const error2 = DuplicateColumnError('table2', 'col2', 'ext2');

                expect(error1.tableName).toBe('table1');
                expect(error2.tableName).toBe('table2');
            })
        );
    });
});
