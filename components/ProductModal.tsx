'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from './ProductGrid'
import { useCart } from '@/lib/CartContext'

type ProductModalProps = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [slide, setSlide] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const clampQty = (v: number) => Math.min(99, Math.max(1, v))

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (product) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setSlide(0)
      setQuantity(1)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [product, onClose])

  useEffect(() => {
    if (!product) return
    const t = setInterval(() => {
      setSlide((s) => (s === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(t)
  }, [product])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const goSlide = useCallback((i: number) => {
    setSlide(i === 0 || i === 1 ? i : 0)
  }, [])

  const toggleSlide = useCallback(() => {
    setSlide((s) => (s === 0 ? 1 : 0))
  }, [])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        priceNum: product.priceNum,
      },
      quantity
    )
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3C3228]/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-[#F5F0EB] max-w-6xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl text-[#3C3228]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Закрыть"
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-[#3C3228] hover:text-amber-accent transition-colors bg-[#F5F0EB]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative flex flex-col md:min-h-[560px] min-h-[280px]">
              <button
                type="button"
                onClick={toggleSlide}
                className="relative flex-1 min-h-[280px] md:min-h-[480px] overflow-hidden cursor-pointer group/slide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C3228]/30"
                aria-label="Сменить фото"
              >
                {product.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === 0 ? product.name : ''}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: slide === i ? 1 : 0 }}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </button>
              <div className="flex justify-center gap-2 py-4 bg-[#F5F0EB]">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goSlide(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      slide === i ? 'bg-[#3C3228]' : 'bg-[#3C3228]/25 hover:bg-[#3C3228]/45'
                    }`}
                    aria-label={`Фото ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#3C3228]/10">
              <h2 className="font-serif font-semibold text-[28px] leading-tight text-[#3C3228]">{product.name}</h2>
              <p className="mt-6 font-serif text-[32px] font-bold text-[#3C3228]">{product.price}</p>
              <div className="mt-6 font-sans text-[17px] leading-[1.8] text-[#3C3228] whitespace-pre-line">
                {product.description}
              </div>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-[#3C3228]/25 rounded-lg overflow-hidden min-h-[48px]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => clampQty(q - 1))}
                    className="w-10 h-10 min-h-[48px] min-w-[48px] flex items-center justify-center text-[#3C3228] hover:bg-[#3C3228]/5 transition-colors font-sans text-lg"
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-sans text-sm text-[#3C3228]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => clampQty(q + 1))}
                    className="w-10 h-10 min-h-[48px] min-w-[48px] flex items-center justify-center text-[#3C3228] hover:bg-[#3C3228]/5 transition-colors font-sans text-lg"
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[160px] min-h-[48px] py-3 px-6 rounded-lg bg-[#3C3228] text-[#F5F0EB] font-sans text-[17px] font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  В корзину
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
