/**
 * HelloWorld entity: one RPC sayHello (no payload, returns string).
 * One extension = one Entity. Observability in handlers (handlers.ts).
 */
import * as Rpc from '@effect/rpc/Rpc';
import * as Schema from 'effect/Schema';
/**
 * HelloWorld entity type. Single RPC: sayHello (no args, returns string).
 */
export declare const HelloWorld: import("@eventiva/core").Entity<"HelloWorld", Rpc.Rpc<"sayHello", Schema.Struct<{}>, typeof Schema.String, typeof Schema.Never, never>>;
export type HelloWorld = typeof HelloWorld;
//# sourceMappingURL=entity.d.ts.map