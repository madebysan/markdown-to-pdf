# markdown.pdf

Paste markdown, pick a theme, download a beautiful PDF. Everything runs client-side in the browser — no server, no accounts, no data leaves your machine.

**Try it:** https://markdown-to-pdf.vercel.app

## Features

- **6 themes** — Clean, Editorial, Mono, Warm, Bold, Playful
- **Live preview** — side-by-side editor with instant rendering
- **Direct PDF download** — no print dialog, backgrounds and colors preserved
- **Font size control** — Small, Medium, Large toggle
- **GFM support** — tables, task lists, strikethrough
- **Syntax highlighting** — code blocks with automatic language detection
- **Mobile friendly** — edit/preview tab toggle on small screens

## Themes

| Theme | Style |
|-------|-------|
| **Clean** | System fonts, black on white, no decoration |
| **Editorial** | Lora + Source Sans 3, elegant serif, brown accent |
| **Mono** | JetBrains Mono, green accent |
| **Warm** | Merriweather, earthy brown/terracotta text |
| **Bold** | Inter weight 900, huge headings, red accent |
| **Playful** | Nunito, colorful headings (purple, teal, pink) |

## Tech Stack

- Vite + React 19 + Tailwind CSS v4
- `react-markdown` + `remark-gfm` + `rehype-highlight`
- `html-to-image` + `jsPDF` for PDF export
- Google Fonts loaded on-demand per theme

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build

```bash
npm run build
```

Output goes to `dist/`.
