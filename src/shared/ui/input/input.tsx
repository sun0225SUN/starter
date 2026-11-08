import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot='input'
      type={type}
      className={cn(
        'border-input bg-background placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  )
}
