/*
 * Project: Eventiva
 * File: drizzle.config.ts
 * Last Modified: 04/09/2024, 23:15
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { defineConfig } from 'drizzle-kit'

export default defineConfig( {
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        ssl: false
    },
    dialect: 'postgresql',
    // schema: [
    //     '../../entities/db/drizzle/schema/user/user.ts',
    //     '../../entities/db/drizzle/schema/brand/brand.ts',
    //     '../../entities/db/drizzle/schema/category/category.ts',
    //     '../../entities/db/drizzle/schema/outlet/outlet.ts',
    //     '../../entities/db/drizzle/schema/product/product.ts',
    //     '../../entities/db/drizzle/schema/record/record.ts',
    //     '../../entities/db/drizzle/schema/scraper/scraper.ts',
    //     '../../entities/db/drizzle/schema/scraper-log/scraper-log.ts',
    //     '../../entities/db/drizzle/schema/aliases/brand/brand.ts',
    //     '../../entities/db/drizzle/schema/aliases/product/product.ts',
    //     '../../entities/db/drizzle/schema/aliases/category/category.ts',
    //     '../../entities/db/drizzle/schema/brand-to-products/brand-to-products.ts',
    //     '../../entities/db/drizzle/schema/category-to-products/category-to-products.ts',
    //     '../../entities/db/drizzle/schema/outlet-to-brands/outlet-to-brands.ts',
    //     '../../entities/db/drizzle/schema/outlet-to-categories/outlet-to-categories.ts',
    //     '../../entities/db/drizzle/schema/outlet-to-products/outlet-to-products.ts',
    //     '../../entities/db/drizzle/relations/user/user.ts',
    //     '../../entities/db/drizzle/relations/brand/brand.ts',
    //     '../../entities/db/drizzle/relations/category/category.ts',
    //     '../../entities/db/drizzle/relations/outlet/outlet.ts',
    //     '../../entities/db/drizzle/relations/product/product.ts',
    //     '../../entities/db/drizzle/relations/record/record.ts',
    //     '../../entities/db/drizzle/relations/scraper/scraper.ts',
    //     '../../entities/db/drizzle/relations/scraper-log/scraper-log.ts',
    //     '../../entities/db/drizzle/relations/aliases/brand/brand.ts',
    //     '../../entities/db/drizzle/relations/aliases/product/product.ts',
    //     '../../entities/db/drizzle/relations/aliases/category/category.ts',
    //     '../../entities/db/drizzle/relations/brand-to-products/brand-to-products.ts',
    //     '../../entities/db/drizzle/relations/category-to-products/category-to-products.ts',
    //     '../../entities/db/drizzle/relations/outlet-to-brands/outlet-to-brands.ts',
    //     '../../entities/db/drizzle/relations/outlet-to-categories/outlet-to-categories.ts',
    //     '../../entities/db/drizzle/relations/outlet-to-products/outlet-to-products.ts'
    // ],
    out: './migrations',
    verbose: true,
    strict: true
} )
