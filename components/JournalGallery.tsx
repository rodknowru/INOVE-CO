'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type JournalGalleryProps = {
  images: string[]
}

export default function JournalGallery({ images }: JournalGalleryProps) {
  if (images.length === 0) {
    return (
      <p className="text-center text-charcoal/70 font-sans text-sm py-8">
        Добавьте изображения в папку <code className="text-xs bg-charcoal/5 px-1 rounded">public/images/journal</code> — они появятся здесь.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08 * index }}
          whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
          className="group relative h-[280px] sm:h-[320px] lg:h-[420px] w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </div>
  )
}
