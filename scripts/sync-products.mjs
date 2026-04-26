#!/usr/bin/env node
/**
 * Собирает lib/productsCatalog.ts из public/images/products:
 * — порядок фиксирован (как в макете);
 * — название на сайте: имя папки с заглавных + « INOVE-CO»;
 * — описание: из .docx в папке, иначе запасной текст;
 * — фото: photo-1.* и photo-2.* (любое из jpg/jpeg/png/webp).
 *
 * Запуск: npm run products:sync
 */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const productsRoot = path.join(root, 'public', 'images', 'products')
const outFile = path.join(root, 'lib', 'productsCatalog.ts')

/** Порядок карточек на сайте (имена папок = как ты назвал в Finder) */
const ORDER = [
  'шампунь для объема',
  'увлажняющий шампунь',
  'увлажняющий бальзам',
  'увлажняющая маска',
  'спрей 15в1',
  'окрашивающий шампунь',
  'окрашивающий бальзам',
  'окрашивающая маска',
  'маска для объема',
  'бальзам для объема',
]

/** Если .docx ещё нет — подставляется этот текст (косметика, без медицины) */
const FALLBACK_DESC = {
  'шампунь для объема':
    'Мягкое очищение с акцентом на объём у корней. Подходит для тонких и склонных к слабому объёму волос.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой. При необходимости повторите.',
  'увлажняющий шампунь':
    'Нежное очищение и увлажнение без ощущения пересушенности. Подходит для нормальных и сухих волос.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.',
  'увлажняющий бальзам':
    'Смягчает и облегчает расчёсывание, помогает сохранить увлажнение по длине волос.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
  'увлажняющая маска':
    'Интенсивный уход для сухих и обезвоженных волос: насыщает и помогает сохранить мягкость.\n\nПрименение: 1–2 раза в неделю после шампуня, выдержите 5–10 минут, смойте.',
  'спрей 15в1':
    'Многофункциональный спрей для укладки и ухода: облегчает расчёсывание, помогает защитить волосы при сушке феном.\n\nПрименение: распылите на влажные или сухие волосы, не смывайте. Избегайте попадания в глаза.',
  'окрашивающий шампунь':
    'Мягкое очищение для окрашенных волос: помогает сохранить насыщенность оттенка и блеск.\n\nПрименение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.',
  'окрашивающий бальзам':
    'Уход после мытья для окрашенных волос: увлажняет и помогает поддерживать цвет между окрашиваниями.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
  'окрашивающая маска':
    'Питательная маска для окрашенных волос: интенсивный уход и помощь в поддержании блеска.\n\nПрименение: 1–2 раза в неделю, выдержите 5–10 минут, смойте.',
  'маска для объема':
    'Маска для тонких волос: питает без тяжести, помогает придать ощущение объёма и плотности.\n\nПрименение: 1–2 раза в неделю, выдержите 5–10 минут, смойте.',
  'бальзам для объема':
    'Лёгкий бальзам для объёма: смягчает и помогает сохранить подвижность укладки без эффекта утяжеления.\n\nПрименение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.',
}

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function extractDocxText(docxPath) {
  const xml = execSync(`unzip -p ${JSON.stringify(docxPath)} word/document.xml`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })
  const text = decodeXmlEntities(
    xml.replace(/<w:tab\/>/g, '\t').replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '')
  )
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/** Как на витрине: первая буква названия, остальное как в имени папки */
function displayName(folder) {
  const t = folder.trim()
  if (!t) return 'INOVE-CO'
  const name = t.charAt(0).toUpperCase() + t.slice(1)
  return `${name} INOVE-CO`
}

function priceForFolder(folder) {
  const f = folder.toLowerCase()
  if (f.includes('спрей')) return { priceNum: 1900, price: '1 900 ₽' }
  if (f.includes('шампунь')) return { priceNum: 1800, price: '1 800 ₽' }
  if (f.includes('бальзам')) return { priceNum: 1900, price: '1 900 ₽' }
  if (f.includes('маска')) return { priceNum: 2100, price: '2 100 ₽' }
  return { priceNum: 1900, price: '1 900 ₽' }
}

function tagForFolder(folder) {
  if (folder === 'увлажняющий шампунь') return 'Бестселлер'
  if (folder.includes('спрей')) return 'Новинка'
  return undefined
}

function findPhotoPair(sub) {
  const files = fs.existsSync(sub) ? fs.readdirSync(sub) : []
  const p1 = files.find((f) => /^photo-1\.(jpe?g|png|webp)$/i.test(f))
  const p2 = files.find((f) => /^photo-2\.(jpe?g|png|webp)$/i.test(f))
  return [p1, p2]
}

function main() {
  const rows = []
  let id = 1

  for (const folder of ORDER) {
    const sub = path.join(productsRoot, folder)
    const exists = fs.existsSync(sub)
    let description = FALLBACK_DESC[folder] || ''
    if (exists) {
      const docx = fs.readdirSync(sub).find((f) => f.toLowerCase().endsWith('.docx'))
      if (docx) {
        try {
          const t = extractDocxText(path.join(sub, docx))
          if (t.length > 0) description = t
        } catch (e) {
          console.warn('Не прочитан .docx, запасной текст:', folder, e.message)
        }
      } else {
        console.warn('Нет .docx — запасной текст:', folder)
      }
    } else {
      console.warn('Нет папки — запасной текст и photo-1.jpg:', folder)
    }

    let [p1, p2] = findPhotoPair(sub)
    if (!p1) p1 = 'photo-1.jpg'
    if (!p2) p2 = 'photo-2.jpg'

    const { priceNum, price } = priceForFolder(folder)
    const tag = tagForFolder(folder)
    const name = displayName(folder)
    const images = [`/images/products/${folder}/${p1}`, `/images/products/${folder}/${p2}`]

    rows.push({ id: String(id++), name, description, images, price, priceNum, tag })
  }

  const chunks = []
  chunks.push('/** Автогенерация: npm run products:sync (папки + .docx + photo-1/2) */')
  chunks.push("import type { Product } from './product'")
  chunks.push('')
  chunks.push('export const products: Product[] = [')

  for (const r of rows) {
    chunks.push('  {')
    chunks.push(`    id: '${r.id}',`)
    chunks.push(`    name: ${JSON.stringify(r.name)},`)
    chunks.push(`    description: ${JSON.stringify(r.description)},`)
    chunks.push(`    images: [${JSON.stringify(r.images[0])}, ${JSON.stringify(r.images[1])}],`)
    chunks.push(`    price: ${JSON.stringify(r.price)},`)
    chunks.push(`    priceNum: ${r.priceNum},`)
    if (r.tag) chunks.push(`    tag: '${r.tag}',`)
    chunks.push('  },')
  }
  chunks.push(']')
  chunks.push('')

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, chunks.join('\n'), 'utf8')
  console.log('Готово:', outFile, '—', rows.length, 'товаров')
}

main()
