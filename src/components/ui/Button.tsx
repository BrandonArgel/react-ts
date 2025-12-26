import { ComponentPropsWithRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20',
        success: 'bg-security-safe text-white hover:opacity-90 shadow-lg shadow-security-safe/20',
        ghost: 'bg-transparent hover:bg-white/10 text-gray-400 hover:text-white',
        nav: 'text-gray-500 hover:text-gray-300'
      },
      size: {
        md: 'px-4 py-2 text-sm gap-2',
        icon: 'p-2'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

interface ButtonBaseProps<T extends ElementType> {
  as?: T
  isLoading?: boolean
}

type ButtonProps<T extends ElementType> = ButtonBaseProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps<T> | keyof VariantProps<typeof buttonVariants>> &
  VariantProps<typeof buttonVariants>

export const Button = <T extends ElementType = 'button'>({
  className,
  variant,
  size,
  as,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button'

  return (
    <Component className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading || disabled} {...props}>
      {/* Spinner animado */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>{children}</span>
    </Component>
  )
}
