export default function MarkdownInput({ value, onChange }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Markdown
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-4 font-mono text-sm text-gray-800 bg-white border border-gray-200 border-t-0 rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        placeholder="Paste or type your markdown here..."
        spellCheck={false}
      />
    </div>
  )
}
