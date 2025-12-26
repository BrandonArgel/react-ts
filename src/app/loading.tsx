import { Card } from '@components/ui'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
      <Card variant="glass" className="w-full max-w-md animate-pulse">
        <div className="h-8 bg-white/10 rounded w-1/3 mb-6" />
        <div className="h-24 bg-white/5 rounded mb-4" />
        <div className="h-10 bg-primary/20 rounded w-full" />
      </Card>
      <p className="text-sm text-gray-500 animate-bounce">Loading security tools...</p>
    </div>
  )
}
