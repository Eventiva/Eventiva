# Evolution Chain Learnings (common-crm vs cms vs Eventiva)

## Overview

**Eventiva → cms → common-crm** is the evolution chain. common-crm is the final evolution (Eventiva codebase after it became “cms”). Eventiva is a different **industry** (event planning, gaming fleet) from cms/common-crm; learn from **TypeScript and Effect usage**, not the domain.

## Eventiva (current focus)

- **Stack:** TypeScript, Zod, Drizzle, Express, Apollo (Gateway + Server/subgraph), Bit Aspect/Slot. **No Effect** in codebase.
- **Composition:** BackendSlot, PlatformDeployerSlot; platform.node.runtime.ts runs gateway and backend servers; default.bit-app.ts lists aspects (DatabaseAspect, GraphqlAspect, RestAspect).
- **Patterns:** BackendContext (routes, gql, middlewares); Server interface with `run(context)`; Gateway with `run({ port, services })`.

## common-crm (Effect-based evolution)

- **Stack:** Effect (Context.Tag, Layer, Effect, Schema, Config), @effect/platform (HttpApi, OpenApi), Drizzle, TransformManager pattern.
- **Reporting-manager:** Uses **transforms** registered in **transform-manager** module; applied to report generation. See `reporting-manager.node.runtime.ts`: `TransformManagerService`, `TransformManagerNode`, `Key`; config-driven reporting with `ReportingConfig`; Effect Layer composition.
- **Platform:** Similar slot/backend idea but implemented with Effect (platform.node.runtime.ts, platform-deployer). Effect Layers for services; ConsoleService, LoggerAspect, LoggerNode.
- **Patterns to carry to Eventiva:** (1) Effect Layer/Service per capability; (2) config-driven behaviour (e.g. ReportingConfig, ConfigMap); (3) transform/registry pattern (register and apply); (4) Effect Schema and Config instead of Zod; (5) @effect/platform for HTTP/OpenAPI.

## cms (intermediate)

- If present in workspace: compare equivalent files (platform, gateway, server, entities) between cms and common-crm to see migration path from non-Effect to Effect. Focus on how Aspect/Slot was replaced by Layer/Service.

## Equivalent files to compare (when all three present)

- Backend platform: `backend/platform/platform.node.runtime.ts`, platform-config, deployer.
- Server/gateway types and runtime.
- Entities/DB access (Drizzle abstraction).
- Utilities: logging, database, config.

## Rebuild implications

- Rebuild Eventiva on **Effect** from the start; use common-crm patterns (Layer, Schema, transform manager, @effect/platform) and avoid redoing the migration later.
- Plan Part D.B: recreate and **improve** the transform concept from common-crm on Effect (no Bit); use for config- or code-defined models and event-triggered transforms.

## References

- Eventiva: `projects/backend/platform/platform.node.runtime.ts`, `projects/platforms/default/default.bit-app.ts`
- common-crm: `projects/modules/reporting-manager/reporting-manager.node.runtime.ts`, transform-manager module
