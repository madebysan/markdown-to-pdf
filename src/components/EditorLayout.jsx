import { useState } from 'react'
import MarkdownInput from './MarkdownInput'
import MarkdownPreview from './MarkdownPreview'

export default function EditorLayout({ markdown, onChange, theme, fontSize }) {
  // Mobile: tab toggle between edit and preview
  const [activeTab, setActiveTab] = useState('edit')

  return (
    <div className="flex-1 px-4 py-4 min-h-0">
      {/* Mobile tab switcher */}
      <div className="flex md:hidden mb-2 gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'edit'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Desktop: side-by-side grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 h-full">
        <MarkdownInput value={markdown} onChange={onChange} />
        <MarkdownPreview markdown={markdown} theme={theme} fontSize={fontSize} />
      </div>

      {/* Mobile: show active tab */}
      <div className="md:hidden h-full">
        {activeTab === 'edit' ? (
          <MarkdownInput value={markdown} onChange={onChange} />
        ) : (
          <MarkdownPreview markdown={markdown} theme={theme} fontSize={fontSize} />
        )}
      </div>
    </div>
  )
}
