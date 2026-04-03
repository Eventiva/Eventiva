import { ClusterSchema, DeliverAt, Entity } from "@effect/cluster"
import { DateTime, PrimaryKey, Schema } from "effect"
import { Rpc } from "@effect/rpc"

export class DelayedBullet
  extends Schema.Class<DelayedBullet>("DelayedBullet")({
    delay: Schema.Number,
    target: Schema.Int,
  })
  implements PrimaryKey.PrimaryKey
{
  [PrimaryKey.symbol]() {
    return String(this.target)
  }
}

export class DeliverAtBullet
  extends Schema.Class<DeliverAtBullet>("DeliverAtBullet")({
    delay: Schema.Number,
    target: Schema.Int,
  })
  implements PrimaryKey.PrimaryKey, DeliverAt.DeliverAt
{
  [PrimaryKey.symbol]() {
    return String(this.target)
  }
  [DeliverAt.symbol]() {
    return DateTime.unsafeNow().pipe(DateTime.add({ millis: this.delay }))
  }
}

export const DemoEntity = Entity.make("DemoEntity", [
  Rpc.make("Shoot", {
    payload: { target: Schema.Int },
  }).annotate(ClusterSchema.Persisted, false),

  Rpc.make("ShootWithDelay", {
    payload: DelayedBullet,
  }),

  Rpc.make("ShootAt", {
    payload: DeliverAtBullet,
  }),
]).annotateRpcs(ClusterSchema.Persisted, true)
