// TODO: заменить моковые данные на реальный API СДЭК/Яндекс/Почта

export type PvzService = 'cdek' | 'yandex' | 'pochta'

export type PvzPoint = {
  id: string
  service: PvzService
  city: string
  name: string
  address: string
  hours: string
  lat: number
  lng: number
}

// Центры городов [lat, lng] для fallback (Leaflet использует Nominatim для геокодинга)
export const CITY_CENTERS: Record<string, [number, number]> = {
  'москва': [55.7558, 37.6173],
  'санкт-петербург': [59.9343, 30.3351],
  'новосибирск': [55.0084, 82.9357],
  'екатеринбург': [56.8389, 60.6057],
  'казань': [55.7887, 49.1221],
}

function normalizeCity(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function getCityCenter(city: string): [number, number] | null {
  const key = normalizeCity(city)
  return CITY_CENTERS[key] ?? null
}

export function filterPvzByCity(pvzList: PvzPoint[], city: string): PvzPoint[] {
  const normalized = normalizeCity(city)
  return pvzList.filter((p) => normalizeCity(p.city) === normalized)
}

/** Проверяет, есть ли в моках ПВЗ для этого города (любая служба) */
export function hasPvzForCity(city: string): boolean {
  const normalized = normalizeCity(city)
  return PVZ_MOCK.some((p) => normalizeCity(p.city) === normalized)
}

export const PVZ_MOCK: PvzPoint[] = [
  // Москва (центр: 55.7558, 37.6173) — СДЭК
  { id: 'cdek_msk_01', service: 'cdek', city: 'Москва', name: 'СДЭК — Тверская', address: 'ул. Тверская, д. 15, стр. 2', hours: 'Пн–Вс: 10:00–21:00', lat: 55.7644, lng: 37.6055 },
  { id: 'cdek_msk_02', service: 'cdek', city: 'Москва', name: 'СДЭК — Арбат', address: 'ул. Арбат, д. 23', hours: 'Пн–Сб: 09:00–20:00', lat: 55.7522, lng: 37.6230 },
  { id: 'cdek_msk_03', service: 'cdek', city: 'Москва', name: 'СДЭК — Кузнецкий мост', address: 'ул. Кузнецкий Мост, д. 7', hours: 'Пн–Пт: 10:00–19:00', lat: 55.7415, lng: 37.6290 },
  { id: 'cdek_msk_04', service: 'cdek', city: 'Москва', name: 'СДЭК — Маяковская', address: 'ул. Большая Садовая, д. 10', hours: 'Пн–Вс: 08:00–22:00', lat: 55.7710, lng: 37.5950 },
  { id: 'cdek_msk_05', service: 'cdek', city: 'Москва', name: 'СДЭК — Комсомольская', address: 'Комсомольская пл., д. 2', hours: 'Пн–Вс: 00:00–24:00', lat: 55.7340, lng: 37.5870 },
  // Москва — Яндекс
  { id: 'yandex_msk_01', service: 'yandex', city: 'Москва', name: 'Яндекс — Тверская', address: 'Тверская ул., д. 12', hours: 'Пн–Вс: 10:00–22:00', lat: 55.7600, lng: 37.6150 },
  { id: 'yandex_msk_02', service: 'yandex', city: 'Москва', name: 'Яндекс — Пушкинская', address: 'ул. Тверская, д. 18', hours: 'Пн–Вс: 09:00–21:00', lat: 55.7480, lng: 37.6310 },
  { id: 'yandex_msk_03', service: 'yandex', city: 'Москва', name: 'Яндекс — Лубянка', address: 'ул. Лубянка, д. 5', hours: 'Пн–Пт: 10:00–20:00', lat: 55.7550, lng: 37.5990 },
  { id: 'yandex_msk_04', service: 'yandex', city: 'Москва', name: 'Яндекс — Киевская', address: 'пл. Киевского Вокзала, д. 1', hours: 'Пн–Вс: 08:00–23:00', lat: 55.7690, lng: 37.6380 },
  { id: 'yandex_msk_05', service: 'yandex', city: 'Москва', name: 'Яндекс — Белорусская', address: 'ул. Грузинский Вал, д. 9', hours: 'Пн–Сб: 09:00–21:00', lat: 55.7370, lng: 37.6110 },
  // Москва — Почта России
  { id: 'pochta_msk_01', service: 'pochta', city: 'Москва', name: 'ОПС Москва 101000', address: 'ул. Мясницкая, д. 26', hours: 'Пн–Пт: 08:00–20:00, Сб: 09:00–18:00', lat: 55.7580, lng: 37.6250 },
  { id: 'pochta_msk_02', service: 'pochta', city: 'Москва', name: 'ОПС Москва 109004', address: 'ул. Старая Басманная, д. 20', hours: 'Пн–Пт: 08:00–19:00', lat: 55.7460, lng: 37.6100 },
  { id: 'pochta_msk_03', service: 'pochta', city: 'Москва', name: 'ОПС Москва 127006', address: 'ул. Тверская, д. 9', hours: 'Пн–Вс: 09:00–21:00', lat: 55.7700, lng: 37.6050 },
  { id: 'pochta_msk_04', service: 'pochta', city: 'Москва', name: 'ОПС Москва 115184', address: 'ул. Большая Татарская, д. 42', hours: 'Пн–Сб: 08:00–20:00', lat: 55.7390, lng: 37.6200 },
  { id: 'pochta_msk_05', service: 'pochta', city: 'Москва', name: 'ОПС Москва 119021', address: 'пр. Мичуринский, д. 19', hours: 'Пн–Пт: 09:00–18:00', lat: 55.7530, lng: 37.5920 },
  // Санкт-Петербург (центр: 59.9343, 30.3351) — СДЭК
  { id: 'cdek_spb_01', service: 'cdek', city: 'Санкт-Петербург', name: 'СДЭК — Невский', address: 'Невский пр., д. 88', hours: 'Пн–Вс: 10:00–22:00', lat: 59.9380, lng: 30.3150 },
  { id: 'cdek_spb_02', service: 'cdek', city: 'Санкт-Петербург', name: 'СДЭК — Лиговский', address: 'Лиговский пр., д. 50', hours: 'Пн–Сб: 09:00–21:00', lat: 59.9270, lng: 30.3440 },
  { id: 'cdek_spb_03', service: 'cdek', city: 'Санкт-Петербург', name: 'СДЭК — Владимирская', address: 'ул. Достоевского, д. 19', hours: 'Пн–Пт: 10:00–19:00', lat: 59.9400, lng: 30.3580 },
  { id: 'cdek_spb_04', service: 'cdek', city: 'Санкт-Петербург', name: 'СДЭК — Площадь Восстания', address: 'ул. Восстания, д. 1', hours: 'Пн–Вс: 08:00–23:00', lat: 59.9310, lng: 30.3200 },
  { id: 'cdek_spb_05', service: 'cdek', city: 'Санкт-Петербург', name: 'СДЭК — Московский вокзал', address: 'Невский пр., д. 85', hours: 'Пн–Вс: 00:00–24:00', lat: 59.9460, lng: 30.3300 },
  // Санкт-Петербург — Яндекс
  { id: 'yandex_spb_01', service: 'yandex', city: 'Санкт-Петербург', name: 'Яндекс — Невский', address: 'Невский пр., д. 100', hours: 'Пн–Вс: 10:00–21:00', lat: 59.9350, lng: 30.3250 },
  { id: 'yandex_spb_02', service: 'yandex', city: 'Санкт-Петербург', name: 'Яндекс — Гостиный двор', address: 'Невский пр., д. 35', hours: 'Пн–Вс: 10:00–22:00', lat: 59.9290, lng: 30.3500 },
  { id: 'yandex_spb_03', service: 'yandex', city: 'Санкт-Петербург', name: 'Яндекс — Маяковская', address: 'ул. Пушкинская, д. 12', hours: 'Пн–Сб: 09:00–20:00', lat: 59.9420, lng: 30.3100 },
  { id: 'yandex_spb_04', service: 'yandex', city: 'Санкт-Петербург', name: 'Яндекс — Сенная', address: 'Сенная пл., д. 5', hours: 'Пн–Вс: 08:00–22:00', lat: 59.9330, lng: 30.3600 },
  { id: 'yandex_spb_05', service: 'yandex', city: 'Санкт-Петербург', name: 'Яндекс — Площадь Восстания', address: 'Невский пр., д. 85', hours: 'Пн–Вс: 09:00–21:00', lat: 59.9370, lng: 30.3400 },
  // Санкт-Петербург — Почта России
  { id: 'pochta_spb_01', service: 'pochta', city: 'Санкт-Петербург', name: 'ОПС Санкт-Петербург 190000', address: 'Почтамтская ул., д. 9', hours: 'Пн–Пт: 08:00–20:00', lat: 59.9360, lng: 30.3350 },
  { id: 'pochta_spb_02', service: 'pochta', city: 'Санкт-Петербург', name: 'ОПС Санкт-Петербург 191186', address: 'Невский пр., д. 32', hours: 'Пн–Сб: 09:00–19:00', lat: 59.9280, lng: 30.3180 },
  { id: 'pochta_spb_03', service: 'pochta', city: 'Санкт-Петербург', name: 'ОПС Санкт-Петербург 191002', address: 'Лиговский пр., д. 43', hours: 'Пн–Пт: 08:00–19:00', lat: 59.9440, lng: 30.3420 },
  { id: 'pochta_spb_04', service: 'pochta', city: 'Санкт-Петербург', name: 'ОПС Санкт-Петербург 190031', address: 'ул. Достоевского, д. 15', hours: 'Пн–Сб: 09:00–18:00', lat: 59.9300, lng: 30.3280 },
  { id: 'pochta_spb_05', service: 'pochta', city: 'Санкт-Петербург', name: 'ОПС Санкт-Петербург 191025', address: 'Невский пр., д. 72', hours: 'Пн–Пт: 08:00–20:00', lat: 59.9390, lng: 30.3550 },
  // Новосибирск (центр: 55.0084, 82.9357) — по 4 точки на службу, радиус ~0.01–0.02
  { id: 'cdek_nsk_01', service: 'cdek', city: 'Новосибирск', name: 'СДЭК — Красный проспект', address: 'Красный пр., д. 77', hours: 'Пн–Вс: 10:00–20:00', lat: 55.0184, lng: 82.9357 },
  { id: 'cdek_nsk_02', service: 'cdek', city: 'Новосибирск', name: 'СДЭК — Площадь Ленина', address: 'пл. Ленина, д. 2', hours: 'Пн–Сб: 09:00–21:00', lat: 55.0084, lng: 82.9457 },
  { id: 'cdek_nsk_03', service: 'cdek', city: 'Новосибирск', name: 'СДЭК — Советская', address: 'ул. Советская, д. 52', hours: 'Пн–Пт: 10:00–19:00', lat: 55.9984, lng: 82.9257 },
  { id: 'cdek_nsk_04', service: 'cdek', city: 'Новосибирск', name: 'СДЭК — Вокзальная', address: 'ул. Вокзальная магистраль, д. 16', hours: 'Пн–Вс: 08:00–22:00', lat: 55.0284, lng: 82.9280 },
  { id: 'yandex_nsk_01', service: 'yandex', city: 'Новосибирск', name: 'Яндекс — Центр', address: 'ул. Советская, д. 52', hours: 'Пн–Вс: 09:00–21:00', lat: 55.0124, lng: 82.9380 },
  { id: 'yandex_nsk_02', service: 'yandex', city: 'Новосибирск', name: 'Яндекс — Красный пр.', address: 'Красный пр., д. 82', hours: 'Пн–Сб: 10:00–20:00', lat: 55.0044, lng: 82.9320 },
  { id: 'yandex_nsk_03', service: 'yandex', city: 'Новосибирск', name: 'Яндекс — Площадь Ленина', address: 'пл. Ленина', hours: 'Пн–Вс: 09:00–21:00', lat: 55.0164, lng: 82.9420 },
  { id: 'yandex_nsk_04', service: 'yandex', city: 'Новосибирск', name: 'Яндекс — Железнодорожный вокзал', address: 'ул. Шевченко, д. 2', hours: 'Пн–Вс: 08:00–23:00', lat: 55.0064, lng: 82.9180 },
  { id: 'pochta_nsk_01', service: 'pochta', city: 'Новосибирск', name: 'ОПС Новосибирск 630099', address: 'ул. Советская, д. 33', hours: 'Пн–Пт: 08:00–19:00', lat: 55.0104, lng: 82.9280 },
  { id: 'pochta_nsk_02', service: 'pochta', city: 'Новосибирск', name: 'ОПС Новосибирск 630004', address: 'Красный пр., д. 25', hours: 'Пн–Сб: 09:00–18:00', lat: 55.0024, lng: 82.9220 },
  { id: 'pochta_nsk_03', service: 'pochta', city: 'Новосибирск', name: 'ОПС Новосибирск 630007', address: 'ул. Ленина, д. 3', hours: 'Пн–Пт: 08:00–20:00', lat: 55.0144, lng: 82.9350 },
  { id: 'pochta_nsk_04', service: 'pochta', city: 'Новосибирск', name: 'ОПС Новосибирск 630015', address: 'ул. Димитрова, д. 1', hours: 'Пн–Сб: 09:00–17:00', lat: 55.0064, lng: 82.9480 },
  // Екатеринбург (центр: 56.8389, 60.6057) — по 4 точки
  { id: 'cdek_ekb_01', service: 'cdek', city: 'Екатеринбург', name: 'СДЭК — Ленина', address: 'ул. Ленина, д. 52', hours: 'Пн–Вс: 10:00–20:00', lat: 56.8489, lng: 60.6057 },
  { id: 'cdek_ekb_02', service: 'cdek', city: 'Екатеринбург', name: 'СДЭК — Малышева', address: 'ул. Малышева, д. 36', hours: 'Пн–Сб: 09:00–21:00', lat: 56.8389, lng: 60.6157 },
  { id: 'cdek_ekb_03', service: 'cdek', city: 'Екатеринбург', name: 'СДЭК — 8 Марта', address: 'ул. 8 Марта, д. 46', hours: 'Пн–Пт: 10:00–19:00', lat: 56.8289, lng: 60.5957 },
  { id: 'cdek_ekb_04', service: 'cdek', city: 'Екатеринбург', name: 'СДЭК — Белинского', address: 'ул. Белинского, д. 83', hours: 'Пн–Вс: 08:00–22:00', lat: 56.8439, lng: 60.6107 },
  { id: 'yandex_ekb_01', service: 'yandex', city: 'Екатеринбург', name: 'Яндекс — Центр', address: 'ул. 8 Марта, д. 46', hours: 'Пн–Вс: 09:00–21:00', lat: 56.8409, lng: 60.6087 },
  { id: 'yandex_ekb_02', service: 'yandex', city: 'Екатеринбург', name: 'Яндекс — Ленина', address: 'ул. Ленина, д. 41', hours: 'Пн–Сб: 09:00–20:00', lat: 56.8369, lng: 60.6027 },
  { id: 'yandex_ekb_03', service: 'yandex', city: 'Екатеринбург', name: 'Яндекс — Малышева', address: 'ул. Малышева, д. 52', hours: 'Пн–Вс: 10:00–22:00', lat: 56.8329, lng: 60.6187 },
  { id: 'yandex_ekb_04', service: 'yandex', city: 'Екатеринбург', name: 'Яндекс — Площадь 1905 года', address: 'ул. Хохрякова, д. 10', hours: 'Пн–Вс: 08:00–23:00', lat: 56.8449, lng: 60.6007 },
  { id: 'pochta_ekb_01', service: 'pochta', city: 'Екатеринбург', name: 'ОПС Екатеринбург 620014', address: 'ул. Ленина, д. 39', hours: 'Пн–Пт: 08:00–20:00', lat: 56.8379, lng: 60.6047 },
  { id: 'pochta_ekb_02', service: 'pochta', city: 'Екатеринбург', name: 'ОПС Екатеринбург 620026', address: 'ул. Малышева, д. 78', hours: 'Пн–Сб: 09:00–18:00', lat: 56.8359, lng: 60.6127 },
  { id: 'pochta_ekb_03', service: 'pochta', city: 'Екатеринбург', name: 'ОПС Екатеринбург 620075', address: 'ул. 8 Марта, д. 202', hours: 'Пн–Пт: 08:00–19:00', lat: 56.8419, lng: 60.5987 },
  { id: 'pochta_ekb_04', service: 'pochta', city: 'Екатеринбург', name: 'ОПС Екатеринбург 620014', address: 'ул. Белинского, д. 76', hours: 'Пн–Сб: 09:00–17:00', lat: 56.8319, lng: 60.6087 },
  // Казань (центр: 55.7887, 49.1221) — по 4 точки
  { id: 'cdek_kzn_01', service: 'cdek', city: 'Казань', name: 'СДЭК — Баумана', address: 'ул. Баумана, д. 58', hours: 'Пн–Вс: 10:00–21:00', lat: 55.7887, lng: 49.1221 },
  { id: 'cdek_kzn_02', service: 'cdek', city: 'Казань', name: 'СДЭК — Кремлёвская', address: 'ул. Кремлёвская, д. 15', hours: 'Пн–Сб: 09:00–20:00', lat: 55.7987, lng: 49.1188 },
  { id: 'cdek_kzn_03', service: 'cdek', city: 'Казань', name: 'СДЭК — Пушкина', address: 'ул. Пушкина, д. 52', hours: 'Пн–Пт: 10:00–19:00', lat: 55.7787, lng: 49.1321 },
  { id: 'cdek_kzn_04', service: 'cdek', city: 'Казань', name: 'СДЭК — Декабристов', address: 'ул. Декабристов, д. 85', hours: 'Пн–Вс: 08:00–22:00', lat: 55.7927, lng: 49.1121 },
  { id: 'yandex_kzn_01', service: 'yandex', city: 'Казань', name: 'Яндекс — Баумана', address: 'ул. Баумана, д. 44', hours: 'Пн–Вс: 09:00–22:00', lat: 55.7895, lng: 49.1205 },
  { id: 'yandex_kzn_02', service: 'yandex', city: 'Казань', name: 'Яндекс — Кремлёвская', address: 'ул. Кремлёвская, д. 18', hours: 'Пн–Сб: 09:00–21:00', lat: 55.7857, lng: 49.1251 },
  { id: 'yandex_kzn_03', service: 'yandex', city: 'Казань', name: 'Яндекс — Площадь Тукая', address: 'пл. Тукая', hours: 'Пн–Вс: 10:00–21:00', lat: 55.7937, lng: 49.1181 },
  { id: 'yandex_kzn_04', service: 'yandex', city: 'Казань', name: 'Яндекс — Петербургская', address: 'ул. Петербургская, д. 52', hours: 'Пн–Вс: 08:00–23:00', lat: 55.7817, lng: 49.1281 },
  { id: 'pochta_kzn_01', service: 'pochta', city: 'Казань', name: 'ОПС Казань 420111', address: 'ул. Кремлёвская, д. 8', hours: 'Пн–Пт: 08:00–19:00', lat: 55.7922, lng: 49.1158 },
  { id: 'pochta_kzn_02', service: 'pochta', city: 'Казань', name: 'ОПС Казань 420015', address: 'ул. Баумана, д. 62', hours: 'Пн–Сб: 09:00–18:00', lat: 55.7875, lng: 49.1242 },
  { id: 'pochta_kzn_03', service: 'pochta', city: 'Казань', name: 'ОПС Казань 420034', address: 'ул. Пушкина, д. 66', hours: 'Пн–Пт: 08:00–20:00', lat: 55.7847, lng: 49.1198 },
  { id: 'pochta_kzn_04', service: 'pochta', city: 'Казань', name: 'ОПС Казань 420107', address: 'ул. Декабристов, д. 143', hours: 'Пн–Сб: 09:00–17:00', lat: 55.7967, lng: 49.1108 },
]
