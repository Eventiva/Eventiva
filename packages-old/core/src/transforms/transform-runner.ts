import * as Effect from 'effect/Effect';
import * as Ref from 'effect/Ref';
import { withSpanAndLog } from '../observability/helpers.js';

export type TransformPhase = 'pre' | 'post';

export interface TransformDiff {
    readonly path: string;
    readonly before: unknown;
    readonly after: unknown;
}

export interface TransformStep {
    readonly extensionId: string;
    readonly transformId: string;
    readonly phase: TransformPhase;
    readonly timestamp: string;
    readonly diffs: ReadonlyArray<TransformDiff>;
}

export interface TransformContext<T> {
    readonly original: Readonly<T>;
    readonly current: T;
    readonly steps: ReadonlyArray<TransformStep>;
}

export interface RegisteredTransform<T, E = never, R = never> {
    readonly scope: string;
    readonly phase: TransformPhase;
    readonly priority: number;
    readonly extensionId: string;
    readonly transformId: string;
    readonly run: (ctx: TransformContext<T>) => Effect.Effect<T, E, R>;
}

const registry = new Map<string, Array<RegisteredTransform<any, any, any>>>();

const keyOf = (scope: string, phase: TransformPhase): string => `${scope}:${phase}`;

const shallowDiff = (before: Record<string, unknown>, after: Record<string, unknown>): ReadonlyArray<TransformDiff> => {
    const paths = new Set<string>([...Object.keys(before), ...Object.keys(after)]);
    const out: TransformDiff[] = [];
    for (const path of paths) {
        const a = before[path];
        const b = after[path];
        if (a !== b) {
            out.push({ path, before: a, after: b });
        }
    }
    return out;
};

export const registerTransform = <T, E = never, R = never>(transform: RegisteredTransform<T, E, R>): void => {
    const key = keyOf(transform.scope, transform.phase);
    const list = registry.get(key) ?? [];
    list.push(transform as unknown as RegisteredTransform<any, any, any>);
    list.sort((a, b) => a.priority - b.priority);
    registry.set(key, list);
};

export const clearTransforms = (): void => {
    registry.clear();
};

export const getTransforms = <T>(scope: string, phase: TransformPhase): ReadonlyArray<RegisteredTransform<T, any, any>> =>
    (registry.get(keyOf(scope, phase)) ?? []) as ReadonlyArray<RegisteredTransform<T, any, any>>;

export const runTransforms = <T, E = never, R = never>(
    scope: string,
    phase: TransformPhase,
    input: T
): Effect.Effect<TransformContext<T>, E, R> =>
    Effect.gen(function* () {
        const original = Object.freeze(structuredClone(input as unknown as object)) as Readonly<T>;
        const currentRef = yield* Ref.make(input);
        const stepsRef = yield* Ref.make<ReadonlyArray<TransformStep>>([]);
        const transforms = getTransforms<T>(scope, phase);
        for (const transform of transforms) {
            const current = yield* Ref.get(currentRef);
            const steps = yield* Ref.get(stepsRef);
            const ctx: TransformContext<T> = { original, current, steps };
            const next = yield* transform.run(ctx).pipe(
                withSpanAndLog('transform.run', {
                    attributes: {
                        scope,
                        phase,
                        extensionId: transform.extensionId,
                        transformId: transform.transformId,
                        priority: String(transform.priority),
                    },
                    metricName: 'transforms.run.duration',
                })
            );
            const diffs =
                typeof current === 'object' &&
                current !== null &&
                typeof next === 'object' &&
                next !== null
                    ? shallowDiff(current as Record<string, unknown>, next as Record<string, unknown>)
                    : [];
            const step: TransformStep = {
                extensionId: transform.extensionId,
                transformId: transform.transformId,
                phase,
                timestamp: new Date().toISOString(),
                diffs,
            };
            yield* Ref.set(currentRef, next);
            yield* Ref.update(stepsRef, (list) => [...list, step]);
        }
        const current = yield* Ref.get(currentRef);
        const steps = yield* Ref.get(stepsRef);
        return { original, current, steps } as TransformContext<T>;
    }).pipe(withSpanAndLog('runTransforms', { attributes: { scope, phase }, metricName: 'transforms.scope.duration' }));
