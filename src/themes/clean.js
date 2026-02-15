// Clean — printer-friendly, no decoration, system fonts
export default {
  id: 'clean',
  name: 'Clean',
  description: 'Printer-friendly. Black on white.',
  preview: { bg: '#ffffff', text: '#111111', accent: '#2563eb' },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    code: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    google: null, // no Google Fonts needed
  },
  colors: {
    '--theme-bg': '#ffffff',
    '--theme-text': '#111111',
    '--theme-heading': '#111111',
    '--theme-accent': '#2563eb',
    '--theme-muted': '#6b7280',
    '--theme-border': '#e5e7eb',
    '--theme-code-bg': '#f3f4f6',
    '--theme-blockquote-border': '#d1d5db',
    '--theme-blockquote-text': '#4b5563',
  },
  spacing: {
    '--theme-content-max-width': '48rem',
    '--theme-heading-weight': '700',
    '--theme-body-size': '1rem',
    '--theme-heading-scale': '1.25',
  },
}
