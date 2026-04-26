/** Краткий текст для карточки — блок до первого двойного переноса (как в превью из .docx) */
export function productCardBlurb(description: string) {
  const first = description.split('\n\n')[0]?.trim() || description.trim()
  return first
}
