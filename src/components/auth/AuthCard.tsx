import type { ReactNode } from 'react'
import Logo from '../ui/Logo'
import MediaSlideshow from '../ui/MediaSlideshow'
import { SLIDES } from '../../data/media'

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.15fr_1fr]">
      {/* Cinematic side (desktop) */}
      <aside className="relative hidden lg:block">
        <MediaSlideshow slides={SLIDES} className="absolute inset-0" />
        <div className="absolute left-10 top-8 z-10">
          <Logo />
        </div>
      </aside>

      {/* Form side */}
      <main className="relative flex items-center justify-center overflow-hidden px-6 py-12 sm:px-12">
        {/* On phones the slideshow becomes a dark background */}
        <MediaSlideshow
          slides={SLIDES}
          overlay="strong"
          showCaption={false}
          showDots={false}
          className="absolute inset-0 lg:hidden"
        />
        <div className="relative w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            <p className="mt-2 text-sm text-ink-300">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-6 text-center text-sm text-ink-300">{footer}</div>
          </div>
        </div>
      </main>
    </div>
  )
}