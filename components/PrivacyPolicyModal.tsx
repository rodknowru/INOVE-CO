'use client'

import { motion } from 'framer-motion'

const POLICY_TEXT = `Политика конфиденциальности
Дата последнего обновления: 21 марта 2026 г.

1. Общие положения

Настоящая Политика конфиденциальности (далее — Политика) действует в отношении всей информации, которую интернет-магазин INOVECO (далее — Оператор) может получить о Пользователе во время использования сайта.

Оформление заказа на сайте означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки персональных данных.

2. Персональные данные, которые мы собираем

При оформлении заказа мы запрашиваем:
— Имя и фамилию
— Номер телефона
— Адрес электронной почты
— Город, почтовый индекс и адрес доставки
— Комментарий к заказу (по желанию)

Мы не собираем и не храним данные банковских карт. Оплата осуществляется через защищённые платёжные системы.

3. Цели обработки персональных данных

Персональные данные Пользователя обрабатываются в следующих целях:
— Оформление и доставка заказа
— Связь с Пользователем для подтверждения заказа
— Отправка уведомлений о статусе заказа
— Улучшение качества обслуживания

4. Правовые основания обработки

Обработка персональных данных осуществляется в соответствии с:
— Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»
— Федеральным законом от 13.03.2006 № 38-ФЗ «О рекламе»
— Законом РФ от 07.02.1992 № 2300-1 «О защите прав потребителей»
— Постановлением Правительства РФ от 15.09.2008 № 687

5. Защита персональных данных

Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.

6. Передача данных третьим лицам

Персональные данные Пользователя могут быть переданы:
— Службам доставки (СДЭК, Яндекс.Доставка, Почта России) — для доставки заказа
— Платёжным системам — для обработки оплаты

Данные не передаются третьим лицам в рекламных целях.

7. Хранение данных

Персональные данные хранятся не дольше, чем этого требуют цели их обработки. По завершении обработки данные уничтожаются.

8. Права пользователя

Пользователь имеет право:
— Получить информацию об обработке своих персональных данных
— Потребовать уточнения, блокирования или уничтожения данных
— Отозвать согласие на обработку персональных данных

Для реализации указанных прав обратитесь через сообщения в Instagram (@inoveco_) или ВКонтакте (vk.ru/inoveco)

9. Файлы cookie

Сайт может использовать файлы cookie для корректной работы корзины и улучшения пользовательского опыта. Пользователь может отключить cookie в настройках браузера.

10. Изменение Политики

Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия размещена на данной странице.

Контактная информация:
INOVECO
Instagram: @inoveco_
ВКонтакте: vk.ru/inoveco`

type Props = {
  open: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-[rgba(60,50,40,0.5)] backdrop-blur-[4px]"
      aria-modal="true"
      role="dialog"
      aria-label="Политика конфиденциальности"
    >
      <div className="w-[95%] sm:w-full max-w-[640px] max-h-[80vh] bg-[#FDFBF8] rounded-2xl shadow-[0_20px_60px_rgba(60,50,40,0.2)] flex flex-col">
        <div className="px-5 sm:px-6 py-4 border-b border-[#D5CBBD] flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold text-[#3C3228]">Политика конфиденциальности</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7E6F] hover:text-[#3C3228] transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 sm:px-6 py-4 overflow-y-auto text-[14px] leading-[1.7] text-[#3C3228] font-sans whitespace-pre-line">
          {POLICY_TEXT}
        </div>

        <div className="px-5 sm:px-6 py-5 border-t border-[#D5CBBD] flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 min-h-[48px] rounded-[8px] bg-[#3C3228] text-[#F5F0EB] font-sans text-sm font-medium transition-opacity hover:opacity-90"
          >
            Принимаю
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = 'https://google.com'
            }}
            className="w-1/2 min-h-[48px] rounded-[8px] border border-[#D5CBBD] bg-transparent text-[#8C7E6F] font-sans text-sm font-medium transition-colors hover:bg-[#F5F0EB]"
          >
            Покинуть сайт
          </button>
        </div>
      </div>
    </motion.div>
  )
}
