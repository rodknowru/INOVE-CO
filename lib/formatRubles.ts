/** Формат цены: «1 900 ₽» (пробел как разделитель тысяч). */
export function formatRubles(amount: number): string {
  return `${Math.round(amount).toLocaleString('ru-RU')} ₽`
}
