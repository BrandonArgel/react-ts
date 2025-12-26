import { getPerfectlySecureRandomNumber } from '@/lib/randonmNumber'

interface Config {
  length: number
  upper: boolean
  lower: boolean
  number: boolean
  special: boolean
  avoidAmbiguous: boolean
  minNumbers: number
  minSpecial: number
}

export const generatePassword = (config: Config) => {
  const special = '!@#$%^&*'
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lower = 'abcdefghijklmnopqrstuvwxyz'
  let number = '0123456789'

  if (config.avoidAmbiguous) {
    const ambiguousRegex = /[lI1O0oS5B82Z]/g

    upper = upper.replace(ambiguousRegex, '')
    lower = lower.replace(ambiguousRegex, '')
    number = number.replace(ambiguousRegex, '')
  }

  const sets = { upper, lower, number, special }

  const passwordArr: string[] = []
  let pool = ''

  if (config.number) {
    for (let i = 0; i < config.minNumbers; i++) {
      passwordArr.push(sets.number[getPerfectlySecureRandomNumber(0, sets.number.length - 1)])
    }
    pool += sets.number
  }

  if (config.special) {
    for (let i = 0; i < config.minSpecial; i++) {
      passwordArr.push(sets.special[getPerfectlySecureRandomNumber(0, sets.special.length - 1)])
    }
    pool += sets.special
  }

  if (config.upper) pool += sets.upper
  if (config.lower) pool += sets.lower

  if (!pool) return ''

  while (passwordArr.length < config.length) {
    passwordArr.push(pool[getPerfectlySecureRandomNumber(0, pool.length - 1)])
  }

  // Algorithm Fisher-Yates Shuffle
  for (let i = passwordArr.length - 1; i > 0; i--) {
    const j = getPerfectlySecureRandomNumber(0, i)
    ;[passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]]
  }

  return passwordArr.join('')
}

export const getStrength = (password: string) => {
  if (!password) return 0
  if (password.length < 6) return 1

  let score = 0

  // Length
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  // Diversity
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const diversityCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length

  // If it has 3 or more character types, add points
  if (diversityCount >= 3) score += 1
  if (diversityCount === 4) score += 1

  // 3. Penalties
  // Repetitions (aaa, 111)
  if (/(.)\1{2,}/.test(password)) score -= 1

  // Common sequences (optional but recommended)
  // If only numbers or only letters, subtract 1
  if (/^\d+$/.test(password) || /^[a-zA-Z]+$/.test(password)) score -= 1

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
  const combinations = Math.pow(charsetSize, password.length)

  // Seconds = combinations / attempts per second (Modern computer ~100 billion attempts/second)
  const seconds = combinations / 100_000_000_000

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

export type SecurityLevel = 'low' | 'mid' | 'high' | 'safe'

export const getSecurityLevelByScore = (score: number): SecurityLevel => {
  if (score <= 2) return 'low'
  if (score === 3) return 'mid'
  if (score === 4) return 'high'
  return 'safe'
}

export const getSecurityLevel = (time: string): SecurityLevel => {
  const t = time.toLowerCase()
  if (t.includes('sec') || t.includes('instan') || t.includes('min')) return 'low'
  if (t.includes('hour') || t.includes('day')) return 'mid'
  if (t.includes('year') && !t.includes('centur')) return 'high'
  return 'safe'
}
