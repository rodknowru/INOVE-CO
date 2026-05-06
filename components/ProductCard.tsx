'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import type { Product } from '@/lib/product'

type ProductCardProps = {
  product: Product
  index: number
  onOpenModal: (product: Product) => void
}

export default function ProductCard({ product, index, onOpenModal }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const { addToCart } = useCart()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onOpenModal(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.imageMain,
        price: product.price,
        priceNum: product.priceNum,
      },
      quantity
    )
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1000)
  }

  const clampQty = (v: number) => Math.min(99, Math.max(1, v))
  const firstScreen = index < 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 * index, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-soft-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full min-h-0"
      data-product-card
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="relative w-full aspect-[4/5] overflow-hidden cursor-pointer shrink-0 bg-transparent"
      >
        <div className="absolute inset-0">
          <img
            src={encodeURI(product.imageMain)}
            alt={product.name}
            className="absolute inset-0 z-0 w-full h-full object-cover object-center"
            loading={firstScreen ? 'eager' : 'lazy'}
            decoding="async"
          />
          <img
            src={encodeURI(product.imageHover)}
            alt=""
            className="absolute inset-0 z-10 w-full h-full object-cover object-center opacity-0 group-hover:animate-productHoverCrossfade will-change-[opacity]"
            loading={firstScreen ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-card-brown text-soft-white font-sans text-xs md:text-[12px] uppercase tracking-wider rounded">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h3 className="font-serif font-semibold text-card-brown text-lg md:text-[24px] cursor-pointer hover:text-accent-gold transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-sans text-sm md:text-[17px] text-charcoal font-light">
          {product.subtitle}
        </p>
        <p className="mt-3 font-serif text-2xl md:text-[32px] font-semibold text-card-brown">{product.price}</p>

        <div className="mt-auto pt-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center border border-charcoal/20 rounded-lg overflow-hidden min-h-[48px]">
            <button
              type="button"
              onClick={() => setQuantity((q) => clampQty(q - 1))}
              className="w-10 h-10 min-h-[48px] min-w-[48px] flex items-center justify-center text-card-brown hover:bg-warm-cream transition-colors font-sans text-lg"
              aria-label="Уменьшить количество"
            >
              −
            </button>
            <span className="w-10 text-center font-sans text-sm text-card-brown">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => clampQty(q + 1))}
              className="w-10 h-10 min-h-[48px] min-w-[48px] flex items-center justify-center text-card-brown hover:bg-warm-cream transition-colors font-sans text-lg"
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 min-w-[140px] min-h-[48px] py-2.5 px-4 rounded-lg font-sans text-sm md:text-[17px] font-medium uppercase tracking-wider transition-all duration-300 ${
              addedFeedback
                ? 'bg-success-green text-soft-white'
                : 'bg-card-brown text-soft-white hover:bg-accent-gold'
            }`}
          >
            {addedFeedback ? '✓ Добавлено' : 'В корзину'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
