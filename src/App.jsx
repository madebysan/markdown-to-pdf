import { useState, useEffect } from 'react'
import Header from './components/Header'
import ThemeSelector from './components/ThemeSelector'
import EditorLayout from './components/EditorLayout'
import themes from './themes'
import { loadFonts } from './utils/loadFonts'
import defaultMarkdown from './utils/defaultMarkdown'

const fontSizes = [
  { id: 'small', label: 'S', rem: '0.8rem' },
  { id: 'medium', label: 'M', rem: '0.9rem' },
  { id: 'big', label: 'L', rem: '1rem' },
]

// Work is kept in this browser only, so a refresh doesn't lose it
const STORAGE_KEY = 'markdown-pdf:v1'

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [saved] = useState(loadSaved)
  const [markdown, setMarkdown] = useState(saved.markdown ?? defaultMarkdown)
  const [theme, setTheme] = useState(() => themes.find((t) => t.id === saved.theme) || themes[0]) // Clean is default
  const [fontSize, setFontSize] = useState(() => fontSizes.find((f) => f.id === saved.fontSize) || fontSizes[1]) // Medium default

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ markdown, theme: theme.id, fontSize: fontSize.id }))
    } catch {
      // Storage full or blocked: the editor still works, it just won't remember
    }
  }, [markdown, theme, fontSize])

  // Load Google Fonts whenever theme changes
  useEffect(() => {
    loadFonts(theme)
  }, [theme])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header theme={theme} />
      <ThemeSelector
        themes={themes}
        activeTheme={theme}
        onSelect={setTheme}
        fontSizes={fontSizes}
        activeFontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
      <EditorLayout
        markdown={markdown}
        onChange={setMarkdown}
        theme={theme}
        fontSize={fontSize}
      />
    </div>
  )
}
