'use client'

import { Command } from 'cmdk'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { startTransition, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import './command-menu.css'

const pages = [
  { href: '/', label: 'home', icon: '🏠' },
  { href: '/sign-in', label: 'sign-in', icon: '🔑' },
  { href: '/sign-up', label: 'sign-up', icon: '✨' },
  { href: '/dashboard', label: 'dashboard', icon: '▦' },
] as const

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations('commandMenu')
  const language = useTranslations('language')
  const nextLocale = locale === 'zh' ? 'en' : 'zh'

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = () => setOpen(false)

  const goTo = (href: (typeof pages)[number]['href']) => {
    router.push(href)
    close()
  }

  const toggleTheme = () => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light'
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
  }

  const switchLanguage = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
    close()
  }

  if (!open) return null

  return (
    <div className='command-menu-layer'>
      <button
        aria-label={t('close')}
        className='command-menu-overlay'
        onClick={close}
        type='button'
      />
      <div className='command-menu-content'>
        <div className='command-menu raycast'>
          <Command label={t('placeholder')}>
            <Command.Input placeholder={t('placeholder')} ref={inputRef} />
            <Command.List>
              <Command.Empty>{t('empty')}</Command.Empty>
              <Command.Group heading={t('suggestions')}>
                <Command.Item onSelect={toggleTheme}>
                  <span>🌓</span>
                  {resolvedTheme === 'dark'
                    ? t('toggleLight')
                    : t('toggleDark')}
                  <span className='raycast-meta'>{t('command')}</span>
                </Command.Item>
                <Command.Item onSelect={switchLanguage}>
                  <span>🌐</span>
                  {t('switchTo', { language: language(nextLocale) })}
                  <span className='raycast-meta'>{t('command')}</span>
                </Command.Item>
              </Command.Group>
              <Command.Separator />
              <Command.Group heading={t('pages')}>
                {pages.map((page) => (
                  <Command.Item
                    key={page.href}
                    onSelect={() => goTo(page.href)}
                  >
                    <span>{page.icon}</span>
                    {t(page.label)}
                    <span className='raycast-meta'>{t('page')}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
            <div className='raycast-footer'>
              <div className='raycast-footer-left'>
                <span>{t('open')}</span>
                <kbd>↵</kbd>
              </div>
              <div className='raycast-footer-right'>
                <span>{t('actions')}</span>
                <kbd>⌘</kbd>
                <kbd>K</kbd>
              </div>
            </div>
          </Command>
        </div>
      </div>
    </div>
  )
}
