import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const base = path.join(root, 'public', 'images', 'products')
const hero = path.join(root, 'public', 'images', 'hero', 'hero-face.jpg')
const j1 = path.join(root, 'public', 'images', 'journal', '01-product.jpeg')
const j2 = path.join(root, 'public', 'images', 'journal', '02-journal.jpg')

const items = [
  {
    folder: 'Шампунь для окрашенных волос INOVE-CO',
    photo2: j1,
    desc: `Мягкое очищение без пересушивания. Подходит для окрашенных волос: помогает сохранить насыщенность оттенка и блеск.

Применение: нанесите на влажные волосы, вспеньте, смойте тёплой водой. При необходимости повторите.`,
  },
  {
    folder: 'Шампунь для тонких волос INOVE-CO',
    photo2: j2,
    desc: `Бережно очищает кожу головы и длину волос. Лёгкая формула не создаёт эффекта утяжеления и придаёт ощущение объёма у корней.

Применение: нанесите на влажные волосы, вспеньте, смойте тёплой водой.`,
  },
  {
    folder: 'Кондиционер для окрашенных волос INOVE-CO',
    photo2: j1,
    desc: `Увлажняет и облегчает расчёсывание. Подходит для окрашенных волос: помогает сохранить мягкость и сияние.

Применение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.`,
  },
  {
    folder: 'Кондиционер для тонких волос INOVE-CO',
    photo2: j2,
    desc: `Лёгкий кондиционер без эффекта утяжеления. Делает тонкие волосы более послушными и ухоженными.

Применение: после шампуня распределите по длине, оставьте на 2–3 минуты, смойте.`,
  },
  {
    folder: 'Маска для окрашенных волос INOVE-CO',
    photo2: j1,
    desc: `Интенсивный уход для окрашенных волос: питает и помогает поддерживать блеск, волосы выглядят более ухоженными.

Применение: 1–2 раза в неделю после шампуня, выдержите 5–10 минут, смойте.`,
  },
  {
    folder: 'Маска для тонких волос INOVE-CO',
    photo2: j2,
    desc: `Питательная маска для тонких волос: насыщает без тяжести, помогает сохранить объём и мягкость.

Применение: 1–2 раза в неделю, выдержите 5–10 минут, смойте тщательно.`,
  },
]

fs.mkdirSync(base, { recursive: true })

for (const { folder, photo2, desc } of items) {
  const dir = path.join(base, folder)
  fs.mkdirSync(dir, { recursive: true })
  fs.copyFileSync(hero, path.join(dir, 'photo-1.jpg'))
  fs.copyFileSync(photo2, path.join(dir, 'photo-2.jpg'))
  const txt = path.join(dir, 'desc.txt')
  fs.writeFileSync(txt, desc, 'utf8')
  const docx = path.join(dir, 'description.docx')
  execSync(`textutil -convert docx ${JSON.stringify(txt)} -output ${JSON.stringify(docx)}`, { stdio: 'inherit' })
  fs.unlinkSync(txt)
}

console.log('OK:', items.length, 'папок')
