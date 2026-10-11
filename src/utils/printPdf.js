// Export the preview as a PDF using html-to-image + jsPDF.
// Renders an off-screen copy of the preview at the PDF content width, captures it
// as one tall image, then slices it into pages. Page breaks land between lines and
// blocks (never through a line of text) and never right after a heading.

// Letter page, 0.5in margins, 96 CSS px per inch
const marginIn = 0.5
const pageWidthIn = 8.5
const pageHeightIn = 11
const contentWidthPx = (pageWidthIn - marginIn * 2) * 96 // 720px
const contentHeightPx = (pageHeightIn - marginIn * 2) * 96 // 960px
const pixelRatio = 2

export async function printPdf(theme) {
  const source = document.getElementById('pdf-content')
  if (!source) throw new Error('Preview not found')

  // Loaded on demand so the editor opens faster
  const [{ toPng }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')])

  // Off-screen copy at the exact PDF width. Works even when the preview is hidden
  // (the Edit tab on phones) and never disturbs what the user is looking at.
  const host = document.createElement('div')
  host.style.cssText = `position:fixed;left:-100000px;top:0;width:${contentWidthPx}px;`
  const element = source.cloneNode(true)
  element.removeAttribute('id')
  element.style.width = `${contentWidthPx}px`
  element.style.maxWidth = `${contentWidthPx}px`
  element.style.padding = '32px'
  element.style.margin = '0'
  host.appendChild(element)
  document.body.appendChild(host)

  try {
    await document.fonts.ready
    // Wait a frame for layout at the new width
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

    const breaks = collectBreakPoints(element)
    const totalHeightPx = element.offsetHeight

    const dataUrl = await toPng(element, {
      pixelRatio,
      width: contentWidthPx,
      height: totalHeightPx,
      cacheBust: true,
      backgroundColor: theme.colors['--theme-bg'] || '#ffffff',
    })

    const img = new Image()
    img.src = dataUrl
    await img.decode()

    // PDF in points (72pt = 1 inch)
    const pdf = new jsPDF('p', 'pt', 'letter')
    const marginPt = marginIn * 72
    const contentWidthPt = pdf.internal.pageSize.getWidth() - marginPt * 2
    const ptPerCssPx = contentWidthPt / contentWidthPx
    const imgPxPerCssPx = img.width / contentWidthPx

    const pages = paginate(breaks, totalHeightPx)
    pages.forEach(([start, end], i) => {
      if (i > 0) pdf.addPage()
      const sy = Math.round(start * imgPxPerCssPx)
      const sh = Math.min(Math.round(end * imgPxPerCssPx), img.height) - sy
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = sh
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, sy, img.width, sh, 0, 0, img.width, sh)
      const slice = canvas.toDataURL('image/jpeg', 0.95)
      pdf.addImage(slice, 'JPEG', marginPt, marginPt, contentWidthPt, (sh / imgPxPerCssPx) * ptPerCssPx)
    })

    pdf.save(`${fileName(source)}.pdf`)
  } finally {
    host.remove()
  }
}

// Y positions (CSS px from the top of `root`) where a page may safely end.
// Each candidate is { y, next } where `next` is where the following page starts,
// so the gap between blocks isn't repeated at the top of the next page.
function collectBreakPoints(root) {
  const top = root.getBoundingClientRect().top
  const blocks = root.querySelectorAll('p, li, tr, pre, blockquote, hr, img, h1, h2, h3, h4, h5, h6, table, ul, ol')
  const rects = []
  blocks.forEach((el) => {
    const r = el.getBoundingClientRect()
    rects.push({ top: r.top - top, bottom: r.bottom - top, heading: /^H[1-6]$/.test(el.tagName) })
  })

  const candidates = []
  for (const r of rects) {
    if (r.heading) continue // keep headings with what follows
    const nextTop = rects.reduce((min, o) => (o.top >= r.bottom - 0.5 && o.top < min ? o.top : min), Infinity)
    candidates.push({ y: r.bottom, next: Number.isFinite(nextTop) ? nextTop : r.bottom })
  }

  // Line boundaries inside paragraphs, list items and code blocks, so a long block can split
  // between lines instead of through one
  root.querySelectorAll('p, li, pre').forEach((el) => {
    if (el.tagName === 'LI' && el.querySelector('p, ul, ol, pre, table, blockquote')) return
    const style = getComputedStyle(el)
    const text = el.tagName === 'PRE' ? getComputedStyle(el.querySelector('code') || el) : style
    const lineHeight = parseFloat(text.lineHeight) || parseFloat(text.fontSize) * 1.5
    const r = el.getBoundingClientRect()
    const start = r.top - top + parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth)
    const end = r.bottom - top - parseFloat(style.paddingBottom)
    for (let y = start + lineHeight; y < end - lineHeight / 2; y += lineHeight) {
      candidates.push({ y, next: y })
    }
  })

  return candidates.sort((a, b) => a.y - b.y)
}

// Turn break candidates into [start, end] ranges no taller than one page
function paginate(candidates, totalHeight) {
  const pages = []
  let start = 0
  while (totalHeight - start > contentHeightPx) {
    const limit = start + contentHeightPx
    let best = null
    for (const c of candidates) {
      if (c.y > limit) break
      if (c.y > start + contentHeightPx * 0.4) best = c // don't leave a page mostly empty
    }
    if (!best) {
      // Nothing safe to break on (e.g. a very tall image): cut at the page edge
      pages.push([start, limit])
      start = limit
    } else {
      pages.push([start, best.y])
      start = Math.min(best.next, best.y + contentHeightPx)
    }
  }
  pages.push([start, totalHeight])
  return pages
}

// File name from the document's first heading, e.g. "Quarterly Report.pdf"
function fileName(root) {
  const heading = root.querySelector('h1, h2, h3')?.textContent?.trim()
  const clean = heading?.replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').replace(/\.pdf$/i, '').slice(0, 80).trim()
  return clean || 'markdown'
}
