'use client'

import { motion } from 'framer-motion'
import { DELIVERY_SERVICES, type DeliveryServiceId } from '@/lib/deliveryOptions'

const ids: DeliveryServiceId[] = ['cdek', 'yandex', 'pochta']

const landingCards: Record<DeliveryServiceId, { price: string; days: string; features: string }> = {
  cdek: {
    price: 'от 140 ₽',
    days: '2–10 дней',
    features: '5 000+ ПВЗ · курьер / ПВЗ / постамат',
  },
  yandex: {
    price: 'рассчитывается при оформлении',
    days: '1–7 дней',
    features: 'экспресс в крупных городах · курьер / ПВЗ',
  },
  pochta: {
    price: 'от 300 ₽',
    days: '5–14 дней',
    features: 'любой населённый пункт · отделение / курьер EMS',
  },
}

export default function DeliverySection() {
  return (
    <section id="delivery" className="py-16 md:py-24 px-4 md:px-12 bg-warm-cream">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-serif text-2xl md:text-[40px] text-card-brown">
            Доставим в любой город России
          </h2>
          <p className="font-sans text-charcoal text-sm md:text-[17px] mt-3 max-w-xl mx-auto">
            Стоимость доставки рассчитывается по тарифам выбранной службы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ids.map((id, i) => {
            const s = DELIVERY_SERVICES[id]
            const card = landingCards[id]
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-soft-white rounded-xl border border-input-border p-6 flex flex-col"
              >
                <h3 className="font-serif font-semibold text-card-brown text-lg md:text-[22px]">{s.name}</h3>
                <p className="font-sans text-sm md:text-[17px] text-charcoal mt-2">{card.price}</p>
                <p className="font-sans text-sm md:text-[17px] text-charcoal mt-0.5">{card.days}</p>
                <p className="font-sans text-xs text-charcoal mt-2 flex-1">{card.features}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs md:text-[14px] text-charcoal/80 text-center mt-8 max-w-2xl mx-auto"
        >
          Точная стоимость зависит от веса, габаритов и адреса доставки. Бесплатная доставка при заказе от 5 000 ₽
        </motion.p>
      </div>
    </section>
  )
}
