'use client'

import dynamic from 'next/dynamic'

// Load GeneratorCard only on the client side
const GeneratorCard = dynamic(() => import('@/components/password/GeneratorCard'), {
  ssr: false
})

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">Security Tool</h1>
        <GeneratorCard />
      </div>
    </main>
  )
}
