import type { ReactNode } from 'react'
import { EtherealShadow } from '@/shared/ui/ethereal-shadow'

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className='relative isolate flex min-h-svh items-center justify-center px-6 py-16'>
      <div className='absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,var(--color-muted),transparent_46%)] dark:hidden' />
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom_right,black,transparent_78%)] bg-size-[24px_24px] opacity-35 dark:hidden' />
      <div className='absolute inset-0 -z-20 hidden dark:block'>
        <EtherealShadow
          animation={{ scale: 100, speed: 90 }}
          color='rgba(128, 128, 128, 1)'
          noise={{ opacity: 1, scale: 1.2 }}
          sizing='fill'
        />
      </div>
      <div className='w-full max-w-sm'>{children}</div>
    </main>
  )
}
