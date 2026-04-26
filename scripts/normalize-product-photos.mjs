/**
 * Переименовывает два первых изображения в каждой папке в photo-1.<расш> и photo-2.<расш>
 * (сортировка имён файлов). Расширение сохраняется (.jpg / .png / .webp).
 * Запуск из корня проекта: node scripts/normalize-product-photos.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', 'public', 'images', 'products')
const imageExt = /\.(jpe?g|png|webp)$/i

function main() {
  if (!fs.existsSync(root)) {
    console.error('Нет папки:', root)
    process.exit(1)
  }
  const dirs = fs
    .readdirSync(root)
    .filter((f) => fs.statSync(path.join(root, f)).isDirectory())
    .sort((a, b) => a.localeCompare(b, 'ru'))

  for (const dir of dirs) {
    const sub = path.join(root, dir)
    const files = fs
      .readdirSync(sub)
      .filter((f) => imageExt.test(f) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b, 'ru'))

    const already =
      files.length === 2 &&
      /^photo-1\./.test(files[0]) &&
      /^photo-2\./.test(files[1])

    if (already) {
      console.log('— OK', dir)
      continue
    }

    if (files.length < 2) {
      console.warn('⚠ Нужно минимум 2 фото:', dir)
      continue
    }

    const f1 = files[0]
    const f2 = files[1]
    const ext1 = path.extname(f1)
    const ext2 = path.extname(f2)
    const tmp1 = path.join(sub, `.__tmp_photo1${ext1}`)
    const tmp2 = path.join(sub, `.__tmp_photo2${ext2}`)
    const dest1 = path.join(sub, `photo-1${ext1}`)
    const dest2 = path.join(sub, `photo-2${ext2}`)

    fs.renameSync(path.join(sub, f1), tmp1)
    fs.renameSync(path.join(sub, f2), tmp2)
    if (fs.existsSync(dest1)) fs.unlinkSync(dest1)
    if (fs.existsSync(dest2)) fs.unlinkSync(dest2)
    fs.renameSync(tmp1, dest1)
    fs.renameSync(tmp2, dest2)

    console.log('✓', dir, '→', path.basename(dest1), path.basename(dest2))
  }
}

main()
