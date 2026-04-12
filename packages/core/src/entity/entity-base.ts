/**
 * Entity Base and BaseEncoded: Classes API for entity schema and Effect Cluster integration.
 * Type-safe: Fields, Id, and record types are derived from the schema; handlers keep their request/response types.
 * Extensions define a class extending Base<Self>()(name, fields, options); Base provides
 * id + fields schema, CRUD handlers, entity, and layer.
 * @see docs/learnings/architecture.md
 */
import type { Entity } from '@effect/cluster/Entity';
import type { Request } from '@effect/cluster/Entity';
import type { ExtractTag } from '@effect/rpc/Rpc';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Schema from 'effect/Schema';
import { makeCrudEntity } from '../crud/crud-rpc.js';
import { makeCrudHandlersFromDatabase, type NotFound } from '../crud/crud-handlers.js';
import { Database } from '../database/database.js';
import { typeId, typeIdSchema } from '../schema-registry/typeid-schema.js';
import { ExtensionHookPubSub } from '../extensions/extension-hook-pubsub.js';
import { runTransforms } from '../transforms/transform-runner.js';
import { withSpanAndLog } from '../observability/helpers.js';

/** Prefix for TypeID (e.g. "contact"). Lowercase name. */
export type IdPrefix = string;

/**
 * Encoded shape for an entity record (storage/API wire).
 * Id is string (TypeID serialized). Extend in your entity's Encoded type for field encodings.
 */
export interface BaseEncoded<TableName extends string> {
    readonly id: `${TableName}_${string}` | string;
}

/**
 * Extracts the RPC union type from an entity class returned by Base.
 * Use in extensions to avoid repeating the protocol conditional type.
 *
 * @example
 * export class Contact extends Base<Contact>()("Contact", { ... }) {}
 * export type ContactRpc = EntityRpc<typeof Contact.entity>
 */
export type EntityRpc<E> = E extends {
    protocol: import('@effect/rpc/RpcGroup').RpcGroup<infer R extends import('@effect/rpc/Rpc').Any>;
}
    ? R
    : never;

/**
 * Options when defining an entity with Base.
 */
export interface BaseEntityOptions {
    /** Table name for Database get/set/delete/list. Defaults to name. */
    readonly tableName?: string;
    /** If true, includes delete RPC and handler. Default false. */
    readonly withDelete?: boolean;
    /**
     * RPC `create` payload (e.g. Drizzle `createInsertSchema` for the table).
     * Use when `fieldsSchema` is a full select shape from `createSelectSchema`.
     */
    readonly createPayloadSchema?: Schema.Schema<any, any, any>;
}

/**
 * Struct fields for the entity (no id). Id is added by Base.
 */
export type EntityFields = Schema.Struct.Fields;

/**
 * Returns a class that extends Schema.Class with id + fields, and provides static entity, layer,
 * idSchema, fieldsSchema, recordSchema, insertSchema, and CRUD handlers wired to Database.
 * Types are derived from the fields schema (FieldsType, FieldsEncoded, Id, RecordType); handlers
 * preserve their Request/Effect types.
 *
 * Usage:
 *   export class Contact extends Base<Contact>()("Contact", {
 *     fullname: Schema.String,
 *     dateOfBirth: Schema.DateFromString,
 *     email: encryptedString,
 *     phone: Schema.String
 *   }, { withDelete: true }) {}
 *   export const ContactEntity = Contact.entity
 *   export const ContactLayer = Contact.layer
 */
