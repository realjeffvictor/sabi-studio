export type StyleOption = { id: string; name: string; note: string; gradient: string }

export const STYLES: StyleOption[] = [
  { id: 'anime', name: 'Anime', note: 'Bold lines, expressive eyes', gradient: 'from-pink-500/40 to-indigo-700/40' },
  { id: 'family-3d', name: '3D Family Animation', note: 'Warm, colorful 3D worlds', gradient: 'from-sky-400/40 to-emerald-600/40' },
  { id: 'cinematic', name: 'Cinematic', note: 'Film-grade light and lenses', gradient: 'from-amber-500/40 to-stone-900' },
  { id: 'documentary', name: 'Documentary', note: 'Real, grounded and honest', gradient: 'from-slate-400/30 to-slate-800' },
  { id: 'comic', name: 'Comic', note: 'Colorful cartoon energy', gradient: 'from-orange-500/40 to-rose-700/40' },
]

export type LanguageOption = {
  id: string
  name: string
  available: boolean
  accents: string[]
}

// Accent names are placeholders. Native speakers should decide the real list.
export const LANGUAGES: LanguageOption[] = [
  { id: 'hausa', name: 'Hausa', available: true, accents: ['Standard Hausa', 'Kano'] },
  { id: 'igbo', name: 'Igbo', available: true, accents: ['Standard Igbo', 'Onitsha'] },
  { id: 'yoruba', name: 'Yoruba', available: true, accents: ['Standard Yoruba', 'Lagos', 'Ibadan'] },
  { id: 'pidgin', name: 'Nigerian Pidgin', available: true, accents: ['Lagos', 'Niger Delta'] },
  { id: 'english-ng', name: 'English (Nigerian accent)', available: true, accents: ['Lagos', 'Abuja', 'Northern'] },
  { id: 'swahili', name: 'Swahili', available: false, accents: [] },
  { id: 'amharic', name: 'Amharic', available: false, accents: [] },
  { id: 'zulu', name: 'Zulu', available: false, accents: [] },
  { id: 'twi', name: 'Twi', available: false, accents: [] },
]

export type VoiceOption = {
  key: string
  name: string
  language: string
  gender: 'female' | 'male'
  age: 'adult' | 'elder'
}

// Placeholder voices: one adult female, one adult male, one elder per language.
const VOICE_NAMES: Record<string, [string, string, string]> = {
  hausa: ['Amina', 'Musa', 'Baba Dauda'],
  igbo: ['Ngozi', 'Chidi', 'Papa Obi'],
  yoruba: ['Funmi', 'Tunde', 'Baba Segun'],
  pidgin: ['Blessing', 'Emeka', 'Papa Joe'],
  'english-ng': ['Zainab', 'Tobi', 'Chief Ade'],
}

export const VOICES: VoiceOption[] = Object.entries(VOICE_NAMES).flatMap(
  ([language, [f, m, e]]): VoiceOption[] => [
    { key: `${language}-1`, name: f, language, gender: 'female', age: 'adult' },
    { key: `${language}-2`, name: m, language, gender: 'male', age: 'adult' },
    { key: `${language}-3`, name: e, language, gender: 'male', age: 'elder' },
  ],
)

export const MUSIC_MOODS = [
  { id: 'epic', name: 'Epic' },
  { id: 'afrobeat', name: 'Afrobeat' },
  { id: 'gospel', name: 'Gospel' },
  { id: 'suspense', name: 'Suspense' },
  { id: 'emotional', name: 'Emotional' },
  { id: 'comedy', name: 'Comedy' },
]

export const DURATIONS = [30, 60, 90, 120]

export const STAGES = [
  { id: 'script', label: 'Writing the script', mockMs: 1200 },
  { id: 'voice', label: 'Recording voices', mockMs: 1500 },
  { id: 'visuals', label: 'Creating visuals', mockMs: 1800 },
  { id: 'music', label: 'Composing music and effects', mockMs: 1200 },
  { id: 'assembly', label: 'Assembling your video', mockMs: 1500 },
]

// Placeholder pricing. Real numbers come in Phase 10, once we know our costs.
export function estimateCredits(seconds: number): number {
  return Math.max(5, Math.ceil(seconds / 6))
}

export const getStyle = (id: string | null) => STYLES.find((s) => s.id === id)
export const getLanguage = (id: string | null) => LANGUAGES.find((l) => l.id === id)
export const getVoice = (key: string | null) => VOICES.find((v) => v.key === key)
export const getMood = (id: string | null) => MUSIC_MOODS.find((m) => m.id === id)

export const EMOTIONS = [
  'neutral',
  'warm',
  'excited',
  'playful',
  'serious',
  'angry',
  'sad',
  'afraid',
  'tender',
  'sarcastic',
]

// Pick a sensible default voice for a character
export function suggestVoice(
  language: string | null,
  gender: string | null,
  age: string | null,
): string | null {
  const inLanguage = VOICES.filter((v) => v.language === language)
  const match =
    inLanguage.find((v) => v.gender === gender && v.age === age) ??
    inLanguage.find((v) => v.gender === gender) ??
    inLanguage[0]
  return match?.key ?? null
}