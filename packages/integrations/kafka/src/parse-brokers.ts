/** Comma-separated bootstrap list from `KAFKA_BOOTSTRAP_SERVERS`. */
export function parseKafkaBootstrapServers(raw: string): ReadonlyArray<string> {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}
