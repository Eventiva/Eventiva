/**
 * Hello-world extension config loaded from Effect Config.
 * Env keys:
 * - HELLO_WORLD_GREETING
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
