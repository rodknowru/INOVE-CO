'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { formatRubles } from '@/lib/formatRubles'

export default function CartDrawer() {
  const router = useRouter()
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalSum } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-card-brown/20 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:max-w-md bg-soft-white shadow-2xl z-[91] flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-charcoal/10 flex items-center justify-between shrink-0 min-h-[56px]">
              <h2 className="font-serif text-xl md:text-[28px] font-semibold text-card-brown">Корзина</h2>
              <button
                aria-label="Закрыть"
                onClick={closeCart}
                className="p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-card-brown hover:text-accent-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <p className="font-sans text-charcoal text-sm">В корзине пока пусто</p>
              ) : (
                <ul className="space-y-4 md:space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 pb-4 md:pb-6 border-b border-charcoal/10 last:border-0">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden bg-warm-cream">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-semibold text-card-brown text-sm md:text-[20px]">{item.name}</p>
                        <p className="font-sans text-charcoal text-xs md:text-[15px] mt-0.5">{item.price} × {item.quantity}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 md:w-8 md:h-8 min-w-[32px] min-h-[32px] rounded-full border border-card-brown/30 text-card-brown hover:bg-card-brown hover:text-soft-white transition-colors flex items-center justify-center text-lg leading-none"
                            aria-label="Уменьшить"
                          >
                            −
                          </button>
                          <span className="font-sans text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full border border-card-brown/30 text-card-brown hover:bg-card-brown hover:text-soft-white transition-colors flex items-center justify-center text-lg leading-none"
                            aria-label="Увеличить"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="ml-2 font-sans text-xs text-charcoal hover:text-accent-gold underline min-h-[32px] flex items-center"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                      <p className="font-serif font-semibold text-card-brown shrink-0 text-sm md:text-[15px]">
                        {formatRubles(item.priceNum * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-charcoal/10 shrink-0">
                <p className="font-sans text-charcoal text-sm md:text-[15px] mb-3">
                  Итого: <span className="font-serif font-semibold text-card-brown text-lg md:text-[34px]">{formatRubles(totalSum)}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    router.push('/checkout')
                    closeCart()
                  }}
                  className="w-full min-h-[48px] py-4 bg-card-brown text-soft-white font-sans font-medium uppercase tracking-wider md:text-[18px] hover:bg-accent-gold transition-colors rounded-xl text-center flex items-center justify-center"
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
