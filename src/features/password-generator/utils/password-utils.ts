import { getPerfectlySecureRandomNumber } from '@/lib/randomNumber'

interface Config {
  length: number
  upper: boolean
  lower: boolean
  number: boolean
  special: boolean
  avoidAmbiguous: boolean
  avoidRepeated: boolean
  avoidSequences: boolean
  minNumbers: number
  minSpecial: number
}

export const generatePassword = (config: Config): string => {
  const special = '!@#$%^&*'
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lower = 'abcdefghijklmnopqrstuvwxyz'
  let number = '0123456789'

  // Clean ambiguous characters
  if (config.avoidAmbiguous) {
    const ambiguous = 'lI1O0oS5B82Z'
    const filter = (str: string) =>
      str
        .split('')
        .filter((c) => !ambiguous.includes(c))
        .join('')
    upper = filter(upper)
    lower = filter(lower)
    number = filter(number)
  }

  const sets = { upper, lower, number, special }
  const passwordArr: string[] = []
  let pool = ''

  // Ensure minimums
  if (config.number) {
    for (let i = 0; i < config.minNumbers; i++) passwordArr.push(getRandomChar(sets.number))
    pool += sets.number
  }
  if (config.special) {
    for (let i = 0; i < config.minSpecial; i++) passwordArr.push(getRandomChar(sets.special))
    pool += sets.special
  }
  if (config.upper) {
    passwordArr.push(getRandomChar(sets.upper))
    pool += sets.upper
  }
  if (config.lower) {
    passwordArr.push(getRandomChar(sets.lower))
    pool += sets.lower
  }

  if (!pool) return ''

  // Fill until desired length
  while (passwordArr.length < config.length) {
    passwordArr.push(getRandomChar(pool))
  }

  // Shuffle with intelligent validation
  const result = [...passwordArr]

  const validateAndFix = () => {
    let hasIssues = false
    for (let i = 0; i < result.length; i++) {
      const isSequence = config.avoidSequences && checkSequenceAt(result, i)
      const isRepeated = config.avoidRepeated && i > 0 && result[i] === result[i - 1]

      if (isSequence || isRepeated) {
        hasIssues = true
        const swapIdx = (i + Math.floor(result.length / 2)) % result.length
        ;[result[i], result[swapIdx]] = [result[swapIdx], result[i]]
      }
    }
    return hasIssues
  }

  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = getPerfectlySecureRandomNumber(0, i)
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  // Maximum 5 passes of correction to avoid infinite loops in small pools
  let corrections = 0
  while (validateAndFix() && corrections < 5) {
    corrections++
  }

  return result.join('')
}

// --- Helpers ---

const getRandomChar = (str: string) => str[getPerfectlySecureRandomNumber(0, str.length - 1)]

const checkSequenceAt = (arr: string[], i: number): boolean => {
  if (i < 2) return false
  const c1 = arr[i - 2].charCodeAt(0)
  const c2 = arr[i - 1].charCodeAt(0)
  const c3 = arr[i].charCodeAt(0)
  // Ascending (abc/123) or Descending (cba/321)
  return (c2 === c1 + 1 && c3 === c2 + 1) || (c2 === c1 - 1 && c3 === c2 - 1)
}

export const getStrength = (password: string) => {
  if (!password) return 0
  const length = password.length

  // Penalty for critical length
  if (length < 8) return 1

  // 1. Entropy calculation
  let poolSize = 0
  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 33

  const entropy = length * Math.log2(poolSize || 1)

  /**
   * Entropy thresholds:
   * < 40: Very Weak (1)
   * 40-59: Weak (2)
   * 60-79: Reasonable (3)
   * 80-100: Strong (4)
   * > 100: Very Strong (5) -> 16 chars con variedad ya alcanzan ~105 bits
   */
  let score = 0
  if (entropy > 100) score = 5
  else if (entropy > 80) score = 4
  else if (entropy > 60) score = 3
  else if (entropy > 40) score = 2
  else score = 1

  // 2. Adjustments for Diversity and Patterns
  const types = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length

  // Bonus for using multiple types of characters
  if (types === 4 && length >= 12) score = Math.max(score, 4)

  // Penalties (Directly reduce the score)
  // Repeticiones consecutivas (aaa)
  if (/(.)\1{1,}/.test(password)) score -= 1

  // Sequences (abc, 123)
  if (checkHasSequence(password)) score -= 1

  // Passwords of a single type (only numbers or only letters)
  if (types <= 1) score = Math.min(score, 2)

  return Math.max(1, Math.min(score, 5))
}

export const getTimeToCrack = (password: string): string => {
  if (!password) return 'N/A'

  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 33

  // Calculate the number of combinations
  // Using Math.pow for compatibility (BigInt syntax requires ES2020+)
  const combinations = Math.pow(charsetSize, password.length)

  // Attempts per second (Modern GPU clusters ~ 1 Trillion/sec)
  const attemptsPerSecond = 1_000_000_000_000

  const seconds = combinations / attemptsPerSecond

  if (seconds < 1) return 'Instantly'
  if (seconds < 60) return `${Math.floor(seconds)} seconds`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`
  if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)} years`

  const centuries = Math.floor(seconds / 3153600000)
  if (centuries < 1000) return `${centuries} centuries`
  return 'Eons (Practically unbreakable)'
}

export type SecurityLevel = 'low' | 'mid' | 'high' | 'safe' | 'N/A'

export const getSecurityLevelByScore = (score: number): SecurityLevel => {
  if (score === 0) return 'N/A'
  if (score <= 2) return 'low'
  if (score === 3) return 'mid'
  if (score === 4) return 'high'
  return 'safe'
}

export const getSecurityLevelByTime = (time: string): SecurityLevel => {
  const t = time.toLowerCase()
  if (!time || t === 'n/a') return 'N/A'
  if (t.includes('sec') || t.includes('instan') || t.includes('min')) return 'low'
  if (t.includes('hour') || t.includes('day')) return 'mid'
  if (t.includes('year') && !t.includes('centur')) return 'high'
  return 'safe'
}

const checkHasSequence = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    const c1 = password.charCodeAt(i)
    const c2 = password.charCodeAt(i + 1)
    const c3 = password.charCodeAt(i + 2)

    const isAlphaNum = (code: number) =>
      (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)

    if (isAlphaNum(c1) && isAlphaNum(c2) && isAlphaNum(c3)) {
      if ((c2 === c1 + 1 && c3 === c2 + 1) || (c2 === c1 - 1 && c3 === c2 - 1)) {
        return true
      }
    }
  }
  return false
}

export const getPasswordFeedback = (password: string) => {
  if (!password) return []
  const requirements = [
    { id: 'length', label: 'Increase length (min. 16 characters)', met: password.length >= 16 },
    { id: 'upper', label: 'Include an uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'lower', label: 'Include a lowercase letter', met: /[a-z]/.test(password) },
    { id: 'number', label: 'Add a number', met: /[0-9]/.test(password) },
    { id: 'special', label: 'Use a special character', met: /[^A-Za-z0-9]/.test(password) },
    { id: 'repeated', label: 'Avoid consecutive characters', met: !/(.)\1/.test(password) },
    { id: 'sequence', label: 'Avoid character sequences (e.g. abc, 123)', met: !checkHasSequence(password) }
  ]

  const suggestions = requirements
    .filter((req) => !req.met)
    .map((req) => ({
      id: req.id,
      message: req.label
    }))

  return suggestions
}
