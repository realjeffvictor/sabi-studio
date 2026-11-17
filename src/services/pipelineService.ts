import { delay } from '../lib/delay'
import { STAGES } from '../data/options'

export async function runMockPipeline(
  onProgress: (stageIndex: number, percent: number) => void,
  isCancelled: () => boolean,
): Promise<void> {
  for (let i = 0; i < STAGES.length; i++) {
    for (let percent = 0; percent <= 100; percent += 10) {
      if (isCancelled()) return
      onProgress(i, percent)
      await delay(STAGES[i].mockMs / 10)
    }
  }
}