'use client'

import Link from 'next/link'

type BrandLogoProps = {
  variant?: 'default' | 'onDark'
  size?: 'nav' | 'checkout' | 'footer'
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const sizeClass = {
  nav: 'h-[50px] md:h-[70px]',
  checkout: 'h-[70px] md:h-[80px]',
  footer: 'h-[90px]',
} as const

export default function BrandLogo({
  variant = 'default',
  size = 'nav',
  href = '/',
  onClick,
}: BrandLogoProps) {
  const onDark = variant === 'onDark'

  const img = (
    <img
      src="/images/logo/inoveco_transparent.png?v=3"
      alt="INOVECO"
      decoding="async"
      className={`${sizeClass[size]} w-auto object-contain ${onDark ? 'invert' : ''}`}
    />
  )

  if (href.startsWith('#')) {
    return (
      <a href={href} onClick={onClick} aria-label="INOVECO, на главную">
        {img}
      </a>
    )
  }
  if (href === '/' && !onClick) {
    return (
      <Link href="/">
        {img}
      </Link>
    )
  }
  return (
    <a href={href} onClick={onClick}>
      {img}
    </a>
  )
}
