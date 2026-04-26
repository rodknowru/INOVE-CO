/** Товар витрины (папки: public/images/products/<имя>/photo-1.*, photo-2.*, описание.docx) */
export type Product = {
  id: string
  name: string
  description: string
  images: [string, string]
  price: string
  priceNum: number
  tag?: 'Бестселлер' | 'Новинка' | 'Премиум'
}
