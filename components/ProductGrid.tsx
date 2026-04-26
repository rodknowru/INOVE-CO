'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

/**
 * Папки: public/images/products/<имя папки>/photo-1.jpg и photo-2.jpg
 * (имена папок — как в Finder, кириллица). Если у тебя .png — замени в путях .jpg на .png
 * или запусти: node scripts/normalize-product-photos.mjs и конвертируй фото в JPEG.
 */
export type Product = {
  id: string
  name: string
  description: string
  images: [string, string]
  price: string
  priceNum: number
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}

/** Путь к фото в подпапке товара (имя папки = как в Finder) */
const img = (folder: string, n: 1 | 2) => `/images/products/${folder}/photo-${n}.jpg`

const products: Product[] = [
  {
    id: '1',
    name: 'Шампунь для объёма INOVE-CO',
    description:
      'Мягкое очищение с акцентом на объём у корней. Подходит для тонких и склонных к слабому объёму волос.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой. При необходимости повторите.',
    images: [img('шампунь для объема', 1), img('шампунь для объема', 2)],
    price: '1 800 ₽',
    priceNum: 1800,
  },
  {
    id: '2',
    name: 'Увлажняющий шампунь INOVE-CO',
    description:
      'Нежное очищение и увлажнение без ощущения пересушенности. Подходит для нормальных и сухих волос.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.',
    images: [img('увлажняющий шампунь', 1), img('увлажняющий шампунь', 2)],
    price: '1 800 ₽',
    priceNum: 1800,
    tag: 'Бестселлер',
  },
  {
    id: '3',
    name: 'Увлажняющий бальзам INOVE-CO',
    description:
      'Смягчает и облегчает расчёсывание, помогает сохранить увлажнение по длине волос.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
    images: [img('увлажняющий бальзам', 1), img('увлажняющий бальзам', 2)],
    price: '1 900 ₽',
    priceNum: 1900,
  },
  {
    id: '4',
    name: 'Увлажняющая маска INOVE-CO',
    description:
      'Интенсивный уход для сухих и обезвоженных волос: насыщает и помогает сохранить мягкость.\n\nПрименение: 1–2 раза в неделю после шампуня, выдержите 5–10 минут, смойте.',
    images: [img('увлажняющая маска', 1), img('увлажняющая маска', 2)],
    price: '2 100 ₽',
    priceNum: 2100,
  },
  {
    id: '5',
    name: 'Спрей 15 в 1 INOVE-CO',
    description:
      'Многофункциональный спрей для укладки и ухода: облегчает расчёсывание, помогает защитить волосы при сушке феном.\n\nПрименение: распылите на влажные или сухие волосы, не смывайте. Избегайте попадания в глаза.',
    images: [img('спрей 15в1', 1), img('спрей 15в1', 2)],
    price: '1 900 ₽',
    priceNum: 1900,
    tag: 'Новинка',
  },
  {
    id: '6',
    name: 'Окрашивающий шампунь INOVE-CO',
    description:
      'Мягкое очищение для окрашенных волос: помогает сохранить насыщенность оттенка и блеск.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.',
    images: [img('окрашивающий шампунь', 1), img('окрашивающий шампунь', 2)],
    price: '1 800 ₽',
    priceNum: 1800,
  },
  {
    id: '7',
    name: 'Окрашивающий бальзам INOVE-CO',
    description:
      'Уход после мытья для окрашенных волос: увлажняет и помогает поддерживать цвет между окрашиваниями.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
    images: [img('окрашивающий бальзам', 1), img('окрашивающий бальзам', 2)],
    price: '1 900 ₽',
    priceNum: 1900,
  },
  {
    id: '8',
    name: 'Окрашивающая маска INOVE-CO',
    description:
      'Питательная маска для окрашенных волос: интенсивный уход и помощь в поддержании блеска.\n\nПрименение: 1–2 раза в неделю, выдержите 5–10 минут, смойте.',
    images: [img('окрашивающая маска', 1), img('окрашивающая маска', 2)],
    price: '2 100 ₽',
    priceNum: 2100,
  },
  {
    id: '9',
    name: 'Маска для объёма INOVE-CO',
    description:
      'Маска для тонких волос: питает без тяжести, помогает придать ощущение объёма и плотности.\n\nПрименение: 1–2 раза в неделю, выдержите 5–10 минут, смойте.',
    images: [img('маска для объема', 1), img('маска для объема', 2)],
    price: '2 100 ₽',
    priceNum: 2100,
  },
  {
    id: '10',
    name: 'Бальзам для объёма INOVE-CO',
    description:
      'Лёгкий бальзам для объёма: смягчает и помогает сохранить подвижность укладки без эффекта утяжеления.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
    images: [img('бальзам для объема', 1), img('бальзам для объема', 2)],
    price: '1 900 ₽',
    priceNum: 1900,
  },
]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section id="products" className="py-16 md:py-24 lg:py-32 px-4 md:px-12">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-20"
        >
          <div className="h-px w-12 md:w-20 bg-amber-accent" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-dark-brown text-center uppercase tracking-wider">
            КОЛЛЕКЦИЯ
          </h2>
          <div className="h-px w-12 md:w-20 bg-amber-accent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onOpenModal={setSelectedProduct}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 md:px-12 py-4 border-2 border-dark-brown text-dark-brown font-medium uppercase tracking-wider hover:bg-dark-brown hover:text-soft-white transition-all duration-300"
          >
            СМОТРЕТЬ КОЛЛЕКЦИЮ
          </a>
        </motion.div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
