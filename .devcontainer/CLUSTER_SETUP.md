# Cluster Setup for Multiple Runners

This guide explains how to set up and test the cluster with multiple runners in the devcontainer.

## Overview

The cluster can run in three modes:
- **test**: TestRunner (in-memory, single process) - default for development
- **single**: SingleRunner (single process, real sharding) - for testing sharding logic
- **distributed**: Multi-process with Pods + RunnerStorage - for production-like testing

## Prerequisites

The devcontainer includes:
- PostgreSQL 16 (service `postgres`, port 5432)
- Node.js 22
- pnpm 9
- nx

## Environment Variables

The following environment variables are set in the devcontainer:

| Variable   | Value       | Notes                           |
| ---------- | ----------- | ------------------------------- |
| `NODE_ENV` | development |                                 |
| `DATABASE` | postgres    | DB name                         |
| `HOST`     | postgres    | Service name (use in container) |
| `PORT`     | 5432        |                                 |
| `USERNAME` | postgres    |                                 |
| `PASSWORD` | postgres    |                                 |
| `SSL`      | false       | For local dev                   |

## Running Multiple Runners

### Option 1: TestRunner (In-Memory, Single Process)

This is the default mode. All entities run in a single process with in-memory sharding.

```bash
# Run the default platform (uses TestRunner)
pnpm nx run platforms-postgresql:run
```

### Option 2: SingleRunner (Single Process, Real Sharding)

Use this to test sharding logic in a single process with real sharding behavior.

```bash
# Set cluster mode to 'single'
export CLUSTER_MODE=single

# Run the platform
pnpm nx run platforms-postgresql:run
```

### Option 3: Multiple TestRunner Instances (Testing)

To test with multiple runners, you can run multiple processes with different entity profiles:

**Terminal 1 (Runner 1 - HelloWorld entities):**

```bash
export RUNNER_PROFILE=hello-world
export RUNNER_PORT=3001
pnpm nx run platforms-postgresql:run
```

**Terminal 2 (Runner 2 - Contact entities):**

```bash
export RUNNER_PROFILE=contact
export RUNNER_PORT=3002
pnpm nx run platforms-postgresql:run
```

**Terminal 3 (Client/Test):**

```bash
# Test that entities are sharded correctly
curl -X POST http://localhost:3001/api/rpc/hello-worlds -H "Content-Type: application/json" -d '{"method":"sayHello","payload":{}}'
curl -X POST http://localhost:3002/api/rpc/contacts -H "Content-Type: application/json" -d '{"method":"list","payload":{}}'
```

## Feature Flags

Control cluster features via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `EVENTIVA_FEATURE_CLUSTER` | `true` | Enable cluster features (Sharding, ClusterWorkflowEngine, ClusterMetrics) |
| `EVENTIVA_FEATURE_OBSERVABILITY` | `true` | Enable observability (Logger, Tracer, Metrics) |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS` | `true` | Enable HTTP entity endpoints |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER` | `true` | Enable Swagger UI at /api/docs |

## Testing Sharding

To verify that sharding is working correctly:

1. **Start multiple runners** (see Option 3 above)
2. **Check entity distribution**: Entities should be distributed across runners based on their entity ID hash
3. **Test entity calls**: Make RPC calls to different entity IDs and verify they route to the correct runner
4. **Monitor metrics**: Use ClusterMetrics to track shard distribution and entity message counts

## Database Setup

The PostgreSQL database is automatically started by the devcontainer. To manually connect:

```bash
psql -h postgres -U postgres -d postgres
```

For cluster persistence (MessageStorage, RunnerStorage), ensure the database schema is created:

```bash
# Run migrations if needed
pnpm nx run databases-pg:migrate
```

## Troubleshooting

### Port Conflicts

If you get port conflicts when running multiple runners:

```bash
# Check what's using the port
lsof -i :3000

# Use a different port
export ENDPOINTS_PORT=3001
```

### Database Connection Issues

If the database isn't accessible:

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check connection
psql -h postgres -U postgres -d postgres -c "SELECT 1;"
```

### Cluster Not Starting

Check the logs for cluster initialization:

```bash
# Enable debug logging
export DEBUG=@effect/cluster*

# Run with verbose output
pnpm nx run platforms-postgresql:run
```

## Next Steps

- See `packages/core/src/cluster/config.ts` for cluster configuration
- See `packages/core/src/runtime/platform.ts` for platform template setup
- See Effect cluster docs: https://effect-ts.github.io/effect/docs/cluster
