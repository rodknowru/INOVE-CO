'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden">
      {/* Фото слева — без overlay и градиента */}
      <motion.div
        className="relative lg:col-span-3 h-[50vh] md:h-[60vh] lg:h-screen overflow-hidden order-2 lg:order-1"
        style={{ y }}
      >
        <Image
          src="/images/hero/hero-face.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </motion.div>

      {/* Текст справа на #F5F0EB */}
      <div className="lg:col-span-2 flex flex-col justify-center px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-0 bg-warm-cream order-1 lg:order-2 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-lg mx-auto lg:mx-0"
        >
          <h1 className="font-serif text-[28px] md:text-[58px] uppercase tracking-[2px] md:tracking-[4px] text-dark-brown leading-tight">
            ИСКУССТВО УХОДА ЗА ВОЛОСАМИ
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 md:mt-6 text-base md:text-[20px] text-charcoal font-light"
          >
            Натуральные формулы. Исключительный результат.
          </motion.p>
          <motion.a
            href="#products"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center justify-center gap-2 mt-8 md:mt-10 px-8 md:px-12 py-4 min-h-[48px] border-2 border-dark-brown text-dark-brown font-medium uppercase tracking-wider text-[15px] md:text-[18px] hover:bg-dark-brown hover:text-soft-white transition-all duration-300 group"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            СМОТРЕТЬ КОЛЛЕКЦИЮ
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-6 border-r-2 border-b-2 border-dark-brown rotate-45"
        />
      </motion.div>
    </section>
  )
}
