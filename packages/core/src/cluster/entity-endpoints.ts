/**
 * Entity endpoint utilities: when an entity is registered on the cluster, expose
 * HTTP and RPC endpoint utilities that proxy requests to the entity client.
 *
 * - RPC over HTTP: POST /api/rpc/:pathPrefix with body { entityId?, method, payload }
 *   forwards to cluster entity client(entityId)[method](payload).
 *
 * - REST-style CRUD (when entity has list/get/create/update/delete):
 *   GET /api/:pathPrefix → list
 *   GET /api/:pathPrefix/{id} → get
 *   POST /api/:pathPrefix → create (body = fields)
 *   PATCH /api/:pathPrefix/{id} → update (body = patch)
 *   DELETE /api/:pathPrefix/{id} → delete
 *
 * Uses @effect/platform HttpApi + HttpApiBuilder so HttpApiSwagger can document the API.
 *
 * @see docs/learnings/architecture.md
 */
import { HttpApi, HttpApiBuilder, HttpApiEndpoint, HttpApiGroup, HttpApiSwagger, HttpServer, OpenApi } from '@effect/platform';
import { NodeHttpServer } from '@effect/platform-node';
import { Sharding } from '@effect/cluster';
import type * as Entity from '@effect/cluster/Entity';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Schema from 'effect/Schema';
import { EntityRegistry } from '../entity/entity-registry.js';
import { withSpanAndLog } from '../observability/helpers.js';
import { FeatureFlagKeys, type FeatureFlagOverrides } from '../feature-flags/index.js';

/** Standard CRUD method names (from makeCrudRpc). String so custom methods work; annotations document the defaults for Swagger. */
const RpcMethodSchema = Schema.String.pipe(
    Schema.annotations({
        description: '"list" | "get" | "create" | "update" | "delete" (default CRUD). Other entity-specific methods allowed.',
        examples: ['list', 'get', 'create', 'update', 'delete'],
    })
);

/** Request body for entity RPC invoke. */
const RpcInvokePayload = Schema.Struct({
    entityId: Schema.optional(Schema.String).annotations({
        description: 'Entity ID. Omit for default (e.g. "store" for single-entity resources).',
    }),
    method: RpcMethodSchema,
    payload: Schema.optional(Schema.Unknown).annotations({
        description:
            'Method-specific payload. list: {} | get: { id } | create: { ...fields } | update: { id, patch } | delete: { id }',
    }),
}).annotations({
    description: 'RPC invoke body. Use "method" to choose the CRUD operation; "payload" shape depends on method.',
});

/** Success response: { success: unknown }. */
const RpcInvokeSuccess = Schema.Struct({
    success: Schema.Unknown,
}).annotations({
    description: 'Result of the RPC call. list: array of items; get: single item; create: { id }; update/delete: void.',
});

/** Shutdown response. */
const ShutdownSuccess = Schema.Struct({
    ok: Schema.Literal(true),
    message: Schema.String,
});

/** JSON success for REST list/get/create/update/delete. */
const JsonSuccess = Schema.Unknown;

/** Path param :id for get/update/delete. */
const IdPathParam = Schema.Struct({ id: Schema.String });

/** Shutdown: GET and POST /api/shutdown — return 200 then exit process. */
const ShutdownGetEndpoint = HttpApiEndpoint.get('shutdownGet', '/api/shutdown').addSuccess(ShutdownSuccess);
const ShutdownPostEndpoint = HttpApiEndpoint.post('shutdownPost', '/api/shutdown')
    .setPayload(Schema.Struct({}))
    .addSuccess(ShutdownSuccess);
const ShutdownGroup = HttpApiGroup.make('Shutdown').add(ShutdownGetEndpoint).add(ShutdownPostEndpoint);

/** Required handler keys for each entity API group (used by runtime assertion and tests). */
export const ENTITY_GROUP_REQUIRED_HANDLER_KEYS = [
    'invoke',
    'list',
    'get',
    'create',
    'update',
    'delete',
] as const;

/**
 * Validates that a built handlers object has all required entity group keys and each is a function.
 * Used in the group callback and in unit tests to surface type/shape mismatches early.
 *
 * @throws if built is null/not object, has no .handle, has no .handlers iterable, or any required key is missing or not a function
 */
