import * as Context from 'effect/Context';
import * as Layer from 'effect/Layer';
export interface HelloWorldConfig {
    readonly greeting: string;
}
export declare const HelloWorldConfig: Context.Tag<HelloWorldConfig, HelloWorldConfig>;
export declare const HelloWorldConfigLayer: Layer.Layer<HelloWorldConfig>;
//# sourceMappingURL=config.d.ts.map