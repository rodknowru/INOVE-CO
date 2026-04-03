'use client'

import LegalDocumentModal from './LegalDocumentModal'
import { PUBLIC_OFFER_TEXT } from '@/lib/legalTexts'

type Props = {
  open: boolean
  onClose: () => void
}

export default function PublicOfferModal({ open, onClose }: Props) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      title="Публичная оферта"
      body={PUBLIC_OFFER_TEXT}
      ariaLabel="Публичная оферта"
    />
  )
}
