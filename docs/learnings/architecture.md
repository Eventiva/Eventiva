# Architecture Learnings

## Backend composition

### Gateway and servers

- **Gateway** – Single entry point; runs on a configurable port (e.g. 5000–5010). Proxies to backend services. See `projects/backend/gateway/gateway-types.ts`: `Gateway` interface with `run(context: GatewayContext)`.
- **Backend servers** – Each server is a separate service (GraphQL, REST, etc.) with its own port. Gateway aggregates them. See `projects/backend/server/server-types.ts`: `Server`, `BackendContext` with `name`, `port`, `routes`, `gql`, `middlewares`, `parsers`.

### Slot pattern

- **BackendSlot** – Registers multiple `BackendServerDefinition[]`. Platform collects all backends from the slot and runs them. See `platform.node.runtime.ts`: `backendSlot.register(backends)`, `listBackendServers()`.
- **PlatformDeployerSlot** – Registers deployers (e.g. Terraform/CDK). Used in `deploy()` to deploy each runtime. See `platformDeployer.flatValues()`, `registerDeployers(deployers)`.

### Platform runtime

- **PlatformNode** – Main runtime. Holds `BackendSlot`, `PlatformDeployerSlot`, gateway, default server. Actions: `run` (default: run services), `run service`, `run gateway`, `deploy`. See `projects/backend/platform/platform.node.runtime.ts`.
- **runServices()** – Gets a port for the gateway, runs all backend servers via `runBackendServers()`, passes them to `gateway.run()`, returns `{ port, stop }`.
- **runService(name, port)** – Runs a single backend by name; builds `BackendContext` from server definition and calls `server.run(context)`.

### Context-driven assembly

- **BackendContext** – `name`, `port`, `routes`, `gql` (GraphQL schema), `parsers`, `middlewares`, `middlewaresPostRouting`. Servers receive this and return an `ApplicationInstance` (e.g. Express app).
- **GatewayContext** – `port`, `services` (array of `ApplicationInstance`), optional `cors`.

## Key files

| Path | Purpose |
|------|--------|
| `projects/backend/platform/platform.node.runtime.ts` | PlatformNode, slots, run/deploy |
| `projects/platforms/default/default.bit-app.ts` | Aspect list: DatabaseAspect, GraphqlAspect, RestAspect (LoggerAspect, etc. commented out) |
| `projects/backend/server/server-types.ts` | Server, BackendContext, DeployOptions |
| `projects/backend/gateway/gateway-types.ts` | Gateway, GatewayContext |

## Rebuild requirements

- Replace Bit Aspect/Slot with **Effect Layer/Service**. One Layer per “backend server” or gateway; composition via Layer merge.
- Cluster: use **@effect/cluster** for sharding, runners, entities so the same architecture can run in a distributed way.
- Keep the split: one gateway, many backends; backends register and are discovered at runtime (or via config).
