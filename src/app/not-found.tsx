import { Button, Card } from '@components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Card variant="default" className="max-w-md mx-auto text-center py-12">
      <h1 className="text-6xl font-black text-white/10 mb-4">404</h1>
      <h2 className="text-xl font-bold mb-4">Herramienta no encontrada</h2>
      <p className="text-gray-500 mb-8">La ruta que buscas no existe o ha sido movida a otro servidor.</p>
      <Button as={Link} href="/generator">
        Volver al Generador
      </Button>
    </Card>
  )
}