export function validateEntityGroupHandlers(
    built: unknown,
    groupName: string,
    requiredKeys: ReadonlyArray<string> = ENTITY_GROUP_REQUIRED_HANDLER_KEYS
): void {
    if (typeof built !== 'object' || built === null) {
        throw new Error(`EntityEndpoints: group "${groupName}" did not return a handlers object`);
    }
    const h = built as {
        handle?: unknown;
        handlers?: Iterable<{ endpoint?: { name?: string }; handler?: unknown }>;
    };
    if (typeof h.handle !== 'function') {
        throw new Error(
            `EntityEndpoints: group "${groupName}" handlers.handle is not a function (expected chain of .handle("${requiredKeys.join('", "')}", ...))`
        );
    }
    const handlersIter = h.handlers;
    if (!handlersIter) {
        throw new Error(
            `EntityEndpoints: group "${groupName}" has no handlers array (expected keys: ${requiredKeys.join(', ')})`
        );
    }
    const namesToHandler = new Map<string, unknown>();
    for (const item of handlersIter) {
        const name = item?.endpoint?.name;
        if (name) namesToHandler.set(name, item.handler);
    }
    for (const key of requiredKeys) {
        const fn = namesToHandler.get(key);
        if (typeof fn !== 'function') {
            throw new Error(
                `EntityEndpoints: group "${groupName}" missing or invalid handler "${key}" (expected function; have: ${Array.from(namesToHandler.keys()).join(', ') || 'none'})`
            );
        }
    }
}

/**
 * Convert a kebab-case path prefix into a PascalCase Swagger group name.
 *
 * @param pathPrefix - Kebab-case path segment (for example, "hello-worlds")
 * @returns Effect that yields the PascalCase group name (for example, "HelloWorlds")
 */
function pathPrefixToGroupName(pathPrefix: string): Effect.Effect<string> {
    return Effect.sync(() =>
        pathPrefix
            .split('-')
            .map((s) => (s.length > 0 ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s))
            .join('')
    ).pipe(withSpanAndLog('pathPrefixToGroupName', { attributes: { pathPrefix } }));
}

type PathSeg = `/${string}`;

/**
 * Create an HTTP API group exposing RPC and REST CRUD endpoints for a single entity.
 *
 * @param pathPrefix - URL path segment used for the entity (kebab-case, without a leading slash)
 * @param groupName - Display name used for the Swagger/OpenAPI group
 * @returns Effect that yields an HttpApiGroup containing:
 *  - RPC invoke at `/api/rpc/{pathPrefix}`
 *  - list and create at `/api/{pathPrefix}`
 *  - get, update and delete at `/api/{pathPrefix}/:id`
 */
function makeEntityGroup(pathPrefix: string, groupName: string): Effect.Effect<HttpApiGroup.HttpApiGroup.Any> {
    return Effect.sync(() => {
        const rpcPath = `/api/rpc/${pathPrefix}` as PathSeg;
        const listPath = `/api/${pathPrefix}` as PathSeg;
        const resourcePath = `/api/${pathPrefix}/:id` as PathSeg;
        const invokeE = HttpApiEndpoint.post('invoke', rpcPath)
            .setPayload(RpcInvokePayload)
            .addSuccess(RpcInvokeSuccess)
            .annotate(
                OpenApi.Summary,
                'Invoke an entity RPC method (CRUD: list, get, create, update, delete)'
            )
            .annotate(
                OpenApi.Description,
                'Call any entity method by name. Default CRUD: **list** (payload: {}), **get** (payload: { id }), **create** (payload: entity fields), **update** (payload: { id, patch }), **delete** (payload: { id }). Set "method" to the operation and "payload" to the matching shape.'
            );
        const listE = HttpApiEndpoint.get('list', listPath).addSuccess(JsonSuccess);
        const getE = HttpApiEndpoint.get('get', resourcePath).setPath(IdPathParam).addSuccess(JsonSuccess);
        const createE = HttpApiEndpoint.post('create', listPath).setPayload(Schema.Unknown).addSuccess(JsonSuccess);
        const updateE = HttpApiEndpoint.patch('update', resourcePath)
            .setPath(IdPathParam)
            .setPayload(Schema.Unknown)
            .addSuccess(JsonSuccess);
        const deleteE = HttpApiEndpoint.del('delete', resourcePath).setPath(IdPathParam).addSuccess(JsonSuccess);
        return HttpApiGroup.make(groupName)
            .add(invokeE)
            .add(listE)
            .add(getE)
            .add(createE)
            .add(updateE)
            .add(deleteE) as HttpApiGroup.HttpApiGroup.Any;
    }).pipe(withSpanAndLog('makeEntityGroup', { attributes: { pathPrefix, groupName } }));
}

