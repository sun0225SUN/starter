'use client'

import { LoaderCircle, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { signOut } from '@/shared/auth'
import { useRouter } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'

export function SignOutButton({ className }: { className?: string }) {
  const t = useTranslations('auth')
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleSignOut() {
    setIsPending(true)
    try {
      await signOut()
    } finally {
      router.replace('/sign-in')
      router.refresh()
    }
  }

  return (
    <Button
      className={cn('w-full justify-start', className)}
      disabled={isPending}
      onClick={handleSignOut}
      variant='ghost'
    >
      {isPending ? (
        <LoaderCircle className='animate-spin' data-icon='inline-start' />
      ) : (
        <LogOut data-icon='inline-start' />
      )}
      {t('sign-out')}
    </Button>
  )
}
