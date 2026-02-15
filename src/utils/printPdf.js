import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

// Export the preview as a PDF using html-to-image + jsPDF
// html-to-image uses the browser's native renderer (SVG foreignObject),
// so it handles all modern CSS including oklch colors from Tailwind v4.
// Downloads directly as a .pdf file — no print dialog.
export async function printPdf(theme) {
  const element = document.getElementById('pdf-content')
  if (!element) return

  // Capture the full preview as a high-res PNG
  const dataUrl = await toPng(element, {
    pixelRatio: 2, // 2x for sharp text
    cacheBust: true,
  })

  // Load the image to get its dimensions
  const img = new Image()
  img.src = dataUrl
  await new Promise((resolve) => { img.onload = resolve })

  // Set up PDF — letter size, points as unit
  const pdf = new jsPDF('p', 'pt', 'letter')
  const pageWidth = pdf.internal.pageSize.getWidth()   // 612pt
  const pageHeight = pdf.internal.pageSize.getHeight()  // 792pt
  const margin = 36 // 0.5 inch

  const contentWidth = pageWidth - margin * 2
  const scale = contentWidth / img.width
  const scaledFullHeight = img.height * scale
  const maxContentHeight = pageHeight - margin * 2

  // If it fits on one page, simple case
  if (scaledFullHeight <= maxContentHeight) {
    pdf.addImage(dataUrl, 'PNG', margin, margin, contentWidth, scaledFullHeight)
  } else {
    // Multi-page: slice the source image into page-sized chunks
    let sourceY = 0
    let page = 0
    const sourceSliceHeight = maxContentHeight / scale // how many source pixels per page

    while (sourceY < img.height) {
      if (page > 0) pdf.addPage()

      const remainingSourceHeight = img.height - sourceY
      const thisSliceHeight = Math.min(sourceSliceHeight, remainingSourceHeight)

      // Draw just this page's slice onto a temp canvas
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = thisSliceHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, sourceY, img.width, thisSliceHeight, 0, 0, img.width, thisSliceHeight)

      const sliceDataUrl = canvas.toDataURL('image/png')
      const scaledSliceHeight = thisSliceHeight * scale
      pdf.addImage(sliceDataUrl, 'PNG', margin, margin, contentWidth, scaledSliceHeight)

      sourceY += thisSliceHeight
      page++
    }
  }

  pdf.save(`markdown-pdf-${theme.id}.pdf`)
}
