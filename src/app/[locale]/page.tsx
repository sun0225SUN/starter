import { getTranslations } from 'next-intl/server'
import { LanguageToggle } from '@/components/language/toggle'
import { ThemeToggle } from '@/components/theme/toggle'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const t = await getTranslations('home')

  return (
    <div className='relative flex min-h-svh items-center justify-center'>
      <div className='absolute top-4 right-4 flex items-center gap-3'>
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Button>{t('clickMe')}</Button>
    </div>
  )
}
