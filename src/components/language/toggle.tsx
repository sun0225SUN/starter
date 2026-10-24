'use client'

import { Check, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useLanguageToggle } from '@/hooks/use-language-toggle'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const localeFlags = {
  en: '🇺🇸',
  zh: '🇨🇳',
} as const

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const t = useTranslations('language')
  const { locale: currentLocale, onSelectChange } = useLanguageToggle()
  const [isOpen, setIsOpen] = useState(false)
  const [skipCloseAnimation, setSkipCloseAnimation] = useState(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) setSkipCloseAnimation(false)
      }}
    >
      <PopoverTrigger
        aria-label={t('language')}
        className={cn(
          'text-foreground inline-flex cursor-pointer border-0 bg-transparent p-0',
          !isOpen && className,
        )}
      >
        <Globe className='size-6' strokeWidth={2} nonScalingStroke />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-36 border-none bg-white/80 p-1 shadow-lg backdrop-blur-md dark:bg-black/80',
          skipCloseAnimation &&
            'data-closed:animate-none! data-closed:duration-0!',
        )}
        align='end'
        sideOffset={8}
      >
        <div className='space-y-1'>
          {routing.locales.map((locale) => (
            <Button
              key={locale}
              variant='ghost'
              size='sm'
              onClick={() => {
                setSkipCloseAnimation(true)
                setIsOpen(false)
                onSelectChange(locale)
              }}
              className={cn(
                'w-full cursor-pointer justify-between text-sm font-normal focus-visible:border-none focus-visible:ring-0',
                locale === currentLocale && 'bg-accent dark:bg-accent/50',
              )}
            >
              <span className='flex items-center gap-2'>
                <span aria-hidden className='text-base leading-none'>
                  {localeFlags[locale]}
                </span>
                {t(locale)}
              </span>
              {locale === currentLocale && <Check className='size-4' />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
