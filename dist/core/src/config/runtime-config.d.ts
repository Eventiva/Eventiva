import * as Context from 'effect/Context';
import * as Layer from 'effect/Layer';
import * as Option from 'effect/Option';
export interface RuntimeConfig {
    readonly nodeEnv: string;
    readonly endpointsPort: number;
    readonly integrityNonce: Option.Option<string>;
    readonly encryptionKey: Option.Option<string>;
}
export interface RuntimeConfigOptions {
    readonly endpointsPort: number;
}
export declare const RuntimeConfig: Context.Tag<RuntimeConfig, RuntimeConfig>;
/**
 * Loads runtime config from environment variables and startup options.
 * Env keys:
 * - NODE_ENV
 * - EVENTIVA_INTEGRITY_NONCE
 * - EVENTIVA_ENCRYPTION_KEY
 */
export declare function RuntimeConfigLive(options: RuntimeConfigOptions): Layer.Layer<RuntimeConfig>;
//# sourceMappingURL=runtime-config.d.ts.map