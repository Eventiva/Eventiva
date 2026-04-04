/** Workspace-root-relative paths for FPK cluster manifests (`packages/cluster-tooling/fpk`). */
export const CLUSTER_FPK_ROOT = 'packages/cluster-tooling/fpk' as const;
export const CLUSTER_FPK_SRC = `${CLUSTER_FPK_ROOT}/src` as const;
export const CLUSTER_FPK_OUT = `${CLUSTER_FPK_ROOT}/out` as const;
export const CLUSTER_FPK_DOCKERFILE_RUNTIME = `${CLUSTER_FPK_ROOT}/Dockerfile.runtime` as const;
export const CLUSTER_FPK_DOCKERFILE_RUNTIME_MYSQL = `${CLUSTER_FPK_ROOT}/Dockerfile.runtime.mysql` as const;
