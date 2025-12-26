'use client'

import { useEffect } from 'react'
import { Button, Card } from '@components/ui'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error])

  return (
    <Card variant="default" className="max-w-md mx-auto text-center border-red-500/20">
      <div className="text-red-500 mb-4 text-4xl">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Algo salió mal</h2>
      <p className="text-gray-400 text-sm mb-6">Ocurrió un error inesperado al procesar los datos.</p>
      <Button onClick={() => reset()} variant="primary">
        Intentar de nuevo
      </Button>
    </Card>
  )
}
