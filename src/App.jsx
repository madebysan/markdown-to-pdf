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

export default function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [theme, setTheme] = useState(themes[0]) // Clean is default
  const [fontSize, setFontSize] = useState(fontSizes[1]) // Medium default

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
