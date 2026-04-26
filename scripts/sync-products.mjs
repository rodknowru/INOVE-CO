#!/usr/bin/env node
/**
 * 1) Готовит public/images/products: папки, .docx из запасного текста (если нет ни одного .docx),
 *    переименовывает два первых фото → photo-1.* / photo-2.*
 * 2) Пишет lib/productsCatalog.ts (npm run products:sync)
 */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const productsRoot = path.join(root, 'public', 'images', 'products')
/** Исходники: полные .docx и фото до публикации в public */
const productsSourceRoot = path.join(root, 'products')
const extractDocxScript = path.join(__dirname, 'extract-docx-text.py')
const outFile = path.join(root, 'lib', 'productsCatalog.ts')

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

function extractDocxTextZip(docxPath) {
  const xml = execSync(`unzip -p ${JSON.stringify(docxPath)} word/document.xml`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })
  const text = decodeXmlEntities(
    xml.replace(/<w:tab\/>/g, '\t').replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '')
  )
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/** Полный текст через python-docx (абзацы + таблицы) */
function extractDocxText(docxPath) {
  try {
    return execSync(`python3 ${JSON.stringify(extractDocxScript)} ${JSON.stringify(docxPath)}`, {
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    try {
      return extractDocxTextZip(docxPath)
    } catch {
      return ''
    }
  }
}

function findDirByNfcName(parent, targetName) {
  if (!fs.existsSync(parent)) return null
  const want = targetName.normalize('NFC')
  const name = fs
    .readdirSync(parent)
    .find((d) => d !== '.DS_Store' && d.normalize('NFC') === want)
  return name ? path.join(parent, name) : null
}

/** Копирует description.docx из products/<папка>/ (имена с разной формой «й» совпадают по NFC) */
function syncDescriptionDocxFromProducts(sub, folder) {
  const srcDir = findDirByNfcName(productsSourceRoot, folder)
  if (!srcDir) return false
  const docxs = fs
    .readdirSync(srcDir)
    .filter((f) => f.toLowerCase().endsWith('.docx'))
    .sort((a, b) => a.localeCompare(b, 'ru'))
  if (docxs.length === 0) return false
  fs.copyFileSync(path.join(srcDir, docxs[0]), path.join(sub, 'description.docx'))
  return true
}

/** Убираем старые photo-1/2, чтобы не осталось двойников (.jpg от заглушек + .png от зеркала). */
function removeExistingPhoto12(sub) {
  if (!fs.existsSync(sub)) return
  for (const f of fs.readdirSync(sub)) {
    if (/^photo-[12]\./i.test(f)) fs.unlinkSync(path.join(sub, f))
  }
}

/** Два первых изображения из products/ → photo-1 / photo-2 в public */
function syncPhotosFromProductsMirror(sub, folder) {
  const srcDir = findDirByNfcName(productsSourceRoot, folder)
  if (!srcDir) return

  removeExistingPhoto12(sub)

  const hero = path.join(root, 'public', 'images', 'hero', 'hero-face.jpg')
  const j2 = path.join(root, 'public', 'images', 'journal', '02-journal.jpg')

  const imgs = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'ru'))

  if (imgs.length === 0) return

  const ext0 = path.extname(imgs[0]) || '.jpg'
  const dest0 = path.join(sub, `photo-1${ext0}`)
  fs.copyFileSync(path.join(srcDir, imgs[0]), dest0)

  if (imgs.length >= 2) {
    const ext1 = path.extname(imgs[1]) || '.jpg'
    const dest1 = path.join(sub, `photo-2${ext1}`)
    fs.copyFileSync(path.join(srcDir, imgs[1]), dest1)
  } else if (fs.existsSync(j2)) {
    const ext1 = path.extname(j2)
    fs.copyFileSync(j2, path.join(sub, `photo-2${ext1}`))
  } else if (fs.existsSync(hero)) {
    const ext1 = path.extname(hero)
    fs.copyFileSync(hero, path.join(sub, `photo-2${ext1}`))
  }
}

function displayName(folder) {
  const t = folder.trim()
  if (!t) return 'INOVE-CO'
  return `${t.charAt(0).toUpperCase() + t.slice(1)} INOVE-CO`
}

