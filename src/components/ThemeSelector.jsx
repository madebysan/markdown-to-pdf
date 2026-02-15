import ThemeCard from './ThemeCard'

export default function ThemeSelector({ themes, activeTheme, onSelect, fontSizes, activeFontSize, onFontSizeChange }) {
  return (
    <section className="px-5 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Theme
        </span>
        <div className="flex-1 h-px bg-gray-100" />

        {/* Font size toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Size</span>
          <div className="flex gap-0.5 bg-gray-100 rounded-md p-0.5">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => onFontSizeChange(size)}
                className={`px-2 py-0.5 text-xs font-medium rounded cursor-pointer transition-colors ${
                  activeFontSize.id === size.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isActive={activeTheme.id === theme.id}
            onClick={() => onSelect(theme)}
          />
        ))}
      </div>
    </section>
  )
}
