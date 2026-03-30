'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'

export default function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-dark-brown text-soft-white pt-12 md:pt-20 pb-8 md:pb-10 px-4 md:px-12"
    >
      <div className="max-w-container mx-auto">
        {/* Десктоп: одна горизонтальная линия; Мобайл: столбик по центру */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 pb-6">
          {/* Left: logo + slogan in one line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-end justify-center md:justify-start gap-4"
          >
            <BrandLogo size="footer" variant="onDark" href="/" />
          </motion.div>

          {/* Right: socials + subscribe (desktop in one row) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end gap-4"
          >
            <div className="flex items-center justify-center md:justify-end gap-4">
              <a
                href="https://www.instagram.com/inoveco_?igsh=Yng5ZTU3Z29pbGtu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-soft-white hover:text-amber-accent hover:rotate-12 transition-all duration-200"
              >
                <svg className="w-[43px] h-[43px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://vk.ru/inoveco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="text-soft-white hover:text-amber-accent hover:rotate-12 transition-all duration-200"
              >
                <svg className="w-[43px] h-[43px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.61c-.61 0-.8-.49-1.9-1.61-1.11-1.11-1.61-1.26-1.88-1.26-.38 0-.49.11-.49.64v1.47c0 .46-.14.73-1.35.73-2 0-4.21-1.21-5.77-3.47C3.53 9.87 3 8.07 3 7.73c0-.27.11-.52.64-.52h1.61c.48 0 .66.21.84.73.93 2.68 2.48 5.03 3.12 5.03.24 0 .35-.11.35-.71V9.85c-.07-1.24-.73-1.35-.73-1.79 0-.21.17-.42.45-.42h2.53c.39 0 .53.21.53.69v3.14c0 .39.17.53.28.53.24 0 .43-.14.87-.58 1.35-1.51 2.31-3.84 2.31-3.84.13-.27.35-.52.83-.52h1.61c.48 0 .59.25.48.69-.2.91-2.15 3.68-2.15 3.68-.17.28-.24.4 0 .71.17.23.73.71 1.11 1.14.7.79 1.24 1.45 1.38 1.91.15.46-.07.69-.55.69z"/>
                </svg>
              </a>
            </div>

            <div className="w-full max-w-[420px] md:max-w-[520px]">
              <label htmlFor="newsletter-email" className="sr-only">Ваш email для рассылки</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Ваш email"
                  className="w-full h-[56px] px-4 bg-transparent border border-soft-white/30 text-[15px] md:text-[17px] placeholder-soft-white/50 focus:outline-none focus:border-amber-accent"
                  aria-label="Подписка на рассылку"
                />
                <button
                  type="button"
                  onClick={() => alert('Подписка — скоро!')}
                  className="w-full sm:w-auto sm:min-w-[200px] h-[56px] px-5 border border-soft-white text-[15px] md:text-[17px] uppercase tracking-wider hover:bg-soft-white hover:text-dark-brown transition-colors"
                >
                  ПОДПИСАТЬСЯ
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-soft-white/20 pt-6 text-center">
          <p className="text-[13px] md:text-[15px] text-soft-white/70">
            © 2026 INOVECO •{' '}
            <button
              type="button"
              onClick={() => setIsPolicyOpen(true)}
              className="underline decoration-soft-white/40 underline-offset-2 hover:text-soft-white transition-colors"
            >
              Политика конфиденциальности
            </button>{' '}
            • Условия
          </p>
        </div>
      </div>

      {isPolicyOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-[rgba(60,50,40,0.5)] backdrop-blur-[4px]"
          aria-modal="true"
          role="dialog"
          aria-label="Политика конфиденциальности"
        >
          <div className="w-[95%] sm:w-full max-w-[640px] max-h-[80vh] bg-[#FDFBF8] rounded-2xl shadow-[0_20px_60px_rgba(60,50,40,0.2)] flex flex-col">
            <div className="px-5 sm:px-6 py-4 border-b border-[#D5CBBD] flex items-start justify-between gap-3">
              <h3 className="font-serif text-2xl font-semibold text-[#3C3228]">
                Политика конфиденциальности
              </h3>
              <button
                type="button"
                onClick={() => setIsPolicyOpen(false)}
                className="text-[#8C7E6F] hover:text-[#3C3228] transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-5 sm:px-6 py-4 overflow-y-auto text-[14px] leading-[1.7] text-[#3C3228] font-sans whitespace-pre-line">
{`Политика конфиденциальности
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
ВКонтакте: vk.ru/inoveco`}
            </div>

            <div className="px-5 sm:px-6 py-5 border-t border-[#D5CBBD] flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPolicyOpen(false)}
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
      )}
    </motion.footer>
  )
}
