'use client'

import { useLocale } from 'next-intl'
import { startTransition } from 'react'
import { usePathname, useRouter } from '@/shared/i18n/navigation'

export function useLanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const onSelectChange = (nextLocale: typeof locale) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return {
    locale,
    onSelectChange,
  }
}
