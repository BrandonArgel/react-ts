'use client'

import { useEffect } from 'react'
import { Button, Card } from '@components/ui'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error])

  return (
    <Card variant="default" className="max-w-md mx-auto text-center border-red-500/20">
      <div className="text-red-500 mb-4 text-4xl">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-400 text-sm mb-6">An unexpected error occurred while processing the data.</p>
      <Button onClick={() => reset()} variant="primary">
        Try again
      </Button>
    </Card>
  )
}
