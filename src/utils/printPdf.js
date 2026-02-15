import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

// Export the preview as a PDF using html-to-image + jsPDF
// Constrains the element to PDF content width before capture so text and
// tables fit correctly, then slices the tall image into pages.
export async function printPdf(theme) {
  const element = document.getElementById('pdf-content')
  if (!element) return

  // PDF dimensions in inches
  const marginIn = 0.5
  const pageWidthIn = 8.5
  const pageHeightIn = 11
  const contentWidthPx = (pageWidthIn - marginIn * 2) * 96 // 720px at 96dpi
  const pixelRatio = 2

  // Save original styles so we can restore after capture
  const saved = {
    width: element.style.width,
    maxWidth: element.style.maxWidth,
    padding: element.style.padding,
  }

  // Temporarily constrain element to exact PDF content width
  // This ensures tables, code blocks, etc. wrap to fit the page
  element.style.width = `${contentWidthPx}px`
  element.style.maxWidth = `${contentWidthPx}px`
  element.style.padding = '32px'

  // Wait a frame for the browser to reflow at the new width
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

  // Capture the full content as a high-res PNG
  const dataUrl = await toPng(element, {
    pixelRatio,
    width: contentWidthPx,
    cacheBust: true,
    backgroundColor: '#ffffff',
  })

  // Restore original styles immediately
  element.style.width = saved.width
  element.style.maxWidth = saved.maxWidth
  element.style.padding = saved.padding

  // Load the captured image
  const img = new Image()
  img.src = dataUrl
  await new Promise((resolve) => { img.onload = resolve })

  // PDF setup in points (72pt = 1 inch)
  const pdf = new jsPDF('p', 'pt', 'letter')
  const pageWidthPt = pdf.internal.pageSize.getWidth()   // 612pt
  const pageHeightPt = pdf.internal.pageSize.getHeight()  // 792pt
  const marginPt = marginIn * 72                          // 36pt
  const contentWidthPt = pageWidthPt - marginPt * 2       // 540pt
  const contentHeightPt = pageHeightPt - marginPt * 2     // 720pt

  // Scale factor: captured image pixels → PDF points
  const scale = contentWidthPt / img.width
  const totalScaledHeight = img.height * scale

  if (totalScaledHeight <= contentHeightPt) {
    // Fits on one page
    pdf.addImage(dataUrl, 'PNG', marginPt, marginPt, contentWidthPt, totalScaledHeight)
  } else {
    // Multi-page: how many source pixels fit per page
    const sourcePixelsPerPage = Math.floor(contentHeightPt / scale)
    const totalPages = Math.ceil(img.height / sourcePixelsPerPage)

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage()

      const sourceY = page * sourcePixelsPerPage
      const sourceH = Math.min(sourcePixelsPerPage, img.height - sourceY)

      // Create a canvas for this page's slice
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = sourceH
      const ctx = canvas.getContext('2d')

      // White background to avoid any transparency artifacts
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the slice from the source image
      ctx.drawImage(img, 0, sourceY, img.width, sourceH, 0, 0, img.width, sourceH)

      const sliceUrl = canvas.toDataURL('image/jpeg', 0.95)
      const sliceHeightPt = sourceH * scale

      pdf.addImage(sliceUrl, 'JPEG', marginPt, marginPt, contentWidthPt, sliceHeightPt)
    }
  }

  pdf.save(`markdown-pdf-${theme.id}.pdf`)
}
