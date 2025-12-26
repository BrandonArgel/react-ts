'use client'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useClipboard } from '@/hooks'
import { cn } from '@/utils'

interface HistoryItemProps {
  pw: string
  index: number
  shouldAnimate: boolean
  isDeleting: boolean
}

export const HistoryItem = ({ pw, index, shouldAnimate, isDeleting }: HistoryItemProps) => {
  const { copied, copy } = useClipboard()

  return (
    <li
      style={{ animationDelay: `${index * 80}ms` }}
      className={cn(
        'group flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-border/50',
        shouldAnimate ? 'animate-slide-in' : 'opacity-100',
        isDeleting && 'animate-slide-out'
      )}
    >
      <span className="font-mono text-sm text-gray-400 group-hover:text-white truncate pr-4">{pw}</span>

      <Button variant="ghost" size="icon" onClick={() => copy(pw)} title="Copy password">
        {copied ? (
          <Check className="w-4 h-4 text-green-500 animate-check-in" />
        ) : (
          <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
      </Button>
    </li>
  )
}
