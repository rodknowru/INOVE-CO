'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

export type Product = {
  id: string
  name: string
  description: string
  price: string
  priceNum: number
  image: string
  fullDescription?: string
  volume?: string
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}

const products: Product[] = [
  {
    id: '1',
    name: 'Шампунь для окрашенных волос INOVE-CO',
    description: 'Мягкое очищение и поддержка цвета для окрашенных волос.',
    fullDescription: 'Мягкое очищение и поддержка цвета для окрашенных волос.',
    price: '1 800 ₽',
    priceNum: 1800,
    image: '/images/products/1 800 ₽ Шампунь для окрашенных волос INOVE-CO.jpg',
    tag: 'Бестселлер',
  },
  {
    id: '2',
    name: 'Шампунь для тонких волос INOVE-CO',
    description: 'Бережно очищает и придаёт объём тонким волосам.',
    fullDescription: 'Бережно очищает и придаёт объём тонким волосам.',
    price: '1 800 ₽',
    priceNum: 1800,
    image: '/images/products/1 800 ₽ Шампунь для тонких волос INOVE-CO .jpg',
  },
  {
    id: '3',
    name: 'Кондиционер для окрашенных волос INOVE-CO',
    description: 'Увлажняет и разглаживает, продлевает яркость окрашивания.',
    fullDescription: 'Увлажняет и разглаживает, продлевает яркость окрашивания.',
    price: '1 900 ₽',
    priceNum: 1900,
    image: '/images/products/1 900 ₽ Кондиционер для окрашенных волос INOVE-CO .jpg',
  },
  {
    id: '4',
    name: 'Кондиционер для тонких волос INOVE-CO',
    description: 'Лёгкий уход без утяжеления: мягкость и послушность тонких волос.',
    fullDescription: 'Лёгкий уход без утяжеления: мягкость и послушность тонких волос.',
    price: '1 900 ₽',
    priceNum: 1900,
    image: '/images/products/1 900 ₽ Кондиционер для тонких волос INOVE-CO.jpg',
  },
  {
    id: '5',
    name: 'Маска для окрашенных волос INOVE-CO',
    description: 'Интенсивное восстановление и блеск для окрашенных волос.',
    fullDescription: 'Интенсивное восстановление и блеск для окрашенных волос.',
    price: '2 100 ₽',
    priceNum: 2100,
    image: '/images/products/2 100 ₽ Маска для окрашенных волос INOVE-CO .jpg',
  },
  {
    id: '6',
    name: 'Маска для тонких волос INOVE-CO',
    description: 'Питательная маска: укрепление и объём без тяжести.',
    fullDescription: 'Питательная маска: укрепление и объём без тяжести.',
    price: '2 100 ₽',
    priceNum: 2100,
    image: '/images/products/2 100₽  Маска для тонких волос INOVE-CO.jpg',
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
            SIGNATURE COLLECTION
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
            SHOP COLLECTION
          </a>
        </motion.div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
