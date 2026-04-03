import * as Effect from "effect/Effect"
import * as Ref from "effect/Ref"

interface DedupeState {
  readonly ids: ReadonlySet<string>
  readonly order: ReadonlyArray<string>
}

const emptyState: DedupeState = { ids: new Set(), order: [] }

/**
 * Bounded in-memory dedupe for Kafka at-least-once delivery.
 * Returns `true` if `eventId` was already seen (still commit offset).
 */
export const makeEventIdDedupeRef = (maxSize: number) =>
  Ref.make(emptyState).pipe(
    Effect.map((ref) => ({
      isDuplicate: (eventId: string) =>
        Ref.modify(ref, (s) => {
          if (s.ids.has(eventId)) {
            return [true, s] as const
          }
          let order = [...s.order, eventId]
          const ids = new Set(s.ids)
          ids.add(eventId)
          while (order.length > maxSize) {
            const evict = order[0]
            if (evict === undefined) {
              break
            }
            order = order.slice(1)
            ids.delete(evict)
          }
          return [false, { ids, order } as DedupeState] as const
        }),
    })),
  )
