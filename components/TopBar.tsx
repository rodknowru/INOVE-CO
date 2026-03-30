'use client'

import { motion } from 'framer-motion'
import { slideDown } from '@/lib/animations'

export default function TopBar() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideDown}
      className="h-8 bg-dark-brown flex items-center justify-center"
    >
      <p className="text-soft-white text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[1.5px] sm:tracking-[2px] font-sans font-medium text-center px-2">
        INOVECO | SOFT SCIENCE OF CARE
      </p>
    </motion.div>
  )
}
