export type Slide = {
  type: 'image' | 'video'
  src: string
  poster?: string
  title: string
  caption: string
}

// Files live in /public/media. For a video slide use type: 'video' and an .mp4 path.
export const SLIDES: Slide[] = [
  {
    type: 'image',
    src: '/media/camera-operator.jpeg',
    title: 'Lights. Camera.',
    caption: 'Every great story starts behind the lens.',
  },
  {
    type: 'image',
    src: '/media/director-editor.jpeg',
    title: "The director's eye",
    caption: 'Shape every scene like a director shapes a film.',
  },
  {
    type: 'image',
    src: '/media/live-shoot.png',
    title: 'Live on set',
    caption: 'Bring the energy of a real shoot to your own story.',
  },
  {
    type: 'image',
    src: '/media/clapperboard.png',
    title: 'Action',
    caption: 'From idea to final cut.',
  },
  {
    type: 'image',
    src: '/media/sound-mixing.png',
    title: 'Sound that moves you',
    caption: 'Dialogue, music and effects, mixed like a film.',
  },
]