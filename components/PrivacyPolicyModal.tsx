'use client'

import LegalDocumentModal from './LegalDocumentModal'
import { POLICY_TEXT } from '@/lib/legalTexts'

type Props = {
  open: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ open, onClose }: Props) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      title="Политика конфиденциальности"
      body={POLICY_TEXT}
      ariaLabel="Политика конфиденциальности"
    />
  )
}
