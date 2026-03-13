/**
 * Contact extension config loaded from Effect Config.
 * Env keys:
 * - CONTACT_SEED_ENABLED
 * - CONTACT_SEED_FULLNAME
 * - CONTACT_SEED_DATE_OF_BIRTH
 * - CONTACT_SEED_EMAIL
 * - CONTACT_SEED_PHONE
 */
import * as Config from 'effect/Config';
import * as ConfigProvider from 'effect/ConfigProvider';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';

export interface ContactConfig {
    readonly seedEnabled: boolean;
    readonly seedFullname: string;
    readonly seedDateOfBirth: string;
    readonly seedEmail: string;
    readonly seedPhone: string;
}

export const ContactConfig = Context.GenericTag<ContactConfig>('@eventiva/extensions.contact/ContactConfig');
const envConfigProvider = ConfigProvider.fromEnv();
const [seedEnabled, seedFullname, seedDateOfBirth, seedEmail, seedPhone] = Effect.runSync(
    envConfigProvider.load(
        Config.all([
            Config.nested(Config.boolean('SEED_ENABLED').pipe(Config.withDefault(true)), 'CONTACT'),
            Config.nested(Config.string('SEED_FULLNAME').pipe(Config.withDefault('Jane Doe')), 'CONTACT'),
            Config.nested(Config.string('SEED_DATE_OF_BIRTH').pipe(Config.withDefault('1990-05-15')), 'CONTACT'),
            Config.nested(Config.string('SEED_EMAIL').pipe(Config.withDefault('jane@example.com')), 'CONTACT'),
            Config.nested(Config.string('SEED_PHONE').pipe(Config.withDefault('+1234567890')), 'CONTACT'),
        ])
    )
);

export const ContactConfigLayer: Layer.Layer<ContactConfig> = Layer.succeed(ContactConfig, {
    seedEnabled,
    seedFullname,
    seedDateOfBirth,
    seedEmail,
    seedPhone,
});
