#!/usr/bin/env node
/**
 * Извлекает текст из word/document.xml каждого .docx в подпапках public/images/products
 */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', 'public', 'images', 'products')

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
    xml
      .replace(/<w:tab\/>/g, '\t')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]+>/g, '')
  )
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

if (!fs.existsSync(root)) {
  console.error('Нет папки:', root)
  process.exit(1)
}

const dirs = fs
  .readdirSync(root)
  .filter((f) => fs.statSync(path.join(root, f)).isDirectory())
  .sort()

const out = []
for (const dir of dirs) {
  const sub = path.join(root, dir)
  const docx = fs.readdirSync(sub).find((f) => f.toLowerCase().endsWith('.docx'))
  if (!docx) {
    console.error('Нет .docx в', dir)
    process.exit(1)
  }
  const text = extractDocxText(path.join(sub, docx))
  out.push({ dir, text })
}

console.log(JSON.stringify(out, null, 2))
