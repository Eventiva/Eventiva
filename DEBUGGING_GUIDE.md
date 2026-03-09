# Debugging Guide: "Cannot read properties of undefined (reading 'initial')" Error

## Current Status
All core processes and extensions are currently **disabled** in `packages/platforms/default/src/index.ts`.

## Step-by-Step Debugging Process

### Step 1: Test with Everything Disabled
Run the platform and verify it starts without errors (it may exit quickly since nothing is enabled).

### Step 2: Re-enable Core Processes One by One

Edit `packages/platforms/default/src/index.ts` and change the `debug` object flags from `true` to `false` one at a time, in this order:

1. **Enable Observability** (required for logging):
   ```typescript
   debug: {
     disableObservability: false,  // ← Change this first
     disableCluster: true,
     disablePiiEncryption: true,
     disableSchema: true,
     disableDatabase: true,
     disableHooks: true,
     disableStartupBanner: true,
     disableEntityEndpoints: true
   }
   ```
   Run and test. If error occurs, **ObservabilityLive** is the problem.

2. **Enable Cluster**:
   ```typescript
   disableCluster: false,  // ← Change this
   ```
   Run and test. If error occurs, **clusterLayerDefault** is the problem.

3. **Enable PII Encryption**:
   ```typescript
   disablePiiEncryption: false,  // ← Change this
   ```
   Run and test. If error occurs, **PiiEncryptionLive** is the problem.

4. **Enable Schema**:
   ```typescript
   disableSchema: false,  // ← Change this
   ```
   Run and test. If error occurs, **schemaStack** is the problem.

5. **Enable Database**:
   ```typescript
   disableDatabase: false,  // ← Change this
   ```
   Run and test. If error occurs, **databaseLayer** is the problem.

6. **Enable Hooks**:
   ```typescript
   disableHooks: false,  // ← Change this
   ```
   Run and test. If error occurs, **hooksStack** (ExtensionHooksLive, WorkflowEngineLayerInMemory, WorkflowRegistryLive) is the problem.

7. **Enable Startup Banner**:
   ```typescript
   disableStartupBanner: false,  // ← Change this
   ```
   Run and test. If error occurs, **StartupBannerLayer** is the problem.

8. **Enable Entity Endpoints**:
   ```typescript
   disableEntityEndpoints: false,  // ← Change this
   ```
   Run and test. If error occurs, **EntityEndpointsServer** is the problem.

### Step 3: Re-enable Extensions

Once all core processes are enabled without errors, re-enable extensions:

```typescript
extensions: [
  { id: "contact", layer: ContactLayer },
  { id: "hello-world", layer: HelloWorldLayer }
]
```

Test each extension individually by only including one at a time.

## Potential Issues Fixed

1. **ExtensionHooksLive**: Fixed the layer composition to ensure proper initialization order when providing both `ExtensionHookPubSub` and `ExtensionHooks` tags.

## If Error Persists

If the error still occurs after re-enabling processes one by one, check:

1. **Context.Tag initialization**: Ensure all Context.Tags are properly created with `Context.GenericTag` or `Context.Tag()`.
2. **Layer dependencies**: Verify that layers requiring other services have those services provided before they're used.
3. **Circular dependencies**: Check for circular dependencies in layer composition.

## Files Modified

- `packages/core/src/runtime/platform.ts`: Added debug options
- `packages/core/src/extensions/extension-hooks.ts`: Fixed ExtensionHooksLive initialization
- `packages/platforms/default/src/index.ts`: Disabled all processes for debugging
