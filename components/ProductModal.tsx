'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from './ProductGrid'

type ProductModalProps = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (product) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [product, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-brown/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-soft-white max-w-6xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-dark-brown hover:text-amber-accent transition-colors bg-soft-white"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px] group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-charcoal mb-2">Hair Care • Professional</p>
              <h2 className="font-serif text-3xl md:text-4xl text-dark-brown">{product.name}</h2>
              <p className="mt-8 text-charcoal font-light leading-relaxed">
                {product.fullDescription || product.description}
              </p>
              {product.volume && (
                <p className="mt-4 text-sm text-charcoal">Volume: {product.volume}</p>
              )}
              <p className="mt-10 font-serif text-3xl text-dark-brown">{product.price}</p>
              <div className="mt-10 flex flex-col gap-4">
                <button
                  onClick={() => alert('Wishlist — coming soon')}
                  className="w-full py-4 border-2 border-dark-brown text-dark-brown font-medium uppercase tracking-wider hover:bg-dark-brown hover:text-soft-white transition-colors"
                >
                  ADD TO WISHLIST
                </button>
                <button
                  onClick={() => alert('Notify — coming soon')}
                  className="w-full py-4 bg-dark-brown text-soft-white font-medium uppercase tracking-wider hover:bg-charcoal transition-colors"
                >
                  NOTIFY WHEN AVAILABLE
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
