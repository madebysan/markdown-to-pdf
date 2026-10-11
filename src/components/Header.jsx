import { useState } from 'react'
import { printPdf } from '../utils/printPdf'

export default function Header({ theme }) {
  const [exporting, setExporting] = useState(false)

  async function handleDownload() {
    setExporting(true)
    try {
      await printPdf(theme)
    } catch (err) {
      console.error(err)
      window.alert("Couldn't create the PDF. Try again, or reload the page.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M2 2h5l1.5 2L10 2h4v12H2V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-gray-900 leading-tight">
            markdown<span className="text-blue-600">.pdf</span>
          </h1>
          <p className="text-xs text-gray-400 leading-tight">
            Themed PDF from markdown
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={exporting}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      >
        {exporting ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
              <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Exporting...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12v2h10v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </>
        )}
      </button>
    </header>
  )
}
