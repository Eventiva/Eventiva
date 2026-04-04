import {
  HookRegistry,
  clusterHookDispatchTopicDefault,
  decodeHookDispatchEnvelope,
  encodeHookDispatchEnvelope,
  makeHookDispatchEnvelope,
  type HookPhase,
  type HookScope,
} from "@eventiva/core"
import { Consumer, Producer } from "effect-kafka"
import type { ConnectionException } from "effect-kafka/KafkaError"
import { KafkaJS } from "effect-kafka/KafkaJS"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Stream from "effect/Stream"
import * as fs from "node:fs"
import { makeEventIdDedupeRef } from "./event-id-dedupe.js"
import { parseKafkaBootstrapServers } from "./parse-brokers.js"

const defaultDedupeMax = 5000

function kafkaSslConfig():
  | true
  | { rejectUnauthorized?: boolean; ca: Array<Buffer>; cert?: Buffer; key?: Buffer }
  | undefined {
  if (process.env.KAFKA_TLS !== "true" && process.env.KAFKA_SSL !== "true") return undefined
  const caPath = process.env.KAFKA_SSL_CA_PATH
  const certPath = process.env.KAFKA_SSL_CERT_PATH
  const keyPath = process.env.KAFKA_SSL_KEY_PATH
  if (caPath) {
    const ca = fs.readFileSync(caPath)
    const cert = certPath ? fs.readFileSync(certPath) : undefined
    const key = keyPath ? fs.readFileSync(keyPath) : undefined
    const caList: Array<Buffer> = [ca]
    return { ca: caList, ...(cert && key ? { cert, key } : {}) }
  }
  return true
}

export function clusterHookKafkaBrokersFromEnv(): ReadonlyArray<string> {
  return parseKafkaBootstrapServers(
    process.env.KAFKA_BOOTSTRAP_SERVERS ?? "localhost:9092",
  )
}

export function clusterHookKafkaConsumerGroupFromEnv(): string {
  const id = process.env.CLUSTER_EXTENSION_ID?.trim()
  return id ? `eventiva-hooks-${id}` : "eventiva-hooks-default"
}

export function clusterHookDispatchTopicFromEnv(): string {
  return process.env.EVENTIVA_HOOK_DISPATCH_TOPIC ?? clusterHookDispatchTopicDefault
}

/** KafkaJS engine from env (brokers + optional TLS). */
export const clusterHookKafkaEngineLayer = KafkaJS.layer({
  brokers: [...clusterHookKafkaBrokersFromEnv()],
  ssl: kafkaSslConfig(),
})

export const clusterHookKafkaConsumerLayer = Consumer.layer({
  groupId: clusterHookKafkaConsumerGroupFromEnv(),
  autoCommit: false,
  allowAutoTopicCreation: true,
})

export const clusterHookKafkaProducerLayer = Producer.layer({
  allowAutoTopicCreation: true,
})

const hookDispatchDedupeMax = Number(process.env.EVENTIVA_HOOK_DEDUPE_MAX ?? String(defaultDedupeMax))

export const clusterHookKafkaDaemonLayer = Layer.scopedDiscard(
  Effect.gen(function* () {
    const topic = clusterHookDispatchTopicFromEnv()
    const dedupeTool = yield* makeEventIdDedupeRef(
      Number.isFinite(hookDispatchDedupeMax) && hookDispatchDedupeMax > 0
        ? hookDispatchDedupeMax
        : defaultDedupeMax,
    )
    const program = Consumer.serveStream(topic).pipe(
      Stream.runForEach((record) =>
        Effect.gen(function* () {
          const hooks = yield* HookRegistry
          if (!record.value) {
            yield* record.commit()
            return
          }
          const json = record.value.toString("utf8")
          const envelope = yield* Effect.try({
            try: () => decodeHookDispatchEnvelope(json),
            catch: (e) => e,
          }).pipe(
            Effect.tapError((e) => Effect.logWarning("invalid hook dispatch envelope", { cause: e })),
            Effect.catchAll(() => Effect.succeed(undefined)),
          )
          if (envelope === undefined) {
            yield* record.commit()
            return
          }
          const dup = yield* dedupeTool.isDuplicate(envelope.eventId)
          if (dup) {
            yield* record.commit()
            return
          }
          yield* hooks.run(
            envelope.scope as HookScope,
            envelope.phase as HookPhase,
            envelope.payload,
          )
          yield* record.commit()
        }),
      ),
      Effect.orDie,
    )
    yield* Effect.forkScoped(program)
  }),
)

/**
 * Producer + engine for {@link publishClusterHookDispatch}.
 * Merge with the same {@link clusterHookKafkaEngineLayer} as consumers in this process if both are used.
 */
export const clusterHookKafkaPublishLayers = Layer.merge(
  clusterHookKafkaProducerLayer,
  clusterHookKafkaEngineLayer,
)

/** Publish one hook dispatch record (UTF-8 JSON envelope). */
export const publishClusterHookDispatch = (
  eventId: string,
  phase: HookPhase,
  scope: HookScope,
  payload: unknown,
) =>
  Effect.gen(function* () {
    const topic = clusterHookDispatchTopicFromEnv()
    const body = encodeHookDispatchEnvelope(
      makeHookDispatchEnvelope(eventId, phase, scope, payload),
    )
    yield* Producer.send({
      topic,
      messages: [{ key: eventId, value: body }],
    })
  })

/**
 * When `CLUSTER_HOOK_BUS=kafka`, merges consumer daemon + Kafka engine.
 * Requires {@link HookRegistry} from the parent stack.
 */
export function clusterHookKafkaStackFromEnv(): Layer.Layer<
  never,
  ConnectionException,
  HookRegistry
> {
  if (process.env.CLUSTER_HOOK_BUS !== "kafka") {
    return Layer.empty
  }
  const engine = clusterHookKafkaEngineLayer
  const kafkaClients = Layer.mergeAll(
    Layer.provide(clusterHookKafkaConsumerLayer, engine),
    Layer.provide(clusterHookKafkaProducerLayer, engine),
  )
  return Layer.provideMerge(clusterHookKafkaDaemonLayer, kafkaClients) as Layer.Layer<
    never,
    ConnectionException,
    HookRegistry
  >
}
