'use client'

import LegalDocumentModal from './LegalDocumentModal'
import { COMPANY_CARD_TEXT } from '@/lib/legalTexts'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CompanyRequisitesModal({ open, onClose }: Props) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      title="Реквизиты продавца"
      body={COMPANY_CARD_TEXT}
      ariaLabel="Реквизиты продавца"
      footerActions="close-only"
    />
  )
}
