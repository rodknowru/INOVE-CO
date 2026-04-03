'use client'

import { motion } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  body: string
  ariaLabel: string
}

/** Единый стиль для политики, оферты и пользовательского соглашения */
export default function LegalDocumentModal({ open, onClose, title, body, ariaLabel }: Props) {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-[rgba(60,50,40,0.5)] backdrop-blur-[4px]"
      aria-modal="true"
      role="dialog"
      aria-label={ariaLabel}
    >
      <div className="w-[95%] sm:w-full max-w-[640px] max-h-[80vh] bg-[#FDFBF8] rounded-2xl shadow-[0_20px_60px_rgba(60,50,40,0.2)] flex flex-col">
        <div className="px-5 sm:px-6 py-4 border-b border-[#D5CBBD] flex items-start justify-between gap-3 shrink-0">
          <h3 className="font-serif text-2xl font-semibold text-[#3C3228]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7E6F] hover:text-[#3C3228] transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 sm:px-6 py-4 overflow-y-auto text-[14px] leading-[1.7] text-[#3C3228] font-sans whitespace-pre-line flex-1 min-h-0">
          {body}
        </div>

        <div className="px-5 sm:px-6 py-5 border-t border-[#D5CBBD] flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 min-h-[48px] rounded-[8px] bg-[#3C3228] text-[#F5F0EB] font-sans text-sm font-medium transition-opacity hover:opacity-90"
          >
            Принимаю
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = 'https://google.com'
            }}
            className="w-1/2 min-h-[48px] rounded-[8px] border border-[#D5CBBD] bg-transparent text-[#8C7E6F] font-sans text-sm font-medium transition-colors hover:bg-[#F5F0EB]"
          >
            Покинуть сайт
          </button>
        </div>
      </div>
    </motion.div>
  )
}
