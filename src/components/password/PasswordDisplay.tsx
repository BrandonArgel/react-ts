'use client'
import { useState } from 'react'

export const PasswordDisplay = ({ password }: { password: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface p-4 rounded-lg mb-6 flex justify-between items-center border border-border transition-all">
      <span
        className={`font-password text-lg break-all ${!password ? 'text-text-muted italic' : 'text-white font-medium'}`}
      >
        {password || 'Select options to generate...'}
      </span>

      <button
        onClick={handleCopy}
        disabled={!password}
        className={`
          px-4 py-1.5 rounded-md text-sm font-bold tracking-wide transition-all duration-200
          disabled:opacity-30 disabled:cursor-not-allowed
          ${
            copied
              ? 'bg-success text-white animate-copy-pop shadow-[0_0_15px_rgba(22,163,74,0.4)]'
              : 'bg-primary text-white enabled:hover:bg-primary-hover shadow-sm'
          }
        `}
      >
        <span className="flex items-center gap-1">
          {copied ? (
            <>
              <span className="text-xs">✓</span> Copied
            </>
          ) : (
            'Copy'
          )}
        </span>
      </button>
    </div>
  )
}
