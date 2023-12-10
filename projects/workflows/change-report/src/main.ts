/**
 * @format
 * -----
 * Project: change-report
 * File: main.ts
 * Path: \src\main.ts
 * Created Date: Wednesday, December 6th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/change-report/blob/develop/CONTRIBUTING.md
 * 
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/change-report/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 Eventiva - All Rights Reserved
 * LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is 
 * licensed for copying, distribution and modification under the terms of
 * the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
 * or (at your option) any later version of this license.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Creative Commons Zero v1.0 Universal for more details.
 * 
 * You should have received a copy of the Creative Commons Zero v1.0 Universal
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
 * 
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 * -----
 * Last Modified: 09-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * Current Version: 0.0.0
 */

import * as core from '@actions/core'
import {fetchCommitMessages} from './fetch-commit-messages'
import {composeReport} from './compose-report'
import {sendSlackMessage} from './send-slack-message'
import {sendDiscordMessage} from './send-discord-message'

async function run(): Promise<void> {
  try {
    const daysCount = parseInt(core.getInput('days'))
    const commitMessagesList = await fetchCommitMessages(daysCount)

    core.info(`Fetched ${commitMessagesList.length} commit messages:`)
    core.info(commitMessagesList.join('\n'))

    if (commitMessagesList.length === 0) {
      core.info('No commit messages found. Skipping report generation.')
      return
    }

    const report = await composeReport(daysCount, commitMessagesList)
    core.info('Generated report:')
    core.info(report)

    if (!report) {
      throw new Error('Failed to generate report')
    }

    const destination = core.getInput('destination')
    const channels = core.getInput('channel').split(/, ?/)

    channels.forEach(async (channel) => {
      if (destination === 'slack') {
        await sendSlackMessage(channel, report)
      } else if (destination === 'discord') {
        await sendDiscordMessage(channel, report)
      } else {
        throw new Error(`Unknown destination: ${destination}`)
      }
    })

    core.info('Report sent')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
