import { Input } from '../ui/Input'
import { cn } from '@/utils/cn'

interface LengthControlProps {
  length: number
  minLength: number
  maxLength: number
  isControlDisabled?: boolean
  onChange: (_val: number) => void
}

export const LengthControl = ({ length, minLength, maxLength, isControlDisabled, onChange }: LengthControlProps) => {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Length</span>

            <div className="relative group inline-block">
              <div className="w-4 h-4 bg-primary/20 text-primary border border-primary/30 rounded-full flex items-center justify-center text-[12px] cursor-help">
                i
              </div>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50 pointer-events-none">
                <div className="relative bg-gray-900 border border-gray-700 text-[11px] text-gray-300 p-2 rounded shadow-2xl">
                  <p className="w-40 text-center">Passwords with 16+ characters are significantly harder to crack.</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.25 w-2.5 h-2.5 rotate-45 bg-gray-900 border-r border-b border-gray-700 shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-20">
          <Input
            type="number"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={(e) => onChange(parseInt(e.target.value) || minLength)}
            className="text-center font-mono text-primary text-lg py-1 border-gray-700 focus:border-primary"
            disabled={isControlDisabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative w-full pt-2">
          <input
            type="range"
            min={minLength}
            max={maxLength}
            value={length}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={cn(
              'w-full h-2 bg-surface rounded-lg appearance-none transition-all',
              'accent-primary enabled:cursor-pointer enabled:active:cursor-grabbing',
              'disabled:cursor-not-allowed disabled:opacity-50' // Opacidad ayuda visualmente
            )}
            disabled={isControlDisabled}
          />
        </div>
        <div className="flex justify-between px-0.5 select-none pointer-events-none">
          <span className="text-[10px] font-bold text-text-muted font-mono">{minLength}</span>
          <span className="text-[10px] font-bold text-text-muted font-mono">{maxLength}</span>
        </div>
      </div>
    </section>
  )
}
