import { type EntityRpc } from '@eventiva/core';
import * as Schema from 'effect/Schema';
export declare const contactColumns: {
    id: import("drizzle-orm/pg-core").PgColumnBuilder<import("drizzle-orm/pg-core").PgColumnBuilderConfig, object>;
    fullname: import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>>;
    dateOfBirth: import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgDateStringBuilder>;
    email: import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>>;
    phone: import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>>;
};
declare const ContactEntity_base: {
    new (): {
        [x: string]: any;
    };
    [x: string]: any;
} & {
    readonly name: "Contact";
    readonly tableName: string;
    readonly idSchema: Schema.Schema<`${string}_${string}`, string, never>;
    readonly fieldsSchema: Schema.Struct<{
        id: Schema.NullOr<typeof Schema.String>;
        fullname: typeof Schema.String;
        dateOfBirth: typeof Schema.String;
        email: typeof Schema.String;
        phone: typeof Schema.String;
    }>;
    readonly recordSchema: Schema.Schema<{
        readonly id: `${string}_${string}`;
    } & {
        readonly id: string | null;
    } & {
        readonly fullname: string;
    } & {
        readonly dateOfBirth: string;
    } & {
        readonly email: string;
    } & {
        readonly phone: string;
    } & Record<string, unknown>, {
        readonly id: string;
    } & {
        readonly id: string | null;
        readonly fullname: string;
        readonly dateOfBirth: string;
        readonly email: string;
        readonly phone: string;
    } & {} & Record<string, unknown>, never>;
    readonly insertSchema: Schema.Schema<{
        readonly id: string | null;
    } & {
        readonly fullname: string;
    } & {
        readonly dateOfBirth: string;
    } & {
        readonly email: string;
    } & {
        readonly phone: string;
    } & Record<string, unknown>, {
        readonly id: string | null;
        readonly fullname: string;
        readonly dateOfBirth: string;
        readonly email: string;
        readonly phone: string;
    } & {} & Record<string, unknown>, never>;
    readonly partialSchema: Schema.Schema<Partial<{
        readonly id: string | null;
    } & {
        readonly fullname: string;
    } & {
        readonly dateOfBirth: string;
    } & {
        readonly email: string;
    } & {
        readonly phone: string;
    } & Record<string, unknown>>, Partial<{
        readonly id: string | null;
        readonly fullname: string;
        readonly dateOfBirth: string;
        readonly email: string;
        readonly phone: string;
    } & {} & Record<string, unknown>>, never>;
    readonly withDelete: boolean;
    readonly entity: import("@eventiva/core").Entity<"Contact", import("@effect/rpc/Rpc").Any>;
    readonly layer: import("effect/Layer").Layer<never, never, import("@eventiva/core").Database>;
    readonly client: import("effect/Effect").Effect<(entityId: string) => import("@effect/rpc/RpcClient").RpcClient.From<import("@effect/rpc/Rpc").Any, import("@effect/cluster/ClusterError").MailboxFull | import("@effect/cluster/ClusterError").AlreadyProcessingMessage | import("@effect/cluster/ClusterError").PersistenceError, "">, never, import("@effect/cluster/Sharding").Sharding>;
};
/**
 * Contact entity class: CRUD + cluster entity. Export as value so the platform can
 * register it with the cluster (ContactEntity.layer) and expose it in entity endpoints.
 */
export declare class ContactEntity extends ContactEntity_base {
}
declare module '@eventiva/core' {
    interface RegisteredEntities {
        Contact: typeof ContactEntity;
    }
}
/** Entity ID for the shared contact entity. Use when calling Contact.client("store"). */
export declare const CONTACT_ENTITY_ID = "store";
export type Contact = typeof ContactEntity;
export type ContactRpc = EntityRpc<typeof ContactEntity.entity>;
export type ContactRecord = Schema.Schema.Type<typeof ContactEntity>;
export {};
//# sourceMappingURL=entity.d.ts.map