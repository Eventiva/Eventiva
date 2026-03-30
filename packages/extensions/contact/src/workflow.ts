/**
 * Contact extension workflows: on CORE_LOADED register columns;
 * on PROCESS_RUNTIME_READY_TOPIC seed one demo contact if empty and log the list (runs within cluster after server is up).
 */
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import {
    PROCESS_RUNTIME_READY_TOPIC,
    makeExtensionOnLoadLayer,
    makeExtensionWorkflowLayer,
    TableColumnRegistry,
    TableRelationsRegistry,
    EntityRegistry,
    withSpanAndLog,
} from '@eventiva/core';
import { ContactConfig } from './config.js';
import { CONTACT_ENTITY_ID, contactRegistryColumns } from './entity.js';

const EXTENSION_ID = 'contact';

const OnLoadLayer = makeExtensionOnLoadLayer(
    EXTENSION_ID,
    Effect.gen(function* () {
        const registry = yield* TableColumnRegistry;
        yield* registry.registerTableColumns('contact', EXTENSION_ID, contactRegistryColumns);

        const relationsRegistry = yield* TableRelationsRegistry;
        /** Drizzle relations: `created_by` FK is `contact.id` (self-reference when contact is the creator table). */
        yield* relationsRegistry.registerRelations('contact', EXTENSION_ID, (helpers: any) => {
            return {
                creator: helpers.one.contact({
                    from: helpers.contact.createdBy,
                    to: helpers.contact.id,
                }),
                createdContacts: helpers.many.contact({
                    from: helpers.contact.createdBy,
                    to: helpers.contact.id,
                }),
            };
        });
    })
);

const ContactSeedLayer = makeExtensionWorkflowLayer(
    EXTENSION_ID,
    'seed',
    PROCESS_RUNTIME_READY_TOPIC,
    Effect.gen(function* () {
        const config = yield* ContactConfig;
        if (!config.seedEnabled) {
            yield* Effect.log('Contact seed disabled by config.');
            return;
        }
        const Contact = EntityRegistry.tryGet('Contact');
        if (!Contact) {
            yield* Effect.log(
                'Contact entity not registered (schema finalization or EntityRegistry population may have failed); skipping seed.'
            );
            return;
        }
        const getClient = yield* Contact.client;
        const client = getClient(CONTACT_ENTITY_ID);

        // @ts-expect-error dynamic methods
        const list = yield* client.list({});
        if (list.length === 0) {
            const full = config.seedFullname.trim();
            const sp = full.indexOf(' ');
            const firstname = sp === -1 ? (full || 'Jane') : full.slice(0, sp);
            const lastname = sp === -1 ? 'Doe' : full.slice(sp + 1).trim() || 'Doe';
            const contactCreatePayload = {
                firstname,
                lastname,
                dateOfBirth: new Date(config.seedDateOfBirth).toISOString(),
                email: config.seedEmail,
                phone: config.seedPhone,
            };
            // @ts-expect-error dynamic methods
            const created = yield* client.create(contactCreatePayload);
            yield* Effect.log('contact created (demo seed)', { id: created.id, extension: 'extensions.contact' });
        } else {
            yield* Effect.log('contacts already exists', { count: list.length, extension: 'extensions.contact' });
        }
        // @ts-expect-error dynamic methods
        const listAfter = yield* client.list({});
        yield* Effect.log('contacts list', { count: listAfter.length, extension: 'extensions.contact' });
    }).pipe(
        Effect.tap(() =>
            Effect.logInfo('Contact seed phase finished.', { extension: 'extensions.contact' })
        ),
        withSpanAndLog('ContactSeedLayer')
    )
);

/**
 * Contact workflow layer: CORE_LOADED -> register columns;
 * EXTENSIONS_LOADED_TOPIC -> seed demo contact and log list.
 */
export const ContactWorkflowLayer = Layer.mergeAll(OnLoadLayer, ContactSeedLayer);