/**
 * Descriptor for exposing an entity over HTTP/RPC. Register with the platform
 * so the gateway creates POST /api/rpc/:pathPrefix for that entity.
 */
export interface EntityEndpointDescriptor {
    /** The cluster entity (e.g. Contact). */
    readonly entity: Entity.Any;
    /** Default entityId when the request omits it (e.g. "store" for Contact). */
    readonly defaultEntityId: string;
    /** URL path segment (e.g. "contacts"). Request path is /api/rpc/:pathPrefix. */
    readonly pathPrefix: string;
}

/**
 * Build a single entity endpoint descriptor. Pass to createPlatformTemplate entityEndpoints
 * so the HTTP server exposes POST /api/rpc/:pathPrefix for this entity.
 *
 * @returns Effect that yields the descriptor (observable span/log/metric).
 */
export function makeEntityEndpointDescriptor(
    entity: Entity.Any,
    defaultEntityId: string,
    pathPrefix: string
): Effect.Effect<EntityEndpointDescriptor> {
    return Effect.sync(() => ({ entity, defaultEntityId, pathPrefix })).pipe(
        withSpanAndLog('makeEntityEndpointDescriptor', { attributes: { pathPrefix } })
    );
}

export interface EntityEndpointsOptions {
    readonly port?: number;
    /** Feature flag overrides for debugging. Env: EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER, etc. */
    readonly featureOverrides?: FeatureFlagOverrides;
}

function isEntityEndpointFlagEnabled(
    overrides: FeatureFlagOverrides | undefined,
    key: keyof typeof FeatureFlagKeys
): Effect.Effect<boolean> {
    return Effect.sync(() => {
        const k = FeatureFlagKeys[key];
        if (overrides && k in overrides) return overrides[k] ?? true;
        const envKey = `EVENTIVA_FEATURE_${key}` as const;
        const v = process.env[envKey];
        if (v === 'false' || v === '0') return false;
        if (v === 'true' || v === '1') return true;
        return true;
    }).pipe(withSpanAndLog('isEntityEndpointFlagEnabled', { attributes: { key: String(key) } }));
}

/**
 * Builds a Layer that starts an HTTP server exposing RPC proxy routes for each
 * descriptor. Requires Sharding. Server runs in a scope and is closed when the
 * scope ends. Uses HttpApi + HttpApiBuilder so HttpApi.Api is provided for HttpApiSwagger.
 *
 * Route: POST /api/rpc/:pathPrefix
 * Body: { entityId?: string, method: string, payload?: unknown }
 * Response: JSON { success: result } or { error: string }
 */
