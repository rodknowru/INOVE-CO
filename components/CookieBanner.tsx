'use client'

import { useEffect, useState } from 'react'
import PrivacyPolicyModal from './PrivacyPolicyModal'

const STORAGE_KEY = 'inoveco-cookie-consent'

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) !== 'accepted') {
        setBannerVisible(true)
      }
    } catch {
      setBannerVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setBannerVisible(false)
  }

  if (!mounted) return null

  return (
    <>
      {bannerVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[999] rounded-t-[12px] bg-[#3C3228] px-4 py-4 md:px-8 md:py-5 text-[#F5F0EB] shadow-[0_-8px_32px_rgba(0,0,0,0.15)]"
          role="dialog"
          aria-label="Уведомление о cookie"
        >
          <div className="max-w-container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="font-sans text-sm md:text-[15px] leading-relaxed flex-1">
              Мы используем файлы cookie для корректной работы сайта и улучшения качества обслуживания.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={accept}
                className="min-h-[44px] px-5 rounded-lg bg-[#F5F0EB] text-[#3C3228] font-sans text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Принимаю
              </button>
              <button
                type="button"
                onClick={() => setPolicyOpen(true)}
                className="min-h-[44px] px-5 rounded-lg border border-[#F5F0EB]/40 text-[#F5F0EB] font-sans text-sm font-medium hover:bg-[#F5F0EB]/10 transition-colors"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      )}
      <PrivacyPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  )
}
