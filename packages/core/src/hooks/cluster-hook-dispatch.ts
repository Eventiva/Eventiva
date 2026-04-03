/**
 * Wire format for {@link publishClusterHookDispatch} / Kafka consumers.
 * Version field allows future schema evolution; consumers should ignore unknown `v`.
 */
import * as Schema from "effect/Schema"
import type { HookPhase, HookScope } from "./types.js"

export const hookDispatchEnvelopeVersion = 1 as const

const HookScopeEncoded = Schema.Union(
  Schema.Struct({ _tag: Schema.Literal("runner") }),
  Schema.Struct({
    _tag: Schema.Literal("entityType"),
    entityType: Schema.String,
  }),
  Schema.Struct({ _tag: Schema.Literal("singleton"), name: Schema.String }),
  Schema.Struct({ _tag: Schema.Literal("rpc"), rpcName: Schema.String }),
  Schema.Struct({ _tag: Schema.Literal("extension"), extensionId: Schema.String }),
)

/** JSON-safe envelope stored as Kafka record value (UTF-8). */
export const HookDispatchEnvelopeSchema = Schema.Struct({
  v: Schema.Literal(hookDispatchEnvelopeVersion),
  eventId: Schema.String,
  phase: Schema.String,
  scope: HookScopeEncoded,
  payload: Schema.Unknown,
})

export type HookDispatchEnvelope = Schema.Schema.Type<typeof HookDispatchEnvelopeSchema>

export function encodeHookDispatchEnvelope(input: HookDispatchEnvelope): string {
  return JSON.stringify(Schema.encodeSync(HookDispatchEnvelopeSchema)(input))
}

export function decodeHookDispatchEnvelope(json: string): HookDispatchEnvelope {
  const raw: unknown = JSON.parse(json)
  return Schema.decodeUnknownSync(HookDispatchEnvelopeSchema)(raw)
}

export function makeHookDispatchEnvelope(
  eventId: string,
  phase: HookPhase,
  scope: HookScope,
  payload: unknown,
): HookDispatchEnvelope {
  return {
    v: hookDispatchEnvelopeVersion,
    eventId,
    phase,
    scope,
    payload,
  }
}
