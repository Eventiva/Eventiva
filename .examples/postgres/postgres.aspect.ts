/*
 * File: postgres.aspect.ts
 * Last Modified: 08/03/2025, 21:14
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */

import { Aspect } from '@bitdev/harmony.harmony'

/**
 * `PostgresAspect` is an aspect created using the `Aspect.create` method.
 * It is intended to provide functionality related to PostgreSQL utilities
 * and helpers.
 *
 * The aspect is identified by the unique ID '@encircle-marketing/crm.utilities./helpers/postgres'.
 */
export const PostgresAspect = Aspect.create( {
    id: 'encircle-marketing.crm/utilities/helpers/postgres'
} )

export default PostgresAspect
