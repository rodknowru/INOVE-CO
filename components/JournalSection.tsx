import { readdirSync } from 'fs'
import { join } from 'path'
import JournalGallery from './JournalGallery'

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i

/** Только 3 фото для журнала (без фото с кокосом для About — оно в /about.jpeg) */
function getJournalImagePaths(): string[] {
  try {
    const dir = join(process.cwd(), 'public', 'images', 'journal')
    return readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b, 'ru'))
      .map((f) => `/images/journal/${f}`)
  } catch {
    return []
  }
}

export default function JournalSection() {
  const paths = getJournalImagePaths()

  return (
    <section id="journal" className="py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-warm-cream">
      <div className="max-w-container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-2xl md:text-[40px] text-dark-brown">Журнал</h2>
          <p className="mt-4 text-charcoal font-light text-base md:text-[17px]">
            Советы по уходу, новости бренда и вдохновение
          </p>
        </div>
        <JournalGallery images={paths} />
      </div>
    </section>
  )
}
