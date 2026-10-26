import type { ReactNode } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { MagicCard } from '@/shared/ui/magic-card'

export function AuthFormCard({ children }: { children: ReactNode }) {
  return (
    <Card className='relative h-full rounded-xl border-none p-0 shadow-none'>
      <MagicCard className='h-full p-10'>
        <CardContent className='p-0'>{children}</CardContent>
      </MagicCard>
    </Card>
  )
}
