'use client'

import { useState, useCallback } from 'react'
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateCity,
  validateAddress,
  validatePostcode,
  validateComment,
  formatPhoneInput,
} from '@/lib/checkoutValidation'
import { formatRubles } from '@/lib/formatRubles'

export type CheckoutFormData = {
  fullName: string
  phone: string
  email: string
  city: string
  address: string
  postcode: string
  comment: string
}

type CheckoutFormProps = {
  totalSum: number
  onSuccess: (orderId: string) => void
  onBack: () => void
}

const initialValues: CheckoutFormData = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  postcode: '',
  comment: '',
}

export default function CheckoutForm({ totalSum, onSuccess, onBack }: CheckoutFormProps) {
  const [values, setValues] = useState<CheckoutFormData>(initialValues)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)

  const errors = {
    fullName: validateFullName(values.fullName),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    city: validateCity(values.city),
    address: validateAddress(values.address),
    postcode: validatePostcode(values.postcode),
    comment: validateComment(values.comment),
  }

  const isFormValid =
    !errors.fullName &&
    !errors.phone &&
    !errors.email &&
    !errors.city &&
    !errors.address &&
    !errors.postcode &&
    !errors.comment &&
    !!values.fullName.trim() &&
    !!values.phone.replace(/\D/g, '').trim() &&
    !!values.email.trim() &&
    !!values.city.trim() &&
    !!values.address.trim() &&
    !!values.postcode.trim()

  const handleChange = useCallback((field: keyof CheckoutFormData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneInput(value)
    }
    if (field === 'postcode') {
      value = value.replace(/\D/g, '').slice(0, 6)
    }
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleBlur = useCallback((field: keyof CheckoutFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid || submitting) return
    setSubmitting(true)
    const orderId = 'INV-' + Math.random().toString(36).slice(2, 10).toUpperCase()
    setTimeout(() => {
      onSuccess(orderId)
      setSubmitting(false)
    }, 400)
  }

  const inputBase =
    'w-full px-4 py-3 rounded-lg border font-sans text-card-brown placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 transition-colors'

  const inputBorder = (hasError: boolean) =>
    hasError ? 'border-red-500 focus:border-red-500' : 'border-input-border focus:border-accent-gold'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 font-sans text-sm text-charcoal hover:text-accent-gold mb-4 -mx-1"
      >
        <span>←</span> Назад к корзине
      </button>
      <div className="flex items-center gap-3 pb-4 border-b border-charcoal/10">
        <div className="w-12 h-12 rounded-lg bg-[#006633] flex items-center justify-center shrink-0">
          <span className="font-sans font-bold text-white text-lg">СДЭК</span>
        </div>
        <div>
          <p className="font-serif font-semibold text-card-brown">Доставка СДЭК</p>
          <p className="font-sans text-charcoal text-xs">Заполните данные для отправки</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            ФИО <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            placeholder="Иванов Иван"
            maxLength={101}
            className={`${inputBase} ${inputBorder(!!(touched.fullName && errors.fullName))}`}
          />
          {touched.fullName && errors.fullName && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+7 (___) ___-__-__"
            className={`${inputBase} ${inputBorder(!!(touched.phone && errors.phone))}`}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="email@example.com"
            maxLength={101}
            className={`${inputBase} ${inputBorder(!!(touched.email && errors.email))}`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            Город <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.city}
            onChange={(e) => handleChange('city', e.target.value)}
            onBlur={() => handleBlur('city')}
            placeholder="Москва"
            maxLength={100}
            className={`${inputBase} ${inputBorder(!!(touched.city && errors.city))}`}
          />
          {touched.city && errors.city && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            Адрес доставки СДЭК <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            placeholder="Улица, дом, квартира"
            maxLength={201}
            className={`${inputBase} ${inputBorder(!!(touched.address && errors.address))}`}
          />
          {touched.address && errors.address && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">
            Индекс <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={values.postcode}
            onChange={(e) => handleChange('postcode', e.target.value)}
            onBlur={() => handleBlur('postcode')}
            placeholder="123456"
            maxLength={6}
            className={`${inputBase} ${inputBorder(!!(touched.postcode && errors.postcode))}`}
          />
          {touched.postcode && errors.postcode && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.postcode}</p>
          )}
        </div>

        <div>
          <label className="block font-sans text-sm text-card-brown mb-1">Комментарий к заказу</label>
          <textarea
            value={values.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
            onBlur={() => handleBlur('comment')}
            placeholder="Необязательно"
            maxLength={501}
            rows={3}
            className={`${inputBase} resize-none ${inputBorder(!!(touched.comment && errors.comment))}`}
          />
          {touched.comment && errors.comment && (
            <p className="mt-1 font-sans text-xs text-red-500">{errors.comment}</p>
          )}
          <p className="mt-0.5 font-sans text-xs text-charcoal/70">{values.comment.length}/500</p>
        </div>
      </div>

      <div className="pt-4 border-t border-charcoal/10 space-y-3">
        <p className="font-sans text-charcoal text-sm">
          Итого: <span className="font-serif font-semibold text-card-brown text-lg">{formatRubles(totalSum)}</span>
        </p>
        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className="w-full py-4 rounded-lg font-sans font-medium uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-card-brown enabled:text-soft-white enabled:hover:bg-accent-gold disabled:bg-charcoal/30 disabled:text-charcoal"
        >
          {submitting ? 'Оформление...' : 'Подтвердить заказ'}
        </button>
      </div>
    </form>
  )
}
