// Mono — monospace everything, white background, green accent
export default {
  id: 'mono',
  name: 'Mono',
  description: 'Monospace. Green accent.',
  preview: { bg: '#ffffff', text: '#1a1a1a', accent: '#16a34a' },
  fonts: {
    heading: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
    code: '"JetBrains Mono", ui-monospace, monospace',
    google: 'JetBrains+Mono:wght@400;700',
  },
  colors: {
    '--theme-bg': '#ffffff',
    '--theme-text': '#1a1a1a',
    '--theme-heading': '#111111',
    '--theme-accent': '#16a34a',
    '--theme-muted': '#6b7280',
    '--theme-border': '#d1d5db',
    '--theme-code-bg': '#f3f4f6',
    '--theme-blockquote-border': '#16a34a',
    '--theme-blockquote-text': '#4b5563',
  },
  spacing: {
    '--theme-content-max-width': '48rem',
    '--theme-heading-weight': '700',
    '--theme-body-size': '0.9375rem',
    '--theme-heading-scale': '1.2',
  },
}
