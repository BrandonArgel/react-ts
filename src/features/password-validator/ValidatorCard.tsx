import { useMemo, useState } from 'react'
import { Card, CardHeader, CardContent, Input } from '@components/ui'
import {
  getSecurityLevel,
  getSecurityLevelByScore,
  getStrength,
  getTimeToCrack
} from '../password-generator/utils/password-utils'
import { StrengthMeter } from '@components/password'
import { CrackTime } from '@components/password'
import { useDebounce } from '@/hooks'

export default function ValidatorCard() {
  const [password, setPassword] = useState('')
  const debouncedInput = useDebounce(password, 500)
  const score = useMemo(() => getStrength(debouncedInput), [debouncedInput])
  const crackTime = useMemo(() => getTimeToCrack(debouncedInput), [debouncedInput])
  const securityLevel = useMemo(() => getSecurityLevel(crackTime), [crackTime])
  const securityLevelByScore = useMemo(() => getSecurityLevelByScore(score), [score])

  return (
    <Card className="max-w-md mx-auto" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Password Validator</h2>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 items-center">
          <Input
            type="password"
            placeholder="Enter password to validate"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-10 w-10 flex items-center justify-center bg-surface border border-border rounded-lg font-mono text-sm text-primary">
            {password.length}
          </div>
        </div>

        <div className="space-y-2">
          <StrengthMeter score={score} level={securityLevelByScore} />
          <CrackTime time={crackTime} level={securityLevel} />
        </div>
      </CardContent>
    </Card>
  )
}
