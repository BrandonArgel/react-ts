import { Card, CardHeader, CardContent } from '@components/ui'
import { useGenerator } from './hooks/useGenerator'
import { PasswordDisplay } from './components/PasswordDisplay'
import { LengthControl } from './components/LengthControl'
import { StrengthMeter } from './components/StrengthMeter'
import { CrackTime } from './components/CrackTime'
import { OptionsSection } from './components/OptionsSection'
import { AdvancedOptions } from './components/AdvancedOptions'
import { VisibilitySelector } from './components/VisibilitySelector'
import { HistoryLog } from './components/HistoryLog'
import { MIN_LENGTH, MAX_LENGTH } from './types'

export default function GeneratorCard() {
  const {
    password,
    history,
    length,
    options,
    displaySettings,
    score,
    crackTime,
    securityLevel,
    securityLevelByScore,
    handleLengthChange,
    handleMinNumbersChange,
    handleMinSpecialChange,
    handleOptionChange,
    toggleDisplay,
    clearHistory
  } = useGenerator()

  return (
    <Card className="max-w-md mx-auto" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Generator</h2>
      </CardHeader>

      <CardContent>
        <PasswordDisplay password={password} />

        <LengthControl length={length} minLength={MIN_LENGTH} maxLength={MAX_LENGTH} onChange={handleLengthChange} />

        <div className="space-y-2">
          {displaySettings.strength && <StrengthMeter score={score} level={securityLevelByScore} />}
          {displaySettings.crackTime && <CrackTime time={crackTime} level={securityLevel} />}
        </div>

        <OptionsSection options={options} onChange={handleOptionChange} />

        <AdvancedOptions
          options={options}
          onOptionChange={handleOptionChange}
          onMinNumbersChange={handleMinNumbersChange}
          onMinSpecialChange={handleMinSpecialChange}
        />

        <VisibilitySelector
          showStrength={displaySettings.strength}
          showCrackTime={displaySettings.crackTime}
          onToggle={toggleDisplay}
        />

        <HistoryLog history={history} onClear={clearHistory} />
      </CardContent>
    </Card>
  )
}
