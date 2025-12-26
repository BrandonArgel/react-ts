import { memo } from 'react'
import { Card, Checkbox } from '@components/ui'
import { GeneratorOptions, OnOptionChange } from '../../features/password-generator/types'

interface OptionsSectionProps {
  options: GeneratorOptions
  onChange: OnOptionChange
}

const OptionsSectionImpl = ({ options, onChange }: OptionsSectionProps) => {
  return (
    <Card as="section" variant="secondary" padding="sm" className="space-y-4 border-white/5 bg-surface/30">
      <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Include Characters</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <Checkbox label="a-z" checked={options.lower} onChange={() => onChange('lower', !options.lower)} />
        <Checkbox label="A-Z" checked={options.upper} onChange={() => onChange('upper', !options.upper)} />
        <Checkbox label="0-9" checked={options.number} onChange={() => onChange('number', !options.number)} />
        <Checkbox label="!@#$%^&*" checked={options.special} onChange={() => onChange('special', !options.special)} />
      </div>
    </Card>
  )
}

export const OptionsSection = memo(OptionsSectionImpl)
