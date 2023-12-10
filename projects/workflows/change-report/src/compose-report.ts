/**
 * @format
 * -----
 * Project: change-report
 * File: compose-report.ts
 * Path: \src\compose-report.ts
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
 * Last Modified: 10-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * Current Version: 0.0.0
 */

import {OpenAIApi, Configuration} from 'openai'

export const composeReport = async (
  daysCount: number,
  commitMessagesList: string[]
): Promise<string> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY!
  const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: OPENAI_API_KEY
    })
  )

  const systemPrompt = [
    `You're a software delivery assistant working in a team of software developers (us) developing a software product.`,
    `You're helping our team to write a report about the key changes that we have made to the project over the last ${daysCount} days.`,
    `You're writing a report that will be sent to the rest of our team and our public changelog pages.`,
    `You're taking a list of commit messages as input.`,
    `Your goal is to remind us of what those important and impactful changes that we've recently done are.`,
    'You should split the report into sections to help identify new features, bug fixes and minor changes.',
    `You should include emojis and emotes to make it more community-friendly.`,
    `You should always sign the end of your message as "The Software Delivery Change Manager".`,
    `Never make up points. Only use the information given to create your response.`,
    `If a section is going to be empty, this is fine.`,
    `Include within the title the name of the project, and the date range of the report.`,
  ].join('\n')
  const userPrompt = [
    `Write what we've done in the past tense, active voice.`,
    `Start with a title, then a brief summary of the most important changes.`,
    `Group by the type of work, order by importance, and use relevant emojis.`,
    'Squash updates that are not important, or that are too specific into brief summaries.',
    'Write in simple, casual, witty language.',
    'Write in plain text, with no formatting.',
    `Keep it short, summarise changes when there's many of them.`
  ].join('\n')

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: systemPrompt},
      {role: 'user', content: userPrompt},
      {role: 'user', content: 'Project Name: ' + GITHUB_REPO_NAME + '\nCommit messages:'},
      {role: 'user', content: commitMessagesList.join('\n')},
      {role: 'assistant', content: 'Report:'}
    ],
    max_tokens: 500,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    temperature: 0,
    top_p: 1,
    n: 1
  })

  const result = response.data.choices[0].message?.content || ''

  return result
}
