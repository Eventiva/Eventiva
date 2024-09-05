/*
 * Project: Eventiva
 * File: cron-details.ts
 * Last Modified: 04/09/2024, 23:07
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

import { cron } from '@eventiva/entities.db.drizzle.schema.cron'
import { bigint, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const runidSeqInCron = cron.sequence(
    'runid_seq',
    { startWith: '1', increment: '1', minValue: '1', maxValue: '9223372036854775807', cache: '1', cycle: false }
)

export const jobRunDetailsInCron = cron.table( 'job_run_details', {
    jobid: bigint( 'jobid', { mode: 'number' } ),
    runid: bigint( 'runid', { mode: 'number' } ).primaryKey().notNull(),
    jobPid: integer( 'job_pid' ),
    database: text( 'database' ),
    username: text( 'username' ),
    command: text( 'command' ),
    status: text( 'status' ),
    returnMessage: text( 'return_message' ),
    startTime: timestamp( 'start_time' ),
    endTime: timestamp( 'end_time' )
} )

export type JobRunDetailsInsert = typeof jobRunDetailsInCron.$inferInsert;
export type JobRunDetailsPlain = typeof jobRunDetailsInCron.$inferSelect;
