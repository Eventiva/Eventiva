import {App} from '@slack/bolt'

export const sendSlackMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!
  })

  await app.client.chat.postMessage({
    channel,
    mrkdwn: true,
    text: 'Codebase changes summary',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Codebase changes summary*\n- Upgraded satellite antenna design to improve signal reception\n\n📱 User Experience:\n- Introduced SpaceX Internet app for easy access to service\n- Introduced SpaceX Internet app for easy access to service\n[Missing Error Logs]`
        }
      }
    ]
  })
}
