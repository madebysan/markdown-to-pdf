<h1>markdown.pdf</h1>

<p>Paste markdown, pick a theme, download a beautiful PDF.<br>
Client-side, no server, no accounts, no data leaves your machine.</p>

<p>
  <img src="https://img.shields.io/badge/React-61dafb" alt="React">
  <img src="https://img.shields.io/badge/Vite-646cff" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-38bdf8" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vercel-000000" alt="Vercel">
</p>

<p><a href="https://web-markdown-to-pdf.vercel.app/">Try it live →</a></p>

## Features

- **6 themes** – Clean, Editorial, Mono, Warm, Bold, Playful
- **Live preview** – side-by-side editor with instant rendering
- **Direct PDF download** – no print dialog, backgrounds and colors preserved
- **Font size control** – Small, Medium, Large toggle
- **GFM support** – tables, task lists, strikethrough
- **Syntax highlighting** – code blocks with automatic language detection
- **Mobile friendly** – edit/preview tab toggle on small screens

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

## Feedback

Found a bug or have a feature idea? [Open an issue](https://github.com/madebysan/markdown-to-pdf/issues).

## License

[MIT](LICENSE)

---

Made by [santiagoalonso.com](https://santiagoalonso.com)
