// src/components/ui/Input.tsx
import { InputHTMLAttributes, Ref } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

export const Input = ({ label, error, className, type = 'text', ref, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>}

      <input
        ref={ref}
        type={type}
        className={`
          bg-[#1e2536] border border-gray-700 rounded-md p-2 text-sm
          transition-all duration-200 outline-none
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-[10px] text-red-500 font-medium italic">{error}</span>}
    </div>
  )
}
