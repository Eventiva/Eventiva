/**
 * Kubernetes deployment keys used by rollout wait and apply stack selection.
 * Keys match EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS comma-separated values.
 */
export const deploymentMap: Record<string, readonly [namespace: string, deployment: string]> = {
    postgres: ['postgres', 'postgres'],
    mysql: ['mysql', 'mysql'],
    kafka: ['kafka', 'redpanda'],
    'shard-manager': ['shard-manager', 'shard-manager'],
    'shard-manager-mysql': ['shard-manager-mysql', 'shard-manager-mysql'],
    battleships: ['battleships', 'battleships'],
    'battleships-mysql': ['battleships-mysql', 'battleships-mysql'],
    shooter: ['shooter', 'shooter'],
    'speed-shooter': ['speed-shooter', 'speed-shooter'],
    'slow-shooter': ['slow-shooter', 'slow-shooter'],
    'shooter-mysql': ['shooter-mysql', 'shooter-mysql'],
    'speed-shooter-mysql': ['speed-shooter-mysql', 'speed-shooter-mysql'],
    'slow-shooter-mysql': ['slow-shooter-mysql', 'slow-shooter-mysql'],
    runner: ['runner', 'runner'],
    workload: ['eventiva-workload', 'eventiva-workload'],
} as const;

/** Manifest subtrees under `packages/cluster-tooling/fpk/out` for partial apply (postgresql | mysql stack). */
export const stackApplyDirs: Record<'postgresql' | 'mysql', readonly string[]> = {
    postgresql: ['kafka', 'pg', 'shard-manager', 'battleships', 'shooter', 'speed-shooter', 'slow-shooter'],
    mysql: [
        'kafka',
        'mysql',
        'shard-manager-mysql',
        'battleships-mysql',
        'shooter-mysql',
        'speed-shooter-mysql',
        'slow-shooter-mysql',
    ],
};

/** Default rollout sets per stack. Override with EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS. */
export const stackDefaultRequired: Record<'postgresql' | 'mysql' | 'full', string> = {
    postgresql:
        'kafka,postgres,shard-manager,battleships,shooter,speed-shooter,slow-shooter',
    mysql: 'kafka,mysql,shard-manager-mysql,battleships-mysql,shooter-mysql,speed-shooter-mysql,slow-shooter-mysql',
    full: 'kafka,postgres,mysql,shard-manager,shard-manager-mysql,battleships,battleships-mysql,shooter,speed-shooter,slow-shooter,shooter-mysql,speed-shooter-mysql,slow-shooter-mysql',
};

export type ClusterStack = 'postgresql' | 'mysql' | 'full';

/** Reads EVENTIVA_CLUSTER_STACK / EVENTIVA_CLUSTER_PROFILE (default full). Throws if invalid. */
export const parseClusterStack = (): ClusterStack => {
    const s = process.env.EVENTIVA_CLUSTER_STACK ?? process.env.EVENTIVA_CLUSTER_PROFILE ?? 'full';
    if (s === 'postgresql' || s === 'mysql' || s === 'full') return s;
    throw new Error(`Unknown EVENTIVA_CLUSTER_STACK="${s}". Use postgresql, mysql, or full.`);
};

export const resolveStack = (): ClusterStack => parseClusterStack();
