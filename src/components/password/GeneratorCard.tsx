'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useDebounce, useLocalStorage } from '@/hooks'
import { HistoryLog } from './HistoryLog'
import { PasswordDisplay } from './PasswordDisplay'
import { StrengthMeter } from './StrengthMeter'
import { CrackTime } from './CrackTime'
import { LengthControl } from './LenghtControl'
import { OptionsSection } from './OptionsSection'
import { AdvancedOptions } from './AdvancedOptions'
import { VisibilitySelector } from './VisibilitySelector'
import {
  generatePassword,
  getStrength,
  getTimeToCrack,
  MIN_LENGTH,
  MAX_LENGTH,
  DEFAULT_OPTIONS,
  DEFAULT_SETTINGS
} from '@/lib/password-utils'
import { DisplaySettings, GeneratorOptions, OnOptionChange } from '@/types/generator'

export default function Generator() {
  const [history, setHistory] = useLocalStorage<string[]>('pw_history', [])
  const [length, setLength] = useLocalStorage<number>('pw_length', 16)
  const [options, setOptions] = useLocalStorage<GeneratorOptions>('pw_generatorOptions', DEFAULT_OPTIONS)
  const [displaySettings, setDisplaySettings] = useLocalStorage<DisplaySettings>('pw_displaySettings', DEFAULT_SETTINGS)
  const debouncedLength = useDebounce<number>(length, 150)
  const isFirstRender = useRef(true)

  const password = useMemo(() => {
    return generatePassword({ length: debouncedLength, ...options })
  }, [debouncedLength, options])
  const lastDisplayedPassword = useRef<string>('')

  const isControlsDisabled = password === ''
  const score = useMemo(() => getStrength(password), [password])
  const crackTime = useMemo(() => getTimeToCrack(password), [password])

  const handleToggleDisplay = (key: 'strength' | 'crackTime') => {
    setDisplaySettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleOptionChange: OnOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  const handleLengthChange = (val: number) => {
    // 1. Evitar valores no numéricos
    if (isNaN(val)) return

    const absoluteMin = Math.max(MIN_LENGTH, options.minNumbers + options.minSpecial)

    const validatedLength = val < absoluteMin ? absoluteMin : val

    setLength(validatedLength)
  }

  const handleMinNumbersChange = (val: number) => {
    const newMinNumbers = val
    const totalMins = newMinNumbers + options.minSpecial

    if (totalMins > length) {
      setLength(totalMins)
    }

    setOptions((prev) => ({ ...prev, minNumbers: newMinNumbers }))
  }

  const handleMinSpecialChange = (val: number) => {
    setOptions((prev) => {
      const newMinSpecial = val
      const totalMins = prev.minNumbers + newMinSpecial

      if (totalMins > length) {
        setLength(totalMins)
      }

      return { ...prev, minSpecial: newMinSpecial }
    })
  }

  const clearHistory = () => setHistory([])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      lastDisplayedPassword.current = password
      return
    }

    if (password !== lastDisplayedPassword.current) {
      const passwordToStore = lastDisplayedPassword.current

      if (passwordToStore) {
        setHistory((prev) => {
          if (prev[0] === passwordToStore) return prev
          return [passwordToStore, ...prev].slice(0, 5)
        })
      }

      lastDisplayedPassword.current = password
    }
  }, [password, setHistory])

  return (
    <div className="max-w-md mx-auto p-6 bg-[#121826] text-white rounded-xl shadow-2xl border border-gray-800">
      <h2 className="text-xl font-bold mb-6">Generator</h2>

      <PasswordDisplay password={password} />

      <div className="space-y-6">
        <LengthControl
          length={length}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
          isControlDisabled={isControlsDisabled}
          onChange={handleLengthChange}
        />

        <div className="space-y-2">
          {displaySettings.strength && <StrengthMeter score={score} />}
          {displaySettings.crackTime && <CrackTime time={crackTime} />}
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
          onToggle={handleToggleDisplay}
        />

        <HistoryLog history={history} onClear={clearHistory} />
      </div>
    </div>
  )
}
