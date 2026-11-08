import { cn } from '@/shared/lib/cn'

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent',
        className,
      )}
    />
  )
}
