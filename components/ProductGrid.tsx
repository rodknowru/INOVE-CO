'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

/** Два фото в подпапке public/images/products/<название>/photo-1.jpg, photo-2.jpg; текст — из description.docx (см. scripts/) */
export type Product = {
  id: string
  name: string
  description: string
  images: [string, string]
  price: string
  priceNum: number
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}

const products: Product[] = [
  {
    id: '1',
    name: 'Шампунь для окрашенных волос INOVE-CO',
    description:
      'Мягкое очищение без пересушивания. Подходит для окрашенных волос: помогает сохранить насыщенность оттенка и блеск.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой. При необходимости повторите.',
    images: [
      '/images/products/Шампунь для окрашенных волос INOVE-CO/photo-1.jpg',
      '/images/products/Шампунь для окрашенных волос INOVE-CO/photo-2.jpg',
    ],
    price: '1 800 ₽',
    priceNum: 1800,
    tag: 'Бестселлер',
  },
  {
    id: '2',
    name: 'Шампунь для тонких волос INOVE-CO',
    description:
      'Бережно очищает кожу головы и длину волос. Лёгкая формула не создаёт эффекта утяжеления и придаёт ощущение объёма у корней.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.',
    images: [
      '/images/products/Шампунь для тонких волос INOVE-CO/photo-1.jpg',
      '/images/products/Шампунь для тонких волос INOVE-CO/photo-2.jpg',
    ],
    price: '1 800 ₽',
    priceNum: 1800,
  },
  {
    id: '3',
    name: 'Кондиционер для окрашенных волос INOVE-CO',
    description:
      'Увлажняет и облегчает расчёсывание. Подходит для окрашенных волос: помогает сохранить мягкость и сияние.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
    images: [
      '/images/products/Кондиционер для окрашенных волос INOVE-CO/photo-1.jpg',
      '/images/products/Кондиционер для окрашенных волос INOVE-CO/photo-2.jpg',
    ],
    price: '1 900 ₽',
    priceNum: 1900,
  },
  {
    id: '4',
    name: 'Кондиционер для тонких волос INOVE-CO',
    description:
      'Лёгкий кондиционер без эффекта утяжеления. Делает тонкие волосы более послушными и ухоженными.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
    images: [
      '/images/products/Кондиционер для тонких волос INOVE-CO/photo-1.jpg',
      '/images/products/Кондиционер для тонких волос INOVE-CO/photo-2.jpg',
    ],
    price: '1 900 ₽',
    priceNum: 1900,
  },
  {
    id: '5',
    name: 'Маска для окрашенных волос INOVE-CO',
    description:
      'Интенсивный уход для окрашенных волос: питает и помогает поддерживать блеск, волосы выглядят более ухоженными.\n\nПрименение: 1–2 раза в неделю после шампуня, выдержите 5–10 минут, смойте.',
    images: [
      '/images/products/Маска для окрашенных волос INOVE-CO/photo-1.jpg',
      '/images/products/Маска для окрашенных волос INOVE-CO/photo-2.jpg',
    ],
    price: '2 100 ₽',
    priceNum: 2100,
  },
  {
    id: '6',
    name: 'Маска для тонких волос INOVE-CO',
    description:
      'Питательная маска для тонких волос: насыщает без тяжести, помогает сохранить объём и мягкость.\n\nПрименение: 1–2 раза в неделю, выдержите 5–10 минут, смойте тщательно.',
    images: [
      '/images/products/Маска для тонких волос INOVE-CO/photo-1.jpg',
      '/images/products/Маска для тонких волос INOVE-CO/photo-2.jpg',
    ],
    price: '2 100 ₽',
    priceNum: 2100,
    tag: 'Новинка',
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
