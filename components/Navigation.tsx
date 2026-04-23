'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import BrandLogo from './BrandLogo'

const navItems = [
  { label: 'ГЛАВНАЯ', href: '#hero' },
  { label: 'ПРОДУКЦИЯ', href: '#products' },
  { label: 'О НАС', href: '#about' },
  { label: 'ЖУРНАЛ', href: '#journal' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCart, totalCount, isOpen: isCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Не motion.header: transform на sticky-элементе ломает position:sticky на мобильных */}
      <header
        className={`sticky top-0 ${isCartOpen ? 'z-30' : 'z-40'} flex items-center px-4 sm:px-6 md:px-12 min-h-[64px] md:min-h-[86px] py-2 transition-all duration-300 max-md:bg-warm-cream/95 max-md:backdrop-blur-md max-md:border-b max-md:border-charcoal/10 ${
          isScrolled ? 'md:bg-warm-cream/90 md:backdrop-blur-md md:shadow-sm' : 'md:bg-transparent md:backdrop-blur-none'
        }`}
      >
        <div className="max-w-container mx-auto w-full flex items-center justify-between gap-4">
          <BrandLogo
            size="nav"
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#hero')
            }}
          />

          <div className="flex items-center gap-1 md:gap-10 lg:gap-12 shrink-0">
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-sm md:text-[16px] font-medium uppercase tracking-wider text-dark-brown hover:text-amber-accent transition-colors relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            <div className="flex items-center">
              <button
                type="button"
                onClick={openCart}
                aria-label="Открыть корзину"
                className="relative p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-dark-brown hover:text-accent-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-accent-gold text-soft-white text-xs font-sans font-medium">
                    {totalCount > 99 ? '99+' : totalCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Открыть меню"
                type="button"
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-dark-brown"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-warm-cream ${isCartOpen ? 'z-30' : 'z-40'} flex flex-col items-center justify-center gap-8 md:hidden`}
          >
            <button
              aria-label="Закрыть меню"
              type="button"
              className="absolute top-6 right-6 p-2 text-dark-brown"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-2xl font-serif text-dark-brown"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
