/**
 * HelloWorld entity: one RPC sayHello (no payload, returns string).
 * One extension = one Entity. Observability in handlers (handlers.ts).
 */
import * as Rpc from "@effect/rpc/Rpc"
import * as Schema from "effect/Schema"
import { make } from "@eventiva/core"

const sayHelloRpc = Rpc.make("sayHello", {
  payload: Schema.Struct({}),
  success: Schema.String
})

/**
 * HelloWorld entity type. Single RPC: sayHello (no args, returns string).
 */
export const HelloWorld = make("HelloWorld", [sayHelloRpc])

export type HelloWorld = typeof HelloWorld
