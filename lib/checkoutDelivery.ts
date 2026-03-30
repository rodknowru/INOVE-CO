import type { DeliveryServiceId } from '@/lib/deliveryOptions'

/** Выбранный ПВЗ (СДЭК виджет или Почта России через Dadata) — общий формат для сводки заказа */
export type SelectedPvz = {
  id: string
  service: DeliveryServiceId
  name: string
  address: string
  hours: string
}

// TODO: получить бесплатный ключ на https://dadata.ru/api/suggest/postal_unit/
export const DADATA_API_KEY = process.env.NEXT_PUBLIC_DADATA_API_KEY ?? ''
