import type { TransformStep } from "./types.js"

/**
 * JSON wire contract for extension microservices implementing transform execution.
 * POST `{baseUrl}/v1/transforms/execute` with this body; response must include `current`.
 */
export type TransformRpcExecuteRequest = {
  readonly extensionId: string
  readonly transformId: string
  readonly rpcName: string
  readonly phase: "pre" | "post"
  readonly context: {
    readonly original: unknown
    readonly current: unknown
    readonly steps: ReadonlyArray<TransformStep>
  }
}

export type TransformRpcExecuteResponse = {
  /** Mutated payload after this transform step (required). */
  readonly current: unknown
  /** Optional extra audit steps; merged into runner context when present. */
  readonly steps?: ReadonlyArray<TransformStep>
}
