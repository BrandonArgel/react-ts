'use client'

import { toast } from 'sonner'
import { Button, Card } from '@/components/ui'
import { useClipboard } from '@/hooks'
import { cn } from '@/lib'

interface PasswordDisplayProps {
  password: string
}

export const PasswordDisplay = ({ password }: PasswordDisplayProps) => {
  const { copied, copy } = useClipboard()

  const handleCopy = (text: string) => {
    if (!text) return
    copy(text)
    toast.success('Password copied to clipboard')
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
        onClick={() => handleCopy(password)}
        disabled={!password}
      >
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </Card>
  )
}
