// Bold — high contrast black/white, huge headings, one accent color
export default {
  id: 'bold',
  name: 'Bold',
  description: 'High contrast. Huge headings.',
  preview: { bg: '#ffffff', text: '#000000', accent: '#dc2626' },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    code: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    google: 'Inter:wght@400;600;800;900',
  },
  colors: {
    '--theme-bg': '#ffffff',
    '--theme-text': '#000000',
    '--theme-heading': '#000000',
    '--theme-accent': '#dc2626',
    '--theme-muted': '#525252',
    '--theme-border': '#000000',
    '--theme-code-bg': '#f5f5f5',
    '--theme-blockquote-border': '#dc2626',
    '--theme-blockquote-text': '#262626',
  },
  spacing: {
    '--theme-content-max-width': '48rem',
    '--theme-heading-weight': '900',
    '--theme-body-size': '1rem',
    '--theme-heading-scale': '1.5',
  },
}
