import { Card, Checkbox, Input } from '@components/ui'
import { GeneratorOptions, OnOptionChange } from '../types'

interface Props {
  options: GeneratorOptions
  onOptionChange: OnOptionChange
  onMinNumbersChange: (_val: number) => void
  onMinSpecialChange: (_val: number) => void
}

export const AdvancedOptions = ({ options, onOptionChange, onMinNumbersChange, onMinSpecialChange }: Props) => {
  return (
    <Card as="section" variant="secondary" padding="sm" className="space-y-4 border-white/5 bg-surface/30">
      <Checkbox
        label="Avoid Ambiguous Characters"
        checked={options.avoidAmbiguous}
        onChange={() => onOptionChange('avoidAmbiguous', !options.avoidAmbiguous)}
      />

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Min. Numbers</label>
          <Input
            type="number"
            min={0}
            max={10}
            value={options.minNumbers}
            disabled={!options.number}
            onChange={(e) => onMinNumbersChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Min. Special</label>
          <Input
            type="number"
            min={0}
            max={10}
            value={options.minSpecial}
            disabled={!options.special}
            onChange={(e) => onMinSpecialChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
      </div>
    </Card>
  )
}
