import * as Context from 'effect/Context';
import * as Layer from 'effect/Layer';
export interface ContactConfig {
    readonly seedEnabled: boolean;
    readonly seedFullname: string;
    readonly seedDateOfBirth: string;
    readonly seedEmail: string;
    readonly seedPhone: string;
}
export declare const ContactConfig: Context.Tag<ContactConfig, ContactConfig>;
export declare const ContactConfigLayer: Layer.Layer<ContactConfig>;
//# sourceMappingURL=config.d.ts.map