'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import {
  validateFirstName,
  validateLastName,
  validatePhone,
  validateEmail,
  validateCity,
  validatePostcode,
  validateAddress,
  validateComment,
  formatPhoneInput,
} from '@/lib/checkoutPageValidation'
import { DELIVERY_SERVICES, type DeliveryServiceId } from '@/lib/deliveryOptions'
import CityInput from '@/components/CityInput'
import BrandLogo from '@/components/BrandLogo'
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal'
import { formatRubles } from '@/lib/formatRubles'

type FormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  postcode: string
  address: string
  comment: string
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  postcode: '',
  address: '',
  comment: '',
}

const TELEGRAM_BOT_TOKEN = '8301534329:AAFiXvXHkks4NjOtkg9w1hIWUtk0GiVjdcA'
const TELEGRAM_CHAT_IDS = ['5042609986', '599055804']

export default function CheckoutPageClient() {
  const router = useRouter()
  const { items, totalSum } = useCart()
  const [form, setForm] = useState<FormData>(initialForm)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [deliveryService, setDeliveryService] = useState<DeliveryServiceId>('cdek')
  const [success, setSuccess] = useState<{ orderId: string; city: string; address: string; delivery: DeliveryServiceId } | null>(null)
  const [consentPd, setConsentPd] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)

  const hasHadItems = useRef(items.length > 0)
  useEffect(() => {
    if (items.length > 0) hasHadItems.current = true
  }, [items.length])

  useEffect(() => {
    if (!hasHadItems.current && items.length === 0 && !success) {
      const id = setTimeout(() => {
        if (!hasHadItems.current) router.replace('/')
      }, 300)
      return () => clearTimeout(id)
    }
    if (hasHadItems.current && items.length === 0 && !success) {
      router.replace('/')
    }
  }, [items.length, success, router])

  const errors = {
    firstName: validateFirstName(form.firstName),
    lastName: validateLastName(form.lastName),
    phone: validatePhone(form.phone),
    email: validateEmail(form.email),
    city: validateCity(form.city),
    postcode: validatePostcode(form.postcode),
    address: validateAddress(form.address),
    comment: validateComment(form.comment),
  }

  const isFormValid =
    !errors.firstName &&
    !errors.lastName &&
    !errors.phone &&
    !errors.email &&
    !errors.city &&
    !errors.postcode &&
    !errors.comment &&
    !!form.firstName.trim() &&
    !!form.lastName.trim() &&
    !!form.phone.replace(/\D/g, '').trim() &&
    !!form.email.trim() &&
    !!form.city.trim() &&
    !!form.postcode.trim() &&
    !!form.address.trim() &&
    !errors.address

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    if (field === 'phone') value = formatPhoneInput(value)
    if (field === 'postcode') value = value.replace(/\D/g, '').slice(0, 6)
    setForm((p) => ({ ...p, [field]: value }))
  }, [])

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched((p) => ({ ...p, [field]: true }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid || !consentPd || submitting) return
    setSubmitting(true)

    const orderId = 'INV-' + String(Math.floor(100000 + Math.random() * 900000))

    const itemsText = items
      .map((i) => `\n${i.name} × ${i.quantity} = ${formatRubles(i.priceNum * i.quantity)}`)
      .join('')

    const message = [
      `🛒 <b>Новый заказ #${orderId}</b>`,
      '',
      '👤 <b>Клиент:</b>',
      `Имя: ${form.firstName.trim()} ${form.lastName.trim()}`,
      `Телефон: ${form.phone}`,
      `Email: ${form.email.trim()}`,
      '',
      '📦 <b>Товары:</b>',
      itemsText.trimStart(),
      '',
      `💰 <b>Итого: ${formatRubles(totalSum)}</b>`,
      '',
      `🚚 <b>Доставка:</b> ${DELIVERY_SERVICES[deliveryService].name}`,
      `📍 <b>Адрес:</b> ${form.city.trim()}, ${form.postcode.trim()}, ${form.address.trim()}`,
      '',
      `💬 <b>Комментарий:</b> ${form.comment.trim() || 'нет'}`,
    ].join('\n')

    try {
      const responses = await Promise.all(
        TELEGRAM_CHAT_IDS.map((chatId) =>
          fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              parse_mode: 'HTML',
              text: message,
            }),
          })
        )
      )
      for (const res of responses) {
        const data = await res.json().catch(() => null)
        if (!res.ok || !data?.ok) {
          console.error('Telegram responded with error:', { resStatus: res.status, data })
        }
      }
    } catch (err) {
      console.error('Telegram send error:', err)
    } finally {
      setSuccess({
        orderId,
        city: form.city.trim(),
        address: form.address.trim(),
        delivery: deliveryService,
      })
      setSubmitting(false)
    }
  }

  const inputBase =
    'w-full min-h-[48px] md:h-[56px] md:min-h-[56px] px-4 py-3 md:py-0 rounded-lg border font-sans text-card-brown placeholder:text-charcoal/50 placeholder:text-base md:placeholder:text-[18px] focus:outline-none focus:ring-2 focus:ring-accent-gold/30 transition-colors text-base md:text-[18px]'
  const labelClass = 'block font-sans text-sm md:text-[18px] text-card-brown mb-1'
  const inputError = (hasError: boolean) =>
    hasError ? 'border-error-red focus:border-error-red' : 'border-input-border focus:border-accent-gold'

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center p-4">
        <p className="font-sans text-charcoal">Корзина пуста.</p>
        <Link href="/" className="ml-2 text-accent-gold underline">На главную</Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-warm-cream flex flex-col">
        <header className="p-4 md:p-6 border-b border-charcoal/10">
          <div className="max-w-4xl mx-auto flex items-center justify-center relative min-h-[44px]">
            <BrandLogo size="checkout" href="/" />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-success-green flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-soft-white">✓</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-card-brown mb-2">Заказ оформлен ✓</h1>
            <p className="font-sans text-charcoal text-sm mb-1">Номер заказа</p>
            <p className="font-serif text-xl font-semibold text-accent-gold mb-4">{success.orderId}</p>
            <p className="font-sans text-charcoal text-sm mb-8">
              Доставка {DELIVERY_SERVICES[success.delivery].name} по адресу: {success.city}, {success.address}
            </p>
            <Link
              href="/"
              className="inline-block min-h-[48px] px-8 py-4 rounded-lg bg-card-brown text-soft-white font-sans font-medium hover:bg-accent-gold transition-colors"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <header className="p-4 md:p-6 border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto flex items-center justify-center relative min-h-[48px]">
          <BrandLogo size="checkout" href="/" />
          <Link
            href="/"
            className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-sm md:text-[18px] text-charcoal hover:text-accent-gold transition-colors min-h-[48px] flex items-center max-w-[45%] sm:max-w-none text-right"
          >
            ← Назад
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h3 className="font-sans text-sm font-medium md:text-[24px] md:font-bold text-card-brown mb-3">Способ доставки</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(DELIVERY_SERVICES) as DeliveryServiceId[]).map((id) => {
              const s = DELIVERY_SERVICES[id]
              const selected = deliveryService === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDeliveryService(id)}
                  className={`text-left p-4 md:p-[1.3rem] rounded-lg border-2 transition-all ${
                    selected
                      ? `${s.tailwindBorder} bg-[${s.color}]/10`
                      : 'border-input-border hover:border-charcoal/30'
                  }`}
                  style={selected ? { backgroundColor: `${s.color}14` } : undefined}
                >
                  <p className="font-serif font-semibold md:font-bold text-card-brown text-sm md:text-[22px]">{s.name}</p>
                  <p className="font-sans text-xs md:text-[17px] text-charcoal mt-0.5">{s.subline}</p>
                  <p className="font-sans text-xs md:text-[17px] text-charcoal mt-1">{s.days}</p>
                  <p className="font-sans text-xs md:text-[17px] text-charcoal mt-0.5">{s.price}</p>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-sans text-xs md:text-[16px] text-accent-gold hover:underline mt-2 inline-block"
                  >
                    {s.linkLabel}
                  </a>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-8 lg:gap-12">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Имя <span className="text-error-red">*</span></label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="Иван"
                  maxLength={51}
                  className={`${inputBase} ${inputError(!!(touched.firstName && errors.firstName))}`}
                />
                {touched.firstName && errors.firstName && (
                  <p className="mt-1 font-sans text-xs text-error-red" style={{ fontSize: '12px' }}>{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Фамилия <span className="text-error-red">*</span></label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="Иванов"
                  maxLength={51}
                  className={`${inputBase} ${inputError(!!(touched.lastName && errors.lastName))}`}
                />
                {touched.lastName && errors.lastName && (
                  <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Телефон <span className="text-error-red">*</span></label>
              <input
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="+7 (900) 123-45-67"
                className={`${inputBase} ${inputError(!!(touched.phone && errors.phone))}`}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.phone}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Email <span className="text-error-red">*</span></label>
              <input
                type="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="example@mail.ru"
                maxLength={101}
                className={`${inputBase} ${inputError(!!(touched.email && errors.email))}`}
              />
              {touched.email && errors.email && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.email}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Город <span className="text-error-red">*</span></label>
              <CityInput
                value={form.city}
                onChange={(v) => handleChange('city', v)}
                onSelectSuggestion={(_, postalCode) => {
                  if (postalCode) setForm((p) => ({ ...p, postcode: postalCode.slice(0, 6) }))
                }}
                onBlur={() => handleBlur('city')}
                placeholder="Москва"
                maxLength={100}
                className={`${inputBase} ${inputError(!!(touched.city && errors.city))}`}
                aria-invalid={!!(touched.city && errors.city)}
              />
              {touched.city && errors.city && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.city}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Индекс <span className="text-error-red">*</span></label>
              <input
                type="text"
                inputMode="numeric"
                value={form.postcode}
                onChange={(e) => handleChange('postcode', e.target.value)}
                onBlur={() => handleBlur('postcode')}
                placeholder="101000"
                maxLength={6}
                className={`${inputBase} ${inputError(!!(touched.postcode && errors.postcode))}`}
              />
              {touched.postcode && errors.postcode && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.postcode}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Адрес доставки <span className="text-error-red">*</span></label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                onBlur={() => handleBlur('address')}
                placeholder="ул. Пушкина, д. 10, кв. 5"
                maxLength={201}
                className={`${inputBase} ${inputError(!!(touched.address && errors.address))}`}
              />
              {touched.address && errors.address && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.address}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Комментарий</label>
              <textarea
                value={form.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                onBlur={() => handleBlur('comment')}
                placeholder="Код домофона, время доставки..."
                maxLength={501}
                rows={3}
                className={`${inputBase} resize-none md:h-[120px] md:min-h-[120px] ${inputError(!!(touched.comment && errors.comment))}`}
              />
              {touched.comment && errors.comment && (
                <p className="mt-1 font-sans text-error-red" style={{ fontSize: '12px' }}>{errors.comment}</p>
              )}
              <p className="mt-0.5 font-sans text-xs text-charcoal/70">{form.comment.length}/500</p>
            </div>
          </form>

          <aside className="order-1 lg:order-2">
            <div className="bg-soft-white rounded-xl border border-input-border p-4 md:p-6 sticky top-4">
              <h3 className="font-serif font-semibold text-card-brown mb-4 md:text-[24px] md:font-bold">Ваш заказ</h3>
              <p className="font-sans text-xs md:text-[18px] text-charcoal mb-3">
                Доставка: <span className="font-medium text-card-brown">{DELIVERY_SERVICES[deliveryService].name}</span>
                {form.address.trim() ? ` · ${form.city.trim() ? form.city + ', ' : ''}${form.address}` : ''}
              </p>
              <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-2 text-sm md:text-[18px]">
                    <span className="font-sans text-card-brown truncate">{item.name} × {item.quantity}</span>
                    <span className="font-serif text-card-brown shrink-0">{formatRubles(item.priceNum * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-charcoal text-sm md:text-[28px] md:font-bold border-t border-charcoal/10 pt-4 mb-4">
                Итого:{' '}
                <span className="font-serif text-card-brown md:text-[28px] md:font-bold">{formatRubles(totalSum)}</span>
              </p>
              <div className="mb-4 text-[14px] text-[#8C7E6F] font-sans leading-snug">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentPd}
                    onChange={(e) => setConsentPd(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-input-border text-card-brown focus:ring-accent-gold/30"
                  />
                  <span>
                    Я согласен(а) на обработку персональных данных в соответствии с{' '}
                    <button
                      type="button"
                      onClick={() => setPolicyOpen(true)}
                      className="underline decoration-[#8C7E6F]/50 underline-offset-2 hover:text-card-brown transition-colors text-left"
                    >
                      Политикой конфиденциальности
                    </button>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                form="checkout-form"
                disabled={!isFormValid || !consentPd || submitting}
                className="w-full min-h-[48px] md:h-[56px] md:min-h-[56px] py-4 md:py-0 rounded-lg font-sans font-medium md:text-[18px] uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-charcoal/30 disabled:text-charcoal enabled:bg-card-brown enabled:text-soft-white enabled:hover:bg-accent-gold"
              >
                {submitting ? 'Отправляем...' : 'Подтвердить заказ'}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <PrivacyPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </div>
  )
}
