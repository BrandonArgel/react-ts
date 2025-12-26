'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="bg-[#0a0f1a] text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">CRITICAL_ERROR</h1>
          <button onClick={() => reset()} className="text-primary underline font-mono">
            REBOOT_SYSTEM
          </button>
        </div>
      </body>
    </html>
  )
}
