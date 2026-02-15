import { useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function MarkdownPreview({ markdown, theme, fontSize }) {
  // Build CSS custom properties from theme + font size override
  const themeStyle = useMemo(() => {
    const style = { ...theme.colors, ...theme.spacing }
    style['--theme-heading-font'] = theme.fonts.heading
    style['--theme-body-font'] = theme.fonts.body
    style['--theme-code-font'] = theme.fonts.code
    // Override body size with user's font size selection
    if (fontSize) {
      style['--theme-body-size'] = fontSize.rem
    }
    return style
  }, [theme, fontSize])

  return (
    <div className="flex flex-col h-full">
      <div className="preview-header flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Preview
        </span>
        <span className="text-xs text-gray-400">
          {theme.name} theme
        </span>
      </div>
      <div
        className={`preview-wrapper flex-1 overflow-auto border border-gray-200 border-t-0 rounded-b-lg`}
        style={{ backgroundColor: theme.colors['--theme-bg'] }}
      >
        <div
          id="pdf-content"
          className={`themed-preview theme-${theme.id} prose max-w-none p-6 mx-auto`}
          style={themeStyle}
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  )
}
