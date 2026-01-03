import { Button, Card } from '@components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Card variant="default" className="max-w-md mx-auto text-center py-12">
      <h1 className="text-6xl font-black text-white/10 mb-4">404</h1>
      <h2 className="text-xl font-bold mb-4">Tool not found</h2>
      <p className="text-gray-500 mb-8">
        The tool you are looking for does not exist or has been moved to another server.
      </p>
      <Button asChild>
        <Link href="/generator">Back to Generator</Link>
      </Button>
    </Card>
  )
}