export function Base<Self>() {
    return <Name extends string, Fields extends Schema.Struct.Fields>(
        name: Name,
        fieldsSchema: Schema.Struct<Fields>,
        options?: BaseEntityOptions
    ) => {
        const tableName = options?.tableName ?? name;
        const prefix = name.toLowerCase() as string;
        const idSchema = typeIdSchema(prefix);
        const withDelete = options?.withDelete ?? false;

        type FieldsType = Schema.Struct.Type<Fields> & Record<string, unknown>;
        type FieldsEncoded = Schema.Struct.Encoded<Fields> & Record<string, unknown>;
        type FieldsContext = Schema.Struct.Context<Fields>;

        type Id = Schema.Schema.Type<typeof idSchema>;
        type IdEncoded = Schema.Schema.Encoded<typeof idSchema>;

        const allFields = { id: idSchema, ...fieldsSchema.fields } as unknown as {
            readonly id: typeof idSchema;
        } & Fields;
        const BaseSchema = Schema.Class<Self>(name)(allFields);

        type RecordType = { readonly id: Id } & FieldsType;
        type RecordEncoded = { readonly id: IdEncoded } & FieldsEncoded;
        type RpcUnion = import('@effect/rpc/Rpc').Any;

        const entity = makeCrudEntity<Name, Id, FieldsType>(name, {
            idSchema,
            fieldsSchema: fieldsSchema as unknown as Schema.Schema<FieldsType, any, any>,
            createPayloadSchema: options?.createPayloadSchema,
            withDelete,
        });

        const handlers = makeCrudHandlersFromDatabase<Id, FieldsType, RecordType, RecordEncoded, RpcUnion>({
            entityType: name,
            tableName,
            idSchema,
            fieldsSchema: fieldsSchema as unknown as Schema.Schema<FieldsType, any, any>,
            recordSchema: BaseSchema as unknown as Schema.Schema<
                RecordType,
                RecordEncoded,
                Schema.Struct.Context<Fields>
            >,
            genId: () => typeId(prefix) as Id,
            withDelete,
            _rpcUnion: undefined as unknown as RpcUnion,
        });

        const wrap =
            <Req, A, E, R>(
                method: string,
                h: (req: Req) => Effect.Effect<A, E, R>
            ): ((req: Req) => Effect.Effect<A, E, R>) =>
            (req: Req) =>
                Effect.gen(function* () {
                    const hooks = yield* ExtensionHookPubSub;
                    const withAddress = req as Req & { address: { entityId: string }; payload: unknown };
                    const scope = `entity:${name}:${method}`;
                    const entityId = withAddress.address?.entityId ?? 'unknown';
                    yield* hooks
                        .publish(`entity/${name}/beforeCall`, {
                            entityType: name,
                            method,
                            entityId,
                            request: withAddress,
                        })
                        .pipe(Effect.catchAll(() => Effect.void));

                    const pre = yield* runTransforms(scope, 'pre', withAddress.payload).pipe(
                        Effect.catchAll(() => Effect.succeed({ original: withAddress.payload, current: withAddress.payload, steps: [] }))
                    );
                    const transformedRequest = {
                        ...(withAddress as object),
                        payload: pre.current,
                    } as Req;

                    const base = yield* h(transformedRequest);

                    const post = yield* runTransforms(scope, 'post', base).pipe(
                        Effect.catchAll(() => Effect.succeed({ original: base, current: base, steps: [] }))
                    );

                    yield* hooks
                        .publish(`entity/${name}/afterCall`, {
                            entityType: name,
                            method,
                            entityId,
                            request: transformedRequest,
                            transformSteps: [...pre.steps, ...post.steps],
                        })
                        .pipe(Effect.catchAll(() => Effect.void));

                    return post.current as A;
                }).pipe(
                    withSpanAndLog('entity.wrap', { attributes: { entityType: name, method } })
                ) as Effect.Effect<A, E, R>;

        const wrappedHandlers = {
            create: wrap('create', handlers.create),
            get: wrap('get', handlers.get),
            update: wrap('update', handlers.update),
            list: wrap('list', handlers.list),
            ...(withDelete
                ? { delete: wrap('delete', handlers.delete) }
                : ({} as {
                      delete?: (
                          req: Request<ExtractTag<RpcUnion, 'delete'>>
                      ) => Effect.Effect<void, NotFound<Id>, Database>;
                  })),
        };

        const layer = entity.toLayer(Effect.succeed(wrappedHandlers as never));

        /** REST/OpenAPI create body: Drizzle insert shape when provided, not the full select schema. */
        const insertSchema = (
            options?.createPayloadSchema ?? fieldsSchema
        ) as unknown as Schema.Schema<FieldsType, FieldsEncoded, FieldsContext>;
        const partialSchema = Schema.partial(fieldsSchema as any) as unknown as Schema.Schema<
            Partial<FieldsType>,
            Partial<FieldsEncoded>,
            FieldsContext
        >;

        type StaticShape = {
            readonly name: Name;
            readonly tableName: string;
            readonly idSchema: typeof idSchema;
            readonly fieldsSchema: typeof fieldsSchema;
            readonly recordSchema: Schema.Schema<RecordType, RecordEncoded, Schema.Schema.Context<typeof BaseSchema>>;
            readonly insertSchema: Schema.Schema<FieldsType, FieldsEncoded, FieldsContext>;
            readonly partialSchema: Schema.Schema<Partial<FieldsType>, Partial<FieldsEncoded>, FieldsContext>;
            readonly withDelete: boolean;
            readonly entity: Entity<Name, RpcUnion>;
            readonly layer: Layer.Layer<never, never, Database>;
            readonly client: (typeof entity)['client'];
        };

        const statics: StaticShape = {
            name,
            tableName,
            idSchema,
            fieldsSchema,
            recordSchema: BaseSchema as unknown as Schema.Schema<
                RecordType,
                RecordEncoded,
                Schema.Schema.Context<typeof BaseSchema>
            >,
            insertSchema,
            partialSchema,
            withDelete,
            entity: entity as Entity<Name, RpcUnion>,
            layer: layer as unknown as Layer.Layer<never, never, Database>,
            client: entity.client,
        };

        const EntityClass = class extends (BaseSchema as any) {};
        for (const [k, v] of Object.entries(statics)) {
            if (k === 'name') {
                Object.defineProperty(EntityClass, 'name', { value: v, configurable: true });
            } else {
                (EntityClass as any)[k] = v;
            }
        }
        return EntityClass as typeof EntityClass & StaticShape;
    };
}
