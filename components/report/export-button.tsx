"use client"

import { Download } from "lucide-react"

export function ExportButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md bg-surface-high hover:bg-surface-mid"
    >
      <Download size={12} />
      Export PDF
    </button>
  )
}
