/**
 * Runtime configuration loaded from Effect Config plus platform template options.
 * This is loaded at startup and made available to core and extensions.
 */
import * as Config from 'effect/Config';
import * as ConfigProvider from 'effect/ConfigProvider';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
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

export const RuntimeConfig = Context.GenericTag<RuntimeConfig>('@eventiva/core/RuntimeConfig');
const envConfigProvider = ConfigProvider.fromEnv();

/**
 * Loads runtime config from environment variables and startup options.
 * Env keys:
 * - NODE_ENV
 * - EVENTIVA_INTEGRITY_NONCE
 * - EVENTIVA_ENCRYPTION_KEY
 */
export function RuntimeConfigLive(options: RuntimeConfigOptions): Layer.Layer<RuntimeConfig> {
    const [nodeEnv, integrityNonce, encryptionKey] = Effect.runSync(
        envConfigProvider.load(
            Config.all([
                Config.string('NODE_ENV').pipe(Config.withDefault('development')),
                Config.option(Config.string('EVENTIVA_INTEGRITY_NONCE')),
                Config.option(Config.string('EVENTIVA_ENCRYPTION_KEY')),
            ])
        )
    );
    return Layer.succeed(RuntimeConfig, {
        nodeEnv,
        endpointsPort: options.endpointsPort,
        integrityNonce,
        encryptionKey,
    });
}
