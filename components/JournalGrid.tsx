'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export type JournalEntry = {
  src: string
  date: string
  title: string
  excerpt: string
}

type JournalGridProps = {
  entries: JournalEntry[]
}

export default function JournalGrid({ entries }: JournalGridProps) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-charcoal/70 font-sans text-sm py-8">
        Добавьте изображения в папку <code className="text-xs bg-charcoal/5 px-1 rounded">public/about</code> — появятся карточки журнала.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((item, index) => (
        <motion.article
          key={`${item.src}-${index}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08 * index }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="group bg-soft-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-default"
        >
          <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-5 pt-4">
            <p className="text-xs uppercase tracking-wider text-charcoal/60 font-sans mb-2">{item.date}</p>
            <h3 className="font-serif text-lg md:text-xl text-dark-brown leading-snug group-hover:text-accent-gold transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-charcoal font-light leading-relaxed line-clamp-2">{item.excerpt}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
