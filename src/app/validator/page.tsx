'use client'

import dynamic from 'next/dynamic'

const ValidatortorCard = dynamic(() => import('@/features/password-validator/ValidatorCard'), {
  ssr: false
})

export default function PasswordValidatorPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ValidatortorCard />
      </div>
    </main>
  )
}
