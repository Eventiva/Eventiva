import { deploymentMap, parseClusterStack, stackDefaultRequired, type ClusterStack } from './stack.js';

export type DeploymentPair = readonly [namespace: string, deployment: string];

/**
 * Resolves [namespace, deployment] pairs to wait on for `kubectl rollout status`.
 */
export const resolveRolloutDeployments = (options?: {
    readonly stack?: ClusterStack;
    readonly requiredDeploymentsEnv?: string | undefined;
}): DeploymentPair[] => {
    const stack = options?.stack ?? parseClusterStack();
    let requiredDeploymentsRaw: string | undefined;
    if (options?.requiredDeploymentsEnv !== undefined) {
        requiredDeploymentsRaw = options.requiredDeploymentsEnv;
    } else if (process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS) {
        requiredDeploymentsRaw = process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS;
    } else {
        requiredDeploymentsRaw = stackDefaultRequired[stack];
    }

    const requiredDeployments = requiredDeploymentsRaw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    const pairs = requiredDeployments.map((name) => deploymentMap[name]).filter(Boolean) as DeploymentPair[];
    return pairs;
};
