// Dynamically load Google Fonts by injecting <link> tags
// Tracks which fonts are already loaded to avoid duplicate requests
const loadedFonts = new Set()

export function loadFonts(theme) {
  const googleFonts = theme.fonts.google
  if (!googleFonts || loadedFonts.has(googleFonts)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`
  document.head.appendChild(link)

  loadedFonts.add(googleFonts)
}
