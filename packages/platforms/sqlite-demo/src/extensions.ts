import { type ExtensionRegistration } from '@eventiva/core';
import { HelloWorldConfigLayer, HelloWorldLayer } from '@eventiva/extensions.hello-world';
import { ContactConfigLayer, ContactLayer } from '@eventiva/extensions.contact';

/**
 * Extensions for this platform entry (ids used for schema markReady).
 * Keep this file in sync with other platform packages; only `register-database-backends.ts` should differ.
 */
export const extensions: ReadonlyArray<ExtensionRegistration> = [
    { id: 'hello-world', layer: HelloWorldLayer, configLayer: HelloWorldConfigLayer },
    { id: 'contact', layer: ContactLayer, configLayer: ContactConfigLayer },
];
