/**
 * Entity Base and BaseEncoded: Classes API for entity schema and Effect Cluster integration.
 * Type-safe: Fields, Id, and record types are derived from the schema; handlers keep their request/response types.
 * Extensions define a class extending Base<Self>()(name, fields, options); Base provides
 * id + fields schema, CRUD handlers, entity, and layer.
 * @see docs/learnings/architecture.md
 */
import type { Entity } from "@effect/cluster/Entity";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import { Database } from "../database/database.js";
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
    protocol: import("@effect/rpc/RpcGroup").RpcGroup<infer R extends import("@effect/rpc/Rpc").Any>;
} ? R : never;
/**
 * Options when defining an entity with Base.
 */
export interface BaseEntityOptions {
    /** Table name for Database get/set/delete/list. Defaults to name. */
    readonly tableName?: string;
    /** If true, includes delete RPC and handler. Default false. */
    readonly withDelete?: boolean;
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
export declare function Base<Self>(): <Name extends string, Fields extends EntityFields>(name: Name, fields: Fields, options?: BaseEntityOptions) => {
    new (): {
        [x: string]: any;
    };
    [x: string]: any;
} & {
    readonly name: Name;
    readonly tableName: string;
    readonly idSchema: Schema.Schema<`${string}_${string}`, string, never>;
    readonly fieldsSchema: Schema.Struct<Fields>;
    readonly recordSchema: Schema.Schema<{
        readonly id: `${string}_${string}`;
    } & (Schema.Struct.Type<Fields> extends infer T ? { [K in keyof T]: T[K]; } : never), {
        readonly id: string;
    } & (Schema.Struct.Encoded<Fields> extends infer T_1 ? { [K_1 in keyof T_1]: T_1[K_1]; } : never), Schema.Schema.Context<[Self] extends [never] ? "Missing `Self` generic - use `class Self extends Class<Self>()({ ... })`" : Schema.Class<Self, {
        readonly id: Schema.Schema<`${string}_${string}`, string, never>;
    } & Fields, Schema.Struct.Encoded<{
        readonly id: Schema.Schema<`${string}_${string}`, string, never>;
    } & Fields>, Schema.Schema.Context<({
        readonly id: Schema.Schema<`${string}_${string}`, string, never>;
    } & Fields)["id" | keyof Fields]>, Schema.Struct.Constructor<{
        readonly id: Schema.Schema<`${string}_${string}`, string, never>;
    } & Fields>, {}, {}>>>;
    readonly insertSchema: Schema.Schema<Schema.Struct.Type<Fields> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never, Schema.Struct.Encoded<Fields> extends infer T_3 ? { [K_1 in keyof T_3]: T_3[K_1]; } : never, Schema.Schema.Context<Fields[keyof Fields]>>;
    readonly partialSchema: Schema.Schema<Partial<Schema.Struct.Type<Fields> extends infer T_4 ? { [K in keyof T_4]: T_4[K]; } : never>, Partial<Schema.Struct.Encoded<Fields> extends infer T_5 ? { [K_1 in keyof T_5]: T_5[K_1]; } : never>, Schema.Schema.Context<Fields[keyof Fields]>>;
    readonly withDelete: boolean;
    readonly entity: Entity<Name, import("@effect/rpc/Rpc").Any>;
    readonly layer: Layer.Layer<never, never, Database>;
    readonly client: Effect.Effect<(entityId: string) => import("@effect/rpc/RpcClient").RpcClient.From<import("@effect/rpc/Rpc").Any, import("@effect/cluster/ClusterError").MailboxFull | import("@effect/cluster/ClusterError").AlreadyProcessingMessage | import("@effect/cluster/ClusterError").PersistenceError, "">, never, import("@effect/cluster/Sharding").Sharding>;
};
//# sourceMappingURL=entity-base.d.ts.map