function subtitleFromDescription(desc) {
  const line = desc
    .split(/\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0)
  return line || ''
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

function ensureDocx(sub, folder) {
  const has = fs.readdirSync(sub).some((f) => f.toLowerCase().endsWith('.docx'))
  if (has) return
  const body = FALLBACK_DESC[folder] || ''
  const txt = path.join(sub, '.__desc.txt')
  fs.writeFileSync(txt, body, 'utf8')
  const docx = path.join(sub, 'description.docx')
  execSync(`textutil -convert docx ${JSON.stringify(txt)} -output ${JSON.stringify(docx)}`, { stdio: 'pipe' })
  fs.unlinkSync(txt)
}

function renameTwoPhotosToPhoto12(sub) {
  const files = fs.readdirSync(sub)
  const p1 = files.find((f) => /^photo-1\.(jpe?g|png|webp)$/i.test(f))
  const p2 = files.find((f) => /^photo-2\.(jpe?g|png|webp)$/i.test(f))
  if (p1 && p2) return

  const hero = path.join(root, 'public', 'images', 'hero', 'hero-face.jpg')
  const j1 = path.join(root, 'public', 'images', 'journal', '01-product.jpeg')
  const j2 = path.join(root, 'public', 'images', 'journal', '02-journal.jpg')

  let imgs = files
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .filter((f) => !/^photo-[12]\./i.test(f))
    .sort((a, b) => a.localeCompare(b, 'ru'))

  if (imgs.length === 0 && fs.existsSync(hero) && fs.existsSync(j1)) {
    fs.copyFileSync(hero, path.join(sub, '.__seed0.jpg'))
    fs.copyFileSync(j1, path.join(sub, '.__seed1.jpg'))
    imgs = fs
      .readdirSync(sub)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .filter((f) => !/^photo-[12]\./i.test(f))
      .sort((a, b) => a.localeCompare(b, 'ru'))
  } else if (imgs.length === 1 && fs.existsSync(j2)) {
    fs.copyFileSync(j2, path.join(sub, '.__seed1.jpg'))
    imgs = fs
      .readdirSync(sub)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .filter((f) => !/^photo-[12]\./i.test(f))
      .sort((a, b) => a.localeCompare(b, 'ru'))
  }

  if (imgs.length < 2) {
    console.warn('⚠ Мало фото в папке:', path.basename(sub))
    return
  }

  const a = imgs[0]
  const b = imgs[1]
  const ext1 = path.extname(a)
  const ext2 = path.extname(b)
  const tmpA = path.join(sub, `.__mv1${ext1}`)
  const tmpB = path.join(sub, `.__mv2${ext2}`)
  fs.renameSync(path.join(sub, a), tmpA)
  fs.renameSync(path.join(sub, b), tmpB)
  const destA = path.join(sub, `photo-1${ext1}`)
  const destB = path.join(sub, `photo-2${ext2}`)
  if (fs.existsSync(destA)) fs.unlinkSync(destA)
  if (fs.existsSync(destB)) fs.unlinkSync(destB)
  fs.renameSync(tmpA, destA)
  fs.renameSync(tmpB, destB)

  fs.readdirSync(sub).forEach((f) => {
    if (f.startsWith('.__seed')) fs.unlinkSync(path.join(sub, f))
  })
}

function prepareProductFolders() {
  fs.mkdirSync(productsRoot, { recursive: true })
  for (const folder of ORDER) {
    const sub = path.join(productsRoot, folder)
    fs.mkdirSync(sub, { recursive: true })
    try {
      syncPhotosFromProductsMirror(sub, folder)
    } catch (e) {
      console.warn('sync photos from products/:', folder, e.message)
    }
    try {
      if (!syncDescriptionDocxFromProducts(sub, folder)) ensureDocx(sub, folder)
    } catch (e) {
      console.warn('textutil/docx:', folder, e.message)
    }
    try {
      renameTwoPhotosToPhoto12(sub)
    } catch (e) {
      console.warn('rename photos:', folder, e.message)
    }
  }
}

function findPhotoPair(sub) {
  const files = fs.existsSync(sub) ? fs.readdirSync(sub) : []
  const p1 = files.find((f) => /^photo-1\.(jpe?g|png|webp)$/i.test(f))
  const p2 = files.find((f) => /^photo-2\.(jpe?g|png|webp)$/i.test(f))
  return [p1, p2]
}

function main() {
  prepareProductFolders()

  const rows = []
  let id = 1

  for (const folder of ORDER) {
    const sub = path.join(productsRoot, folder)
    let description = FALLBACK_DESC[folder] || ''
    const tryPaths = []
    const srcDir = findDirByNfcName(productsSourceRoot, folder)
    if (srcDir) {
      const srcDocx = fs
        .readdirSync(srcDir)
        .filter((f) => f.toLowerCase().endsWith('.docx'))
        .sort((a, b) => a.localeCompare(b, 'ru'))
      if (srcDocx[0]) tryPaths.push(path.join(srcDir, srcDocx[0]))
    }
    if (fs.existsSync(sub)) {
      const docxName = fs.readdirSync(sub).find((f) => f.toLowerCase().endsWith('.docx'))
      if (docxName) tryPaths.push(path.join(sub, docxName))
    }
    for (const docxPath of tryPaths) {
      try {
        const t = extractDocxText(docxPath)
        if (t.length > description.length) description = t
      } catch (e) {
        console.warn('Не прочитан .docx:', docxPath, e.message)
      }
    }
    description = description.trim()

    let [p1, p2] = findPhotoPair(sub)
    if (!p1) p1 = 'photo-1.jpg'
    if (!p2) p2 = 'photo-2.jpg'

    const { priceNum, price } = priceForFolder(folder)
    const tag = tagForFolder(folder)
    const name = displayName(folder)
    const subtitle = subtitleFromDescription(description)
    const images = [`/images/products/${folder}/${p1}`, `/images/products/${folder}/${p2}`]

    rows.push({ id: String(id++), name, subtitle, description, images, price, priceNum, tag })
  }

  const chunks = []
  chunks.push('/** Автогенерация: npm run products:sync */')
  chunks.push("import type { Product } from './product'")
  chunks.push('')
  chunks.push('export const products: Product[] = [')

  for (const r of rows) {
    chunks.push('  {')
    chunks.push(`    id: '${r.id}',`)
    chunks.push(`    name: ${JSON.stringify(r.name)},`)
    chunks.push(`    subtitle: ${JSON.stringify(r.subtitle)},`)
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
