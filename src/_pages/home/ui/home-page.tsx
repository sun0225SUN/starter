import { getTranslations } from 'next-intl/server'
import { BearDemo } from '@/features/bear'
import { LanguageToggle } from '@/features/language'
import { ThemeToggle } from '@/features/theme'
import { Button } from '@/shared/ui/button'

export async function HomePage() {
  const t = await getTranslations('home')

  return (
    <div className='relative flex min-h-svh items-center justify-center'>
      <div className='absolute top-4 right-4 flex items-center gap-3'>
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className='flex flex-col items-center gap-6'>
        <BearDemo />
        <Button>{t('clickMe')}</Button>
      </div>
    </div>
  )
}
