/** Товар витрины (папки: public/images/products/<имя>/photo-1.*, photo-2.*, *.docx) */
export type Product = {
  id: string
  name: string
  /** Первая строка описания — подзаголовок на карточке */
  subtitle: string
  description: string
  images: [string, string]
  price: string
  priceNum: number
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}
