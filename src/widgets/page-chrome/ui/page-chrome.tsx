import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { LanguageToggle } from '@/features/language'
import { ThemeToggle } from '@/features/theme'
import { Link } from '@/shared/i18n/navigation'

export async function PageChrome({ children }: { children: ReactNode }) {
  const t = await getTranslations('blogs')

  return (
    <div className='relative min-h-svh'>
      <div className='absolute top-4 left-4 z-10'>
        <Link
          className='text-muted-foreground hover:text-foreground text-sm'
          href='/'
        >
          {t('home')}
        </Link>
      </div>
      <div className='absolute top-4 right-4 z-10 flex items-center gap-3'>
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}
