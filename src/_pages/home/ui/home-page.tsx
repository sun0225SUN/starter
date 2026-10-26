import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { BearDemo } from '@/features/bear'
import { LanguageToggle } from '@/features/language'
import { ThemeToggle } from '@/features/theme'
import { Button } from '@/shared/ui/button'
import { DatabaseDemo } from './database-demo'

export async function HomePage() {
  const t = await getTranslations('home')

  return (
    <div className='relative flex min-h-svh items-center justify-center'>
      <div className='absolute top-4 right-4 flex items-center gap-3'>
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className='flex w-full max-w-xl flex-col items-center gap-6 px-6'>
        <BearDemo />
        <Button>{t('clickMe')}</Button>
        <Suspense fallback={<DatabaseDemoFallback />}>
          <DatabaseDemo />
        </Suspense>
      </div>
    </div>
  )
}

function DatabaseDemoFallback() {
  return (
    <div className='bg-muted/50 h-48 w-full animate-pulse rounded-xl border' />
  )
}
