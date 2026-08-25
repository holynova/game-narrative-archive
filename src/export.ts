import { analysisSteps, methodQuestions } from './data'
import type { Chapter, Character, Relationship } from './data'

type ExportDecision = { title: string; prompt: string; branches: string[]; note: string }
type ExportEnding = { title: string; condition: string; reading: string }
type ExportTheme = { label: string; base: string; dlc: string }

export type ExportEdition = {
  label: string
  scopeLabel: string
  opening: string
  preface: string
  chapters: Chapter[]
  characters: Character[]
  relationships: Relationship[]
  decisions: ExportDecision[]
  endings: ExportEnding[]
  dlcThemes: ExportTheme[]
  dlcCards: { label: string; title: string; body: string }[]
  methodIntro: string
}

const plain = (value: string) => value
  .replace(/^【确定】\s*/, '确定：')
  .replace(/^【推断】\s*/, '推断：')
  .replace(/^【很可能】\s*/, '很可能：')
  .replace(/^\[确定\]\s*/, '确定：')
  .replace(/^\[推断\]\s*/, '推断：')
  .replace(/^\[很可能\]\s*/, '很可能：')
  .replace(/\*\*(.*?)\*\*/g, '$1')
  .replace(/\s+/g, ' ')
  .trim()

const chapterLabel = (chapter: Chapter) => `第 ${chapter.index} 章 · ${plain(chapter.title)}`

