// Editorial — magazine/book feel, elegant serif body, white background
export default {
  id: 'editorial',
  name: 'Editorial',
  description: 'Magazine feel. Elegant serif.',
  preview: { bg: '#ffffff', text: '#1a1a1a', accent: '#8b5e3c' },
  fonts: {
    heading: '"Lora", Georgia, serif',
    body: '"Source Sans 3", "Source Sans Pro", sans-serif',
    code: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    google: 'Lora:wght@400;700&family=Source+Sans+3:wght@400;600',
  },
  colors: {
    '--theme-bg': '#ffffff',
    '--theme-text': '#1a1a1a',
    '--theme-heading': '#1a1a1a',
    '--theme-accent': '#8b5e3c',
    '--theme-muted': '#6b6b6b',
    '--theme-border': '#e0dcd4',
    '--theme-code-bg': '#f7f5f2',
    '--theme-blockquote-border': '#8b5e3c',
    '--theme-blockquote-text': '#4a4a4a',
  },
  spacing: {
    '--theme-content-max-width': '42rem',
    '--theme-heading-weight': '700',
    '--theme-body-size': '1.0625rem',
    '--theme-heading-scale': '1.3',
  },
}
