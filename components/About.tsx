'use client'

import { motion } from 'framer-motion'

const values = [
  { text: '15+ натуральных активных ингредиентов', icon: '🌿' },
  { text: 'Без парабенов и сульфатов', icon: '✨' },
  { text: 'Без жестокости, веганские формулы', icon: '🐰' },
  { text: 'Производство малыми партиями', icon: '🧴' },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-gradient-to-b from-warm-cream to-[#EBE6E1]">
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[540px]"
        >
          <h2 className="font-serif text-2xl md:text-[24px] text-dark-brown">О бренде</h2>
          <p className="mt-3 md:mt-4 font-serif text-xl md:text-[36px] text-dark-brown/90 leading-snug">
            Натуральность в каждой капле
          </p>
          <p className="mt-4 md:mt-6 text-charcoal font-light leading-relaxed text-sm md:text-[21px] md:leading-[2]">
            INOVECO — это профессиональная линейка средств для ухода за волосами, созданная на основе натуральных
            масел и экстрактов. Каждый продукт разработан трихологами и произведён малыми партиями для максимального
            качества.
          </p>
          <motion.a
            href="#journal"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex mt-8 min-h-[48px] items-center px-8 py-3 border-2 border-dark-brown text-dark-brown font-sans text-sm md:text-[19px] font-medium uppercase tracking-wider hover:bg-dark-brown hover:text-soft-white transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#journal')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Подробнее о нас
          </motion.a>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="flex items-start gap-3"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm md:text-[19px] font-medium text-dark-brown leading-snug">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] rounded-sm overflow-hidden"
        >
          <img
            src="/about.jpeg"
            alt="О бренде INOVECO"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  )
}
