'use client'

import LegalDocumentModal from './LegalDocumentModal'
import { USER_AGREEMENT_TEXT } from '@/lib/legalTexts'

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserAgreementModal({ open, onClose }: Props) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      title="Пользовательское соглашение"
      body={USER_AGREEMENT_TEXT}
      ariaLabel="Пользовательское соглашение"
    />
  )
}
