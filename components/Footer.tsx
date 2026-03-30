'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export default function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-dark-brown text-soft-white pt-12 md:pt-20 pb-8 md:pb-10 px-4 md:px-12"
    >
      <div className="max-w-container mx-auto">
        {/* Десктоп: одна горизонтальная линия; Мобайл: столбик по центру */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 pb-6">
          {/* Left: logo + slogan in one line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-end justify-center md:justify-start gap-4"
          >
            <BrandLogo size="footer" variant="onDark" href="/" />
          </motion.div>

          {/* Right: socials + subscribe (desktop in one row) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end gap-4"
          >
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a
                href="https://www.instagram.com/inoveco_?igsh=Yng5ZTU3Z29pbGtu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-soft-white hover:text-amber-accent hover:rotate-12 transition-all duration-200"
              >
                <svg className="w-[43px] h-[43px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://vk.ru/inoveco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="text-soft-white hover:text-amber-accent hover:rotate-12 transition-all duration-200"
              >
                <svg className="w-[43px] h-[43px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.61c-.61 0-.8-.49-1.9-1.61-1.11-1.11-1.61-1.26-1.88-1.26-.38 0-.49.11-.49.64v1.47c0 .46-.14.73-1.35.73-2 0-4.21-1.21-5.77-3.47C3.53 9.87 3 8.07 3 7.73c0-.27.11-.52.64-.52h1.61c.48 0 .66.21.84.73.93 2.68 2.48 5.03 3.12 5.03.24 0 .35-.11.35-.71V9.85c-.07-1.24-.73-1.35-.73-1.79 0-.21.17-.42.45-.42h2.53c.39 0 .53.21.53.69v3.14c0 .39.17.53.28.53.24 0 .43-.14.87-.58 1.35-1.51 2.31-3.84 2.31-3.84.13-.27.35-.52.83-.52h1.61c.48 0 .59.25.48.69-.2.91-2.15 3.68-2.15 3.68-.17.28-.24.4 0 .71.17.23.73.71 1.11 1.14.7.79 1.24 1.45 1.38 1.91.15.46-.07.69-.55.69z"/>
                </svg>
              </a>
            </div>

            <div className="w-full max-w-[420px] md:max-w-[520px]">
              <label htmlFor="newsletter-email" className="sr-only">Ваш email для рассылки</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Ваш email"
                  className="w-full h-[56px] px-4 bg-transparent border border-soft-white/30 text-[15px] md:text-[17px] placeholder-soft-white/50 focus:outline-none focus:border-amber-accent"
                  aria-label="Подписка на рассылку"
                />
                <button
                  type="button"
                  onClick={() => alert('Подписка — скоро!')}
                  className="w-full sm:w-auto sm:min-w-[200px] h-[56px] px-5 border border-soft-white text-[15px] md:text-[17px] uppercase tracking-wider hover:bg-soft-white hover:text-dark-brown transition-colors"
                >
                  ПОДПИСАТЬСЯ
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-soft-white/20 pt-6 text-center">
          <p className="text-[13px] md:text-[15px] text-soft-white/70">
            © 2026 INOVECO •{' '}
            <button
              type="button"
              onClick={() => setIsPolicyOpen(true)}
              className="underline decoration-soft-white/40 underline-offset-2 hover:text-soft-white transition-colors"
            >
              Политика конфиденциальности
            </button>
            {' '}•{' '}
            <a href="#" className="underline decoration-soft-white/40 underline-offset-2 hover:text-soft-white transition-colors">
              Оферта
            </a>
            {' '}•{' '}
            <a href="#" className="underline decoration-soft-white/40 underline-offset-2 hover:text-soft-white transition-colors">
              Реквизиты
            </a>
          </p>
        </div>
      </div>

      <PrivacyPolicyModal open={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </motion.footer>
  )
}
