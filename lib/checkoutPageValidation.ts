// Валидация формы на странице оформления заказа СДЭК

const CYRILLIC_SPACES = /^[а-яёА-ЯЁ\s]+$/
const CYRILLIC_SPACES_HYPHEN = /^[а-яёА-ЯЁ\s\-]+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateFirstName(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (value.trim().length < 2) return 'Минимум 2 символа'
  if (value.length > 50) return 'Максимум 50 символов'
  if (!CYRILLIC_SPACES.test(value)) return 'Только кириллица и пробелы'
  return null
}

export function validateLastName(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (value.trim().length < 2) return 'Минимум 2 символа'
  if (value.length > 50) return 'Максимум 50 символов'
  if (!CYRILLIC_SPACES.test(value)) return 'Только кириллица и пробелы'
  return null
}

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return 'Обязательное поле'
  if (digits.length !== 11 || digits[0] !== '7') return 'Введите номер в формате +7 (XXX) XXX-XX-XX'
  return null
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (value.length > 100) return 'Максимум 100 символов'
  if (!EMAIL_REGEX.test(value.trim())) return 'Введите корректный email'
  return null
}

export function validateCity(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (value.trim().length < 2) return 'Минимум 2 символа'
  if (!CYRILLIC_SPACES_HYPHEN.test(value)) return 'Только кириллица, пробелы и дефис'
  return null
}

export function validatePostcode(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (!/^\d{6}$/.test(value.replace(/\s/g, ''))) return 'Индекс — ровно 6 цифр'
  return null
}

export function validateAddress(value: string): string | null {
  if (!value.trim()) return 'Обязательное поле'
  if (value.trim().length < 10) return 'Минимум 10 символов (улица, дом, квартира)'
  if (value.length > 200) return 'Максимум 200 символов'
  return null
}

export function validateComment(value: string): string | null {
  if (value.length > 500) return 'Максимум 500 символов'
  return null
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return ''
  const withSeven = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits
  const only11 = withSeven.slice(0, 11)
  if (only11.length <= 1) return only11 === '7' ? '+7' : `+7 (${only11.slice(1)}`
  const a = only11.slice(1, 4)
  const b = only11.slice(4, 7)
  const c = only11.slice(7, 9)
  const d = only11.slice(9, 11)
  let out = `+7 (${a}`
  if (only11.length > 4) out += `) ${b}`
  if (only11.length > 7) out += `-${c}`
  if (only11.length > 9) out += `-${d}`
  return out
}
