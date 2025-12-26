import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'
import { GeneratorOptions, OnOptionChange } from '@/types/generator'

interface Props {
  options: GeneratorOptions
  onOptionChange: OnOptionChange
  onMinNumbersChange: (_val: number) => void
  onMinSpecialChange: (_val: number) => void
}

export const AdvancedOptions = ({ options, onOptionChange, onMinNumbersChange, onMinSpecialChange }: Props) => {
  return (
    <section className="bg-surface/50 p-4 rounded-xl border border-border space-y-4">
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
            className="bg-[#121826] text-center disabled:opacity-30"
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
            className="bg-[#121826] text-center disabled:opacity-30"
          />
        </div>
      </div>
    </section>
  )
}
