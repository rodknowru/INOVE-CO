'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isHoveringProduct, setIsHoveringProduct] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], [data-product-card]')) {
        setIsHoveringClickable(true)
        if (target.closest('[data-product-card]')) {
          setIsHoveringProduct(true)
        } else {
          setIsHoveringProduct(false)
        }
      } else {
        setIsHoveringClickable(false)
        setIsHoveringProduct(false)
      }
    }

    const handleMouseOut = () => {
      setIsHoveringClickable(false)
      setIsHoveringProduct(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] flex items-center justify-center rounded-full border-2 border-amber-accent w-10 h-10 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        scale: isHoveringClickable ? 1.5 : 1,
        backgroundColor: isHoveringClickable ? 'rgba(212, 165, 116, 0.9)' : 'transparent',
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      {isHoveringProduct && (
        <span className="text-[10px] font-medium text-dark-brown uppercase">VIEW</span>
      )}
    </motion.div>
  )
}
