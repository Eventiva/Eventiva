/**
 * Hello-world extension config: `Config.nested(Config.string('GREETING'), 'HELLO_WORLD')`
 * → environment variable `HELLO_WORLD_GREETING`.
 *
 * @see https://effect.website/docs/configuration/#using-nested-configuration-namespaces
 * Full catalog: repository root `.env.example`.
 */
import * as Config from 'effect/Config';
import * as ConfigProvider from 'effect/ConfigProvider';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';

export interface HelloWorldConfig {
    readonly greeting: string;
}

export const HelloWorldConfig = Context.GenericTag<HelloWorldConfig>(
    '@eventiva/extensions.hello-world/HelloWorldConfig'
);
const envConfigProvider = ConfigProvider.fromEnv();
const greeting = Effect.runSync(
    envConfigProvider.load(
        Config.nested(Config.string('GREETING').pipe(Config.withDefault('Hello World')), 'HELLO_WORLD')
    )
);

export const HelloWorldConfigLayer: Layer.Layer<HelloWorldConfig> = Layer.succeed(HelloWorldConfig, { greeting });
