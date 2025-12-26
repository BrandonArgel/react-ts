'use client'

import { useState } from 'react'
import { Button, Card } from '@/components/ui'
import { cn } from '@/lib'

export const PasswordDisplay = ({ password }: { password: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card variant="secondary" padding="sm" className="mb-6 flex justify-between items-center gap-4 group min-h-16">
      <span
        className={`font-password text-lg break-all ${!password ? 'text-text-muted italic' : 'text-white font-medium'}`}
      >
        {password || 'Select options to generate...'}
      </span>

      <Button
        variant={copied ? 'success' : 'primary'}
        className={cn(copied && 'animate-copy-pop')}
        onClick={handleCopy}
        disabled={!password}
      >
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </Card>
  )
}
