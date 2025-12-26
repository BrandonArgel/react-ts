export const DEFAULT_LENGTH = 16
export const MIN_LENGTH = 5
export const MAX_LENGTH = 128

export const DEFAULT_OPTIONS: GeneratorOptions = {
  upper: true,
  lower: true,
  number: true,
  special: false,
  avoidAmbiguous: false,
  minNumbers: 2,
  minSpecial: 2
}

export const DEFAULT_SETTINGS = {
  strength: true,
  crackTime: true
}

export interface GeneratorOptions {
  upper: boolean
  lower: boolean
  number: boolean
  special: boolean
  avoidAmbiguous: boolean
  minNumbers: number
  minSpecial: number
}

export interface DisplaySettings {
  strength: boolean
  crackTime: boolean
}

export const OPTION_KEYS = {
  UPPER: 'upper',
  LOWER: 'lower',
  NUMBER: 'number',
  SPECIAL: 'special',
  AMBIGUOUS: 'avoidAmbiguous',
  MIN_NUMBERS: 'minNumbers',
  MIN_SPECIAL: 'minSpecial'
} as const

export type OnOptionChange = (_key: keyof GeneratorOptions, _value: boolean | number) => void
