export default function ThemeCard({ theme, isActive, onClick }) {
  const { preview } = theme

  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 w-36 rounded-lg border-2 p-3 text-left cursor-pointer
        transition-all duration-200
        ${isActive
          ? 'border-blue-600 ring-2 ring-blue-600/20 scale-[1.02]'
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
    >
      {/* Mini color preview */}
      <div
        className="w-full h-10 rounded-md mb-2 flex items-center justify-center text-xs font-medium"
        style={{ backgroundColor: preview.bg, color: preview.text }}
      >
        <span>Aa</span>
        <span className="ml-1" style={{ color: preview.accent }}>Bb</span>
      </div>

      <div className="text-sm font-semibold text-gray-900">{theme.name}</div>
      <div className="text-xs text-gray-500 leading-tight mt-0.5">
        {theme.description}
      </div>
    </button>
  )
}
