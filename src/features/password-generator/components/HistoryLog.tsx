import { Trash2 } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { HistoryItem } from './HistoryItem'
import { Button } from '@/components/ui'

export const HistoryLogImpl = ({ history, onClear }: { history: string[]; onClear: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)

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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClearRequest}
          className="p-1.5 text-text-muted hover:text-red-400 transition-colors group"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="relative">
        {history.length === 0 ? (
          <p className="text-center text-xs text-gray-600 py-4 italic">No history yet</p>
        ) : (
          <ul className="grid grid-cols-1 gap-2">
            {history.slice(0, 5).map((pw, index) => (
              <HistoryItem
                key={pw}
                pw={pw}
                index={index}
                shouldAnimate={isInitialRender || index === 0}
                isDeleting={isDeleting}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export const HistoryLog = memo(HistoryLogImpl)
