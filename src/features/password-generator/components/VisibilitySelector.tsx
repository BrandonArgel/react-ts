import { ChevronDown } from 'lucide-react'
import { Checkbox } from '@components/ui'

interface VisibilitySelectorProps {
  showStrength: boolean
  showCrackTime: boolean
  onToggle: (_key: 'strength' | 'crackTime') => void
}

export const VisibilitySelector = ({ showStrength, showCrackTime, onToggle }: VisibilitySelectorProps) => {
  return (
    <div className="mt-6 border-t border-border pt-4">
      <details className="group overflow-hidden">
        <summary className="flex items-center justify-between cursor-pointer list-none text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] hover:text-white transition-all duration-300">
          <span>Display Settings</span>
          <div className="flex items-center gap-2">
            <ChevronDown className="w-3 h-3 transition-transform duration-300 group-open:rotate-180" />
          </div>
        </summary>

        <div
          className="grid grid-cols-1 gap-3 mt-4 p-4 rounded-xl border border-border/50 bg-surface/30 
                        transition-all duration-500 ease-in-out
                        opacity-0 -translate-y-2.5 group-open:opacity-100 group-open:translate-y-0"
        >
          <Checkbox label="Show Strength Meter" checked={showStrength} onChange={() => onToggle('strength')} />
          <Checkbox label="Show Time to Crack" checked={showCrackTime} onChange={() => onToggle('crackTime')} />
        </div>
      </details>
    </div>
  )
}
