import { cn } from '@/shared/lib/cn'

export function Separator({ className }: { className?: string }) {
  return (
    <hr className={cn('bg-border h-px w-full shrink-0 border-0', className)} />
  )
}