export function buildTextBook(editions: ExportEdition[]) {
  const lines = [
    '游戏剧情档案馆',
    '一份可以连续阅读的游戏剧情书',
    '',
    '本书包含：' + editions.map((edition) => edition.label).join('、'),
    '',
  ]

  for (const edition of editions) {
    lines.push(`━━━━━━━━ ${edition.label} ━━━━━━━━`, '')
    lines.push(`范围：${edition.scopeLabel}`, '', plain(edition.opening), '', '序', plain(edition.preface), '')

    lines.push('目录')
    edition.chapters.forEach((chapter) => lines.push(chapterLabel(chapter)))
    lines.push('', '正文')

    for (const chapter of edition.chapters) {
      lines.push('', chapterLabel(chapter), plain(chapter.subtitle), '')
      chapter.body.forEach((paragraph) => lines.push(plain(paragraph), ''))
      lines.push(`这一章留下的问题：${plain(chapter.question)}`)
      lines.push(plain(chapter.fact), plain(chapter.reading), '')
    }

    lines.push('附录 · 人物关系', '')
    edition.characters.forEach((character) => {
      lines.push(`${plain(character.name)} · ${plain(character.role)}`, plain(character.note), '')
    })
    const names = new Map(edition.characters.map((character) => [character.id, plain(character.name)]))
    edition.relationships.forEach((relationship) => lines.push(`${names.get(relationship.from) ?? relationship.from} → ${names.get(relationship.to) ?? relationship.to}：${plain(relationship.label)}`))
    lines.push('')

    lines.push('附录 · 选择与结局', '')
    edition.decisions.forEach((decision) => {
      lines.push(decision.title, plain(decision.prompt), `分支：${decision.branches.map(plain).join(' / ')}`, `解读：${plain(decision.note)}`, '')
    })
    edition.endings.forEach((ending) => lines.push(ending.title, `条件：${plain(ending.condition)}`, `解读：${plain(ending.reading)}`, ''))

    lines.push('附录 · DLC 对照', '')
    edition.dlcCards.forEach((card) => lines.push(`${card.label} · ${plain(card.title)}`, plain(card.body), ''))
    edition.dlcThemes.forEach((theme) => lines.push(plain(theme.label), `本体：${plain(theme.base)}`, `DLC：${plain(theme.dlc)}`, ''))

    lines.push('附录 · 分析方法', plain(edition.methodIntro), '')
    analysisSteps.forEach((step) => lines.push(`${step.number} · ${plain(step.title)}`, plain(step.body), ''))
    lines.push('先问这六个问题')
    methodQuestions.forEach((question, index) => lines.push(`${String(index + 1).padStart(2, '0')} · ${plain(question)}`))
    lines.push('')
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n')
}

const escapeHtml = (value: string) => plain(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const paragraphHtml = (value: string) => `<p>${escapeHtml(value)}</p>`

function chapterHtml(chapter: Chapter) {
  return `<section id="chapter-${escapeHtml(chapter.id)}"><h2>${escapeHtml(chapterLabel(chapter))}</h2><p class="subtitle">${escapeHtml(chapter.subtitle)}</p>${chapter.body.map(paragraphHtml).join('')}<aside><strong>这一章留下的问题</strong><p>${escapeHtml(chapter.question)}</p><p>${escapeHtml(chapter.fact)}</p><p>${escapeHtml(chapter.reading)}</p></aside></section>`
}

function editionHtml(edition: ExportEdition, index: number) {
  const toc = edition.chapters.map((chapter) => `<li><a href="#chapter-${escapeHtml(chapter.id)}">${escapeHtml(chapterLabel(chapter))}</a></li>`).join('')
  const names = new Map(edition.characters.map((character) => [character.id, plain(character.name)]))
  const people = edition.characters.map((character) => `<p><strong>${escapeHtml(character.name)}</strong> · ${escapeHtml(character.role)}<br />${escapeHtml(character.note)}</p>`).join('') + `<h3>关系</h3>${edition.relationships.map((relationship) => `<p>${escapeHtml(names.get(relationship.from) ?? relationship.from)} → ${escapeHtml(names.get(relationship.to) ?? relationship.to)}：${escapeHtml(relationship.label)}</p>`).join('')}`
  const decisions = edition.decisions.map((decision) => `<section><h3>${escapeHtml(decision.title)}</h3>${paragraphHtml(decision.prompt)}<p>分支：${escapeHtml(decision.branches.map(plain).join(' / '))}</p><p>解读：${escapeHtml(decision.note)}</p></section>`).join('')
  const endings = edition.endings.map((ending) => `<section><h3>${escapeHtml(ending.title)}</h3><p>条件：${escapeHtml(ending.condition)}</p><p>解读：${escapeHtml(ending.reading)}</p></section>`).join('')
  const dlc = edition.dlcCards.map((card) => `<section><h3>${escapeHtml(card.label)} · ${escapeHtml(card.title)}</h3>${paragraphHtml(card.body)}</section>`).join('') + edition.dlcThemes.map((theme) => `<section><h3>${escapeHtml(theme.label)}</h3><p>本体：${escapeHtml(theme.base)}</p><p>DLC：${escapeHtml(theme.dlc)}</p></section>`).join('')
  const method = analysisSteps.map((step) => `<section><h3>${escapeHtml(step.number)} · ${escapeHtml(step.title)}</h3>${paragraphHtml(step.body)}</section>`).join('') + `<h3>先问这六个问题</h3>${methodQuestions.map((question, questionIndex) => `<p>${String(questionIndex + 1).padStart(2, '0')} · ${escapeHtml(question)}</p>`).join('')}`

  return `<article id="edition-${index}"><h1>${escapeHtml(edition.label)}</h1><p class="meta">${escapeHtml(edition.scopeLabel)}</p>${paragraphHtml(edition.opening)}<h2>序</h2>${paragraphHtml(edition.preface)}<nav><h2>目录</h2><ol>${toc}</ol></nav><h2>正文</h2>${edition.chapters.map(chapterHtml).join('')}<h2>附录 · 人物关系</h2>${people}<h2>附录 · 选择与结局</h2>${decisions}${endings}<h2>附录 · DLC 对照</h2>${dlc}<h2>附录 · 分析方法</h2>${paragraphHtml(edition.methodIntro)}${method}</article>`
}

function buildBookXhtml(editions: ExportEdition[]) {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
  <head><title>游戏剧情档案馆</title><link rel="stylesheet" type="text/css" href="styles.css" /></head>
  <body><header><h1>游戏剧情档案馆</h1><p>一份可以连续阅读的游戏剧情书</p></header>${editions.map(editionHtml).join('')}</body>
</html>`
}

function buildNavXhtml(editions: ExportEdition[]) {
  const links = editions.map((edition, index) => `<li><a href="book.xhtml#edition-${index}">${escapeHtml(edition.label)}</a><ol>${edition.chapters.map((chapter) => `<li><a href="book.xhtml#chapter-${escapeHtml(chapter.id)}">${escapeHtml(plain(chapter.title))}</a></li>`).join('')}</ol></li>`).join('')
  return `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="zh-CN"><head><title>目录 · 游戏剧情档案馆</title></head><body><nav epub:type="toc" id="toc"><h1>目录</h1><ol>${links}</ol></nav></body></html>`
}

const epubStyles = `body { color: #2f2b25; font-family: serif; font-size: 1em; line-height: 1.9; margin: 8%; } h1, h2, h3 { font-weight: 500; line-height: 1.45; } h1 { margin-top: 2em; } h2 { margin-top: 2.6em; border-bottom: 1px solid #cfc6b4; padding-bottom: .35em; } h3 { margin-top: 2em; } p { margin: 0 0 1em; } .meta, .subtitle { color: #766e62; } aside { border-top: 1px solid #766e62; margin: 2em 0 3em; padding-top: 1em; } a { color: inherit; }` 

function utf8(value: string) { return new TextEncoder().encode(value) }

function writeU16(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff
  target[offset + 1] = (value >>> 8) & 0xff
}

function writeU32(target: Uint8Array, offset: number, value: number) {
  target[offset] = value & 0xff
  target[offset + 1] = (value >>> 8) & 0xff
  target[offset + 2] = (value >>> 16) & 0xff
  target[offset + 3] = (value >>> 24) & 0xff
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff
  for (const byte of data) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function concatBytes(chunks: Uint8Array[]) {
  const result = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0))
  let offset = 0
  chunks.forEach((chunk) => { result.set(chunk, offset); offset += chunk.length })
  return result
}

function zipStore(entries: { name: string; data: Uint8Array }[]) {
  const locals: Uint8Array[] = []
  const central: Uint8Array[] = []
  let offset = 0

  entries.forEach(({ name, data }) => {
    const nameBytes = utf8(name)
    const checksum = crc32(data)
    const localHeader = new Uint8Array(30 + nameBytes.length)
    writeU32(localHeader, 0, 0x04034b50)
    writeU16(localHeader, 4, 20)
    writeU16(localHeader, 8, 0)
    writeU32(localHeader, 14, checksum)
    writeU32(localHeader, 18, data.length)
    writeU32(localHeader, 22, data.length)
    writeU16(localHeader, 26, nameBytes.length)
    localHeader.set(nameBytes, 30)
    locals.push(localHeader, data)

    const centralHeader = new Uint8Array(46 + nameBytes.length)
    writeU32(centralHeader, 0, 0x02014b50)
    writeU16(centralHeader, 4, 20)
    writeU16(centralHeader, 6, 20)
    writeU32(centralHeader, 16, checksum)
    writeU32(centralHeader, 20, data.length)
    writeU32(centralHeader, 24, data.length)
    writeU16(centralHeader, 28, nameBytes.length)
    writeU32(centralHeader, 42, offset)
    centralHeader.set(nameBytes, 46)
    central.push(centralHeader)
    offset += localHeader.length + data.length
  })

  const centralBytes = concatBytes(central)
  const end = new Uint8Array(22)
  writeU32(end, 0, 0x06054b50)
  writeU16(end, 8, entries.length)
  writeU16(end, 10, entries.length)
  writeU32(end, 12, centralBytes.length)
  writeU32(end, 16, offset)
  return concatBytes([...locals, centralBytes, end])
}

export function buildEpub(editions: ExportEdition[]) {
  const container = '<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>'
  const packageFile = `<?xml version="1.0" encoding="UTF-8"?><package xmlns="http://www.idpf.org/2007/opf" unique-identifier="book-id" version="3.0" xml:lang="zh-CN"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">game-narrative-archive</dc:identifier><dc:title>游戏剧情档案馆</dc:title><dc:language>zh-CN</dc:language><meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')}</meta></metadata><manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="book" href="book.xhtml" media-type="application/xhtml+xml"/><item id="styles" href="styles.css" media-type="text/css"/></manifest><spine><itemref idref="nav" linear="no"/><itemref idref="book"/></spine></package>`
  const bytes = zipStore([
    { name: 'mimetype', data: utf8('application/epub+zip') },
    { name: 'META-INF/container.xml', data: utf8(container) },
    { name: 'OEBPS/content.opf', data: utf8(packageFile) },
    { name: 'OEBPS/nav.xhtml', data: utf8(buildNavXhtml(editions)) },
    { name: 'OEBPS/styles.css', data: utf8(epubStyles) },
    { name: 'OEBPS/book.xhtml', data: utf8(buildBookXhtml(editions)) },
  ])
  return new Blob([bytes], { type: 'application/epub+zip' })
}