export function makeEntityEndpointsLayer(
    descriptors: ReadonlyArray<EntityEndpointDescriptor>,
    options: EntityEndpointsOptions = {}
): Layer.Layer<EntityEndpointsServer, any, Sharding.Sharding | HttpServer.HttpServer> {
    const port = options.port ?? 3000;
    const fo = options.featureOverrides;
    const startServer = Effect.gen(function* () {
        const useFullInit = yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_FULL_INIT');
        // Early return BEFORE any yield* – avoids running effects (tracer) when skipping init.
        // Crash: getFiberRef(undefined) in tracer when fiberRefs from different Effect instance.
        if (!useFullInit) {
            return { port } as const;
        }
        yield* Effect.logInfo('EntityEndpointsServer: initializing...', { service: 'eventiva-core' });
        if (yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_SHARDING')) {
            yield* Sharding.Sharding;
        } else {
            yield* Effect.logDebug(
                'EntityEndpointsServer: skipping Sharding (EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SHARDING=false)'
            );
        }

        // Include explicitly passed descriptors plus any entities from EntityRegistry (populated by
        // runCoreStartup from schema/tables). So /api/docs shows only entities that exist: table-based
        // entities (Contact, etc.) appear automatically; extensions that don't create an entity
        // (e.g. hello-world) aren't in the registry so they don't appear.
        const allDescriptors = [...descriptors];
        const allRegisteredEntities = EntityRegistry.getAll();
        for (const [name, EntityClass] of allRegisteredEntities.entries()) {
            if (!allDescriptors.some((d) => d.entity === (EntityClass as any).entity)) {
                allDescriptors.push({
                    entity: (EntityClass as any).entity,
                    defaultEntityId: 'store',
                    pathPrefix: name.toLowerCase() + 's',
                });
            }
        }

        const map = new Map<
            string,
            {
                entity: Entity.Any;
                getClient: (entityId: string) => Record<string, (payload: unknown) => Effect.Effect<unknown>>;
                defaultEntityId: string;
            }
        >();
        if (yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_CLIENT_FETCH')) {
            for (const d of allDescriptors) {
                const entity = d.entity as Entity.Any;
                const getClient = yield* entity.client;
                map.set(d.pathPrefix, {
                    entity,
                    getClient: getClient as unknown as (
                        entityId: string
                    ) => Record<string, (payload: unknown) => Effect.Effect<unknown>>,
                    defaultEntityId: d.defaultEntityId,
                });
            }
        } else {
            for (const d of allDescriptors) {
                map.set(d.pathPrefix, {
                    entity: d.entity as Entity.Any,
                    getClient: () => ({}),
                    defaultEntityId: d.defaultEntityId,
                });
            }
        }

        const pathPrefixes = allDescriptors.map((d) => d.pathPrefix);

        const invokeHandler = (pathPrefix: string) => (args: { payload: { entityId?: string; method: string; payload?: unknown } }) =>
            Effect.gen(function* () {
                const entry = map.get(pathPrefix);
                if (!entry)
                    return { success: { error: `Unknown pathPrefix: ${pathPrefix}` } } as { success: unknown };
                const { entityId, method, payload: payloadData } = args.payload;
                if (typeof method !== 'string')
                    return { success: { error: 'body.method is required' } } as { success: unknown };
                const client = entry.getClient(entityId ?? entry.defaultEntityId);
                const fn = client[method];
                if (typeof fn !== 'function')
                    return { success: { error: `Unknown method: ${method}` } } as { success: unknown };
                const rpc = entry.entity.protocol.requests.get(method) as
                    | { payloadSchema: Schema.Schema<unknown> }
                    | undefined;
                const decodeEffect =
                    rpc?.payloadSchema != null
                        ? Schema.decodeUnknown(rpc.payloadSchema as Schema.Schema<unknown>)(payloadData ?? {})
                        : Effect.succeed(payloadData ?? {});
                const result = yield* decodeEffect.pipe(
                    Effect.flatMap((decoded: unknown) => fn(decoded)),
                    Effect.map((success) => ({ success })),
                    Effect.catchAll((err: unknown) =>
                        Effect.succeed({
                            success: { error: err instanceof Error ? err.message : String(err) },
                        })
                    )
                );
                return result as { success: unknown };
            });

        const runClient = (
            pathPrefix: string,
            method: string,
            payload: unknown
        ): Effect.Effect<unknown, never> =>
            Effect.gen(function* () {
                const entry = map.get(pathPrefix);
                if (!entry)
                    return { error: `Unknown pathPrefix: ${pathPrefix}` };
                const client = entry.getClient(entry.defaultEntityId);
                const fn = client[method];
                if (typeof fn !== 'function')
                    return { error: `Unknown method: ${method}` };
                return yield* fn(payload).pipe(
                    Effect.catchAll((err: unknown) =>
                        Effect.succeed({ error: err instanceof Error ? err.message : String(err) })
                    )
                );
            });

        // Build API with one group per entity (e.g. "Contacts", "HelloWorlds") with concrete paths, plus Shutdown.
        let api = HttpApi.make('EventivaEntityRpc').add(ShutdownGroup) as HttpApi.HttpApi<
            string,
            HttpApiGroup.HttpApiGroup.Any,
            any,
            any
        >;
        for (const d of allDescriptors) {
            const groupName = yield* pathPrefixToGroupName(d.pathPrefix);
            api = api.add(yield* makeEntityGroup(d.pathPrefix, groupName)) as typeof api;
        }

        const shutdownResponse = { ok: true as const, message: 'Shutting down' };
        const scheduleExit = Effect.sync(() => setTimeout(() => process.exit(0), 100));
        const shutdownGroupLive = HttpApiBuilder.group(api as HttpApi.HttpApi<string, typeof ShutdownGroup, any, any>, 'Shutdown', (handlers) =>
            handlers
                .handle('shutdownGet', () => Effect.succeed(shutdownResponse).pipe(Effect.tap(() => scheduleExit)))
                .handle('shutdownPost', () => Effect.succeed(shutdownResponse).pipe(Effect.tap(() => scheduleExit)))
        );

        type GroupHandlers = { handle: (name: string, fn: (...args: any[]) => Effect.Effect<any>) => GroupHandlers };
        const entityGroupLayers = yield* Effect.all(
            allDescriptors.map((d) =>
                Effect.gen(function* () {
                    const groupName = yield* pathPrefixToGroupName(d.pathPrefix);
                    const p = d.pathPrefix;
                    return ((HttpApiBuilder.group as unknown) as (
                        a: unknown,
                        n: string,
                        f: (h: GroupHandlers) => GroupHandlers
                    ) => Layer.Layer<unknown, unknown, unknown>)(
                        api,
                        groupName,
                        (handlers) => {
                            const built = handlers
                                .handle('invoke', invokeHandler(p))
                                .handle('list', () => runClient(p, 'list', {}))
                                .handle('get', ({ path }: { path: { id: string } }) => runClient(p, 'get', { id: path.id }))
                                .handle('create', ({ payload }: { payload: unknown }) => runClient(p, 'create', payload))
                                .handle('update', ({ path, payload }: { path: { id: string }; payload: unknown }) =>
                                    runClient(p, 'update', {
                                        id: path.id,
                                        ...(typeof payload === 'object' && payload !== null ? payload : {}),
                                    })
                                )
                                .handle('delete', ({ path }: { path: { id: string } }) =>
                                    runClient(p, 'delete', { id: path.id })
                                );
                            validateEntityGroupHandlers(built, groupName);
                            return built;
                        }
                    );
                })
            )
        );

        const mergedEntityGroups =
            entityGroupLayers.length > 0
                ? entityGroupLayers.reduce((acc, layer) => Layer.merge(acc, layer))
                : Layer.succeedContext(Context.empty());

        const apiLayer = HttpApiBuilder.api(api as any).pipe(
            Layer.provide(shutdownGroupLive),
            Layer.provide(mergedEntityGroups)
        );

        const useFullLayerBuild = yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_FULL_LAYER_BUILD');
        if (useFullLayerBuild) {
            // Serve the API and mount Swagger at /api/docs; both require HttpApi.Api (provided by apiLayer).
            yield* Effect.logInfo('EntityEndpointsServer: building serve + Swagger layer...', {
                service: 'eventiva-core',
            });
            const serveLayer = HttpApiBuilder.serve();
            const swaggerLayer = HttpApiSwagger.layer({ path: '/api/docs' });
            const serveAndSwaggerLayers = (yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_SWAGGER'))
                ? Layer.mergeAll(serveLayer, swaggerLayer)
                : serveLayer;

            const fullServerLayer = serveAndSwaggerLayers.pipe(
                Layer.provide(apiLayer),
                Layer.provide(NodeHttpServer.layerContext)
            );

            yield* Layer.build(fullServerLayer);
            yield* Effect.logInfo('EntityEndpointsServer: serve + Swagger layer built.', {
                service: 'eventiva-core',
            });
        } else {
            // Minimal: server is already listening via NodeHttpServer; Layer.build would mount routes.
            // Skip full layer build to avoid "initial" crash – server responds with 404 for /api/*.
            yield* Effect.logDebug(
                'EntityEndpointsServer: skipping full layer build (EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_LAYER_BUILD=false)'
            );
        }

        const rpcPaths = pathPrefixes.map((p) => `POST /api/rpc/${p}`);
        const restPaths = pathPrefixes.flatMap((p) => [
            `GET /api/${p}`,
            `GET /api/${p}/:id`,
            `POST /api/${p}`,
            `PATCH /api/${p}/:id`,
            `DELETE /api/${p}/:id`,
        ]);
        yield* Effect.logDebug('Entity HTTP endpoints up', {
            rpc: rpcPaths,
            rest: restPaths,
            service: 'eventiva-core',
        });
        return { port } as const;
    });
    const runEffect = Effect.gen(function* () {
        const useTracing = yield* isEntityEndpointFlagEnabled(fo, 'ENTITY_ENDPOINTS_TRACING');
        if (useTracing) {
            return yield* startServer.pipe(withSpanAndLog('makeEntityEndpointsLayer'));
        }
        return yield* startServer;
    });
    return Layer.scoped(EntityEndpointsServer, runEffect) as Layer.Layer<
        EntityEndpointsServer,
        any,
        Sharding.Sharding | HttpServer.HttpServer
    >;
}

/**
 * Tag for the entity endpoints server (holds port after start). Use for tests or logging.
 */
export class EntityEndpointsServer extends Context.Tag('@eventiva/core/EntityEndpointsServer')<
    EntityEndpointsServer,
    { readonly port: number }
>() {}
