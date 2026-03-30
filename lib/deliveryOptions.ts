export type DeliveryServiceId = 'cdek' | 'yandex' | 'pochta'

export const DELIVERY_SERVICES: Record<
  DeliveryServiceId,
  {
    id: DeliveryServiceId
    name: string
    color: string
    tailwindBg: string
    tailwindBorder: string
    tailwindRing: string
    subline: string
    days: string
    price: string
    link: string
    linkLabel: string
    features: string
  }
> = {
  cdek: {
    id: 'cdek',
    name: 'СДЭК',
    color: '#00B33C',
    tailwindBg: 'bg-cdek-green',
    tailwindBorder: 'border-cdek-green',
    tailwindRing: 'ring-cdek-green',
    subline: 'Курьер или пункт выдачи',
    days: '2–10 рабочих дней',
    price: 'от 140 ₽, по тарифам СДЭК',
    link: 'https://www.cdek.ru/calculator',
    linkLabel: 'Рассчитать точную стоимость → cdek.ru/calculator',
    features: 'Страховка включена (3% от объявленной стоимости). 5 000+ пунктов выдачи по России',
  },
  yandex: {
    id: 'yandex',
    name: 'Яндекс.Доставка',
    color: '#FC3F1D',
    tailwindBg: 'bg-yandex-red',
    tailwindBorder: 'border-yandex-red',
    tailwindRing: 'ring-yandex-red',
    subline: 'Экспресс и стандарт',
    days: '1–7 рабочих дней',
    price: 'рассчитывается автоматически при оформлении',
    link: 'https://dostavka.yandex.ru',
    linkLabel: 'Подробнее → dostavka.yandex.ru',
    features: 'Быстрая доставка в крупных городах',
  },
  pochta: {
    id: 'pochta',
    name: 'Почта России',
    color: '#005BAC',
    tailwindBg: 'bg-pochta-blue',
    tailwindBorder: 'border-pochta-blue',
    tailwindRing: 'ring-pochta-blue',
    subline: 'Посылка стандарт или EMS',
    days: '5–14 дней (стандарт), 2–5 дней (EMS)',
    price: 'от 300 ₽ (посылка), от 500 ₽ (EMS)',
    link: 'https://www.pochta.ru/parcels',
    linkLabel: 'Рассчитать → pochta.ru/parcels',
    features: 'Доставка в любой населённый пункт России, включая отдалённые',
  },
}
