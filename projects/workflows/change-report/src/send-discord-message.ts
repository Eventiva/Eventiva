/**
 * @format
 * -----
 * Project: change-report
 * File: send-discord-message.ts
 * Path: \src\send-discord-message.ts
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

import Discord from 'discord.js'

export const sendDiscordMessage = async (
  channel: string,
  content: string
): Promise<void> => {
  const discord = new Discord.Client({
    intents: []
  })
  await discord.login(process.env.DISCORD_BOT_TOKEN)

  const discordChannel = await discord.channels.fetch(String(channel))

  if (!discordChannel) {
    throw new Error(`Discord channel ${channel} not found`)
  }

  if (!discordChannel.isTextBased()) {
    throw new Error(`Discord channel ${channel} is not text-based`)
  }

  const message = await discordChannel.send(
    Discord.MessagePayload.create(discordChannel, {
      content
    })
  )
  
  // if discord message sent successfully and is type Discord.Message<true>
  try {
    await message.crosspost()
  } catch (e) {
    console.error(e)
  }

  discord.destroy()
}
