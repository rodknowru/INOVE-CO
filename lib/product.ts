/** Товар витрины (папки: public/images/products/<имя>/1.*, 2.*, *.docx) */
export type Product = {
  id: string
  name: string
  /** Первая строка описания — подзаголовок на карточке */
  subtitle: string
  description: string
  /** Основное фото (1.*) */
  imageMain: string
  /** Фото при наведении (2.*) */
  imageHover: string
  price: string
  priceNum: number
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}
