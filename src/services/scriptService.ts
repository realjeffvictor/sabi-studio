import { delay } from '../lib/delay'
import { getLanguage, getStyle } from '../data/options'
import type { DialogueLine, Project, SceneDraft } from '../types'

export async function mockGenerateScenes(project: Project): Promise<SceneDraft[]> {
  await delay(1200)

  const count = Math.max(3, Math.min(6, Math.round(project.target_duration / 15)))
  const each = Math.round(project.target_duration / count)
  const lang = getLanguage(project.language)?.name ?? 'your language'
  const style = getStyle(project.style)?.name ?? 'your style'
  const idea = project.idea?.trim() || project.title

  return Array.from({ length: count }, (_, i) => ({
    scene_number: i + 1,
    duration_seconds: each,
    visual_description:
      i === 0
        ? `Opening shot (${style}): ${idea}`
        : `Scene ${i + 1} (${style}): the story continues.`,
    camera_notes: 'Slow push-in',
    dialogue: [
      {
        speaker: 'Narrator',
        text_native: `(${lang} dialogue for scene ${i + 1}. Real text arrives in Phase 4.)`,
        text_english: `English meaning of the scene ${i + 1} dialogue.`,
        emotion: 'warm',
      },
    ],
    sound_effects: ['ambient crowd', 'soft wind'],
    music_cue: project.music_mood ?? 'afrobeat',
  }))
}

export async function mockRegenerateScene(
  project: Project,
  scene: SceneDraft,
): Promise<{ visual_description: string; dialogue: DialogueLine[] }> {
  await delay(900)
  const lang = getLanguage(project.language)?.name ?? 'your language'
  return {
    visual_description: `Alternative take on scene ${scene.scene_number}: a new angle on the same moment.`,
    dialogue: [
      {
        speaker: 'Narrator',
        text_native: `(New ${lang} line for scene ${scene.scene_number}.)`,
        text_english: `A fresh English meaning for scene ${scene.scene_number}.`,
        emotion: 'curious',
      },
    ],
  }
}