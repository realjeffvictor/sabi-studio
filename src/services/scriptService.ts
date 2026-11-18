import { delay } from '../lib/delay'
import { getLanguage, getStyle } from '../data/options'
import type { Character, DialogueLine, Project, SceneDraft } from '../types'

const AMBIENCES = [
  'Village square, distant drums, chickens clucking',
  'Evening breeze through palm leaves, crickets',
  'Busy market, haggling voices, passing motorbikes',
  'Rain on zinc roofs, thunder rolling in the distance',
  'Quiet compound, a radio humming softly',
  'Night wind, distant dogs barking',
]

const SFX = [
  ['footsteps on dry earth', 'cloth rustling'],
  ['wooden door creak', 'clay pot set down'],
  ['crowd murmur swells', 'coins jingling'],
  ['thunder crack', 'rain intensifies'],
  ['laughter fades', 'gentle wind'],
  ['fire crackle', 'owl hoot'],
]

const EMOTION_CYCLE = ['curious', 'excited', 'tender', 'serious', 'playful']
const DELIVERY_CYCLE = [
  'quickly, cutting in',
  'softly, almost to themselves',
  'with a short laugh',
  'after a long pause',
  'warmly',
]

function makeLine(c: Character, project: Project, sceneIndex: number, n: number): DialogueLine {
  const lang = getLanguage(c.language ?? project.language)?.name ?? 'the chosen language'
  const k = sceneIndex + n
  return {
    character_id: c.id,
    speaker: c.name,
    text_native: `(${lang} line for ${c.name}. Short and natural. Real text arrives in Phase 4.)`,
    text_english: `English meaning of ${c.name}'s line.`,
    emotion: EMOTION_CYCLE[k % EMOTION_CYCLE.length],
    delivery: DELIVERY_CYCLE[k % DELIVERY_CYCLE.length],
  }
}

export async function mockGenerateScenes(
  project: Project,
  characters: Character[],
): Promise<SceneDraft[]> {
  await delay(1200)

  const count = Math.max(3, Math.min(6, Math.round(project.target_duration / 15)))
  const each = Math.round(project.target_duration / count)
  const style = getStyle(project.style)?.name ?? 'your style'
  const idea = project.idea?.trim() || project.title

  const narrator = characters.find((c) => c.role === 'narrator')
  const talkers = characters.filter((c) => c.role !== 'narrator')
  const cast = talkers.length > 0 ? talkers : characters

  return Array.from({ length: count }, (_, i) => {
    const dialogue: DialogueLine[] = []
    if (i === 0 && narrator) dialogue.push(makeLine(narrator, project, i, 0))

    const lineCount = Math.min(Math.max(cast.length * 2, 2), 4)
    for (let n = 0; n < lineCount; n++) {
      if (cast.length === 0) break
      dialogue.push(makeLine(cast[(i + n) % cast.length], project, i, n))
    }

    return {
      scene_number: i + 1,
      duration_seconds: each,
      visual_description:
        i === 0
          ? `Opening shot (${style}): ${idea}`
          : `Scene ${i + 1} (${style}): the story continues.`,
      camera_notes: 'Slow push-in',
      ambience: AMBIENCES[i % AMBIENCES.length],
      dialogue,
      sound_effects: SFX[i % SFX.length],
      music_cue: project.music_mood ?? 'afrobeat',
    }
  })
}

export async function mockRegenerateScene(
  project: Project,
  scene: SceneDraft,
  characters: Character[],
): Promise<{ visual_description: string; dialogue: DialogueLine[] }> {
  await delay(900)
  const cast = characters.filter((c) => c.role !== 'narrator')
  const speakers = cast.length > 0 ? cast : characters

  return {
    visual_description: `Alternative take on scene ${scene.scene_number}: a new angle on the same moment.`,
    dialogue: speakers
      .slice(0, 3)
      .map((c, n) => makeLine(c, project, scene.scene_number + 2, n)),
  }
}