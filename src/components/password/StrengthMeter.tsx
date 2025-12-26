import { cn } from '@/utils'

interface StrengthMeterProps {
  score: number
}

export const StrengthMeter = ({ score }: StrengthMeterProps) => {
  // Mapeo estático que Tailwind detecta sin problemas
  const strengthConfig = {
    0: { label: '', color: 'text-gray-500', bg: 'bg-gray-800' },
    1: { label: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500' },
    2: { label: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500' },
    3: { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500' },
    4: { label: 'Strong', color: 'text-blue-500', bg: 'bg-blue-500' },
    5: { label: 'Very Strong', color: 'text-green-500', bg: 'bg-green-500' }
  } as const

  const current = strengthConfig[score as keyof typeof strengthConfig]

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
        <span>Strength</span>
        <span className={cn('transition-colors duration-500', current.color)}>{current.label}</span>
      </div>

      <div className="flex gap-1.5 h-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn('flex-1 rounded-full transition-all duration-500', i < score ? current.bg : 'bg-gray-800')}
          />
        ))}
      </div>
    </div>
  )
}
