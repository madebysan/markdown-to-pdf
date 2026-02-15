// Playful — rounded, colorful headings (purple h1, teal h2, pink h3), white background
export default {
  id: 'playful',
  name: 'Playful',
  description: 'Rounded and colorful. Fun.',
  preview: { bg: '#ffffff', text: '#2d2d3f', accent: '#7c3aed' },
  fonts: {
    heading: '"Nunito", system-ui, sans-serif',
    body: '"Nunito", system-ui, sans-serif',
    code: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    google: 'Nunito:wght@400;600;700;800',
  },
  colors: {
    '--theme-bg': '#ffffff',
    '--theme-text': '#2d2d3f',
    '--theme-heading': '#7c3aed',
    '--theme-accent': '#7c3aed',
    '--theme-muted': '#6b7280',
    '--theme-border': '#e9e5f0',
    '--theme-code-bg': '#f5f3ff',
    '--theme-blockquote-border': '#7c3aed',
    '--theme-blockquote-text': '#4b5563',
    // Playful-specific: colorful headings
    '--theme-h1-color': '#7c3aed',
    '--theme-h2-color': '#0d9488',
    '--theme-h3-color': '#ec4899',
  },
  spacing: {
    '--theme-content-max-width': '46rem',
    '--theme-heading-weight': '800',
    '--theme-body-size': '1rem',
    '--theme-heading-scale': '1.3',
  },
}
