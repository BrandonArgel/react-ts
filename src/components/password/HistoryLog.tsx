import { HistoryItem } from './HistoryItem'
import { memo, useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

export const HistoryLogImpl = ({ history, onClear }: { history: string[]; onClear: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)

  // Efecto para controlar la animación inicial de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialRender(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClearRequest = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onClear()
      setIsDeleting(false)
    }, 300)
  }

  if (history.length === 0) return null

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Recent Passwords</h3>
        <button
          onClick={handleClearRequest}
          className="p-1.5 text-text-muted hover:text-red-400 transition-colors group"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <ul className="space-y-2">
        {history.map((pw, index) => (
          <HistoryItem
            key={pw}
            pw={pw}
            index={index}
            // Si es la carga inicial, todos se animan.
            // Si no, solo el primero (index === 0)
            shouldAnimate={isInitialRender || index === 0}
            isDeleting={isDeleting}
          />
        ))}
      </ul>
    </div>
  )
}

export const HistoryLog = memo(HistoryLogImpl)
