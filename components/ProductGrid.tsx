'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import type { Product } from '@/lib/product'
import { products } from '@/lib/productsCatalog'

export type { Product }

export { productCardBlurb } from '@/lib/productCardBlurb'

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
