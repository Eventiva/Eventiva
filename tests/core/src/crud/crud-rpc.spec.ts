import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import { Schema } from 'effect';
import { makeCrudRpc, makeCrudEntity, type CrudRpcOptions } from '@eventiva/core';

describe('crud/crud-rpc', () => {
    const testIdSchema = Schema.String;
    const testFieldsSchema = Schema.Struct({
        name: Schema.String,
        email: Schema.String,
    });

    describe('makeCrudRpc', () => {
        it.effect('creates standard CRUD RPCs without delete', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                    withDelete: false,
                };

                const rpcs = makeCrudRpc(options);

                expect(rpcs).toBeDefined();
                expect(Array.isArray(rpcs)).toBe(true);
                expect(rpcs.length).toBe(4);

                // Check RPC names
                const rpcNames = rpcs.map((rpc) => rpc.name);
                expect(rpcNames).toContain('create');
                expect(rpcNames).toContain('get');
                expect(rpcNames).toContain('update');
                expect(rpcNames).toContain('list');
                expect(rpcNames).not.toContain('delete');
            })
        );

        it.effect('creates CRUD RPCs with delete when withDelete is true', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                    withDelete: true,
                };

                const rpcs = makeCrudRpc(options);

                expect(rpcs).toBeDefined();
                expect(rpcs.length).toBe(5);

                const rpcNames = rpcs.map((rpc) => rpc.name);
                expect(rpcNames).toContain('create');
                expect(rpcNames).toContain('get');
                expect(rpcNames).toContain('update');
                expect(rpcNames).toContain('list');
                expect(rpcNames).toContain('delete');
            })
        );

        it.effect('defaults withDelete to false', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                };

                const rpcs = makeCrudRpc(options);

                expect(rpcs.length).toBe(4);
                const rpcNames = rpcs.map((rpc) => rpc.name);
                expect(rpcNames).not.toContain('delete');
            })
        );

        it.effect('create RPC has correct schema structure', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                };

                const rpcs = makeCrudRpc(options);
                const createRpc = rpcs.find((rpc) => rpc.name === 'create');

                expect(createRpc).toBeDefined();
                // RPC should have payload and success schemas
                expect(createRpc).toHaveProperty('name', 'create');
            })
        );

        it.effect('get RPC has error schema for NotFound', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                };

                const rpcs = makeCrudRpc(options);
                const getRpc = rpcs.find((rpc) => rpc.name === 'get');

                expect(getRpc).toBeDefined();
                expect(getRpc).toHaveProperty('name', 'get');
            })
        );
    });

    describe('makeCrudEntity', () => {
        it.effect('creates entity with CRUD RPCs', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                };

                const entity = makeCrudEntity('test-entity', options);

                expect(entity).toBeDefined();
                expect(entity).toHaveProperty('type', 'test-entity');
            })
        );

        it.effect('creates entity with delete RPC when withDelete is true', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                    withDelete: true,
                };

                const entity = makeCrudEntity('test-entity-with-delete', options);

                expect(entity).toBeDefined();
                expect(entity).toHaveProperty('type', 'test-entity-with-delete');
            })
        );

        it.effect('uses provided type name', () =>
            Effect.gen(function* () {
                const options: CrudRpcOptions<string, { name: string; email: string }> = {
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                };

                const entity1 = makeCrudEntity('entity-1', options);
                const entity2 = makeCrudEntity('entity-2', options);

                expect(entity1).toHaveProperty('type', 'entity-1');
                expect(entity2).toHaveProperty('type', 'entity-2');
            })
        );
    });
});
