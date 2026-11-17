import { delay } from '../lib/delay'

export async function mockPreviewVoice(_voiceKey: string): Promise<void> {
  await delay(1500)
}