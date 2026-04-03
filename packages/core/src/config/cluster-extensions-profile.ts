/**
 * `EVENTIVA_CLUSTER_EXTENSIONS` — which demo extension set to load (e.g. split deployments / consumer groups).
 * Default `all`.
 */
export function clusterExtensionsProfileFromEnv(): string {
  return process.env.EVENTIVA_CLUSTER_EXTENSIONS ?? "all"
}
