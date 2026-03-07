# Effect Migration Notes

## Current stack (Eventiva)

- **Validation:** Zod. Plan: **replace with Effect Schema** (Effect’s built-in solutions).
- **Data:** Drizzle. Plan: prefer **Effect SQL** (@effect/sql, @effect/sql-pg, @effect/sql-drizzle) where it fits; otherwise Drizzle wrapped in Effect Service.
- **Composition:** Bit Aspect + Slot (BackendSlot, PlatformDeployerSlot). Plan: **Effect Layer/Service**; one Layer per backend/gateway/deployer; composition via Layer merge.
- **HTTP/API:** Express, Apollo Gateway/Server. Plan: **Effect** handles HTTP/API; expose OpenAPI, GraphQL, MCP, gRPC; extensions plug into all.
- **No Effect in current Eventiva codebase** – Rebuild will use Effect throughout.

## Mapping

| Current (Bit/Eventiva) | Rebuild (Effect) |
|------------------------|------------------|
| Aspect | Effect Layer or Service descriptor |
| Slot (BackendSlot, etc.) | Layer merge; optional @effect/cluster for distribution |
| Zod | Effect Schema |
| Drizzle (raw) | @effect/sql-pg or Drizzle in Effect Service |
| Express route/gql | Effect HTTP + GraphQL/OpenAPI/MCP/gRPC |
| Per-component env | Effect Config (secrets never logged) |

## Tier 1 in every iteration

- **i18n** – Include in every iteration; not optional.
- **Feature flags** – Include in every iteration; not optional.

## References

- Plan: Key constraints; Part C (Cluster, Rebuild by area); Part D (Execution).
- Effect docs: Layer, Schema, Config, cluster.
