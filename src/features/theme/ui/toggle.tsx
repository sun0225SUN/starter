'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { cn } from '@/shared/lib/cn'
import './view-transition.css'

interface ThemeToggleProps {
  className?: string
  strokeWidth?: number
}

export function ThemeToggle({ strokeWidth = 2, className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'

    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => setTheme(newTheme))
    })
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={cn('cursor-pointer', className)}
      aria-label='Toggle theme'
    >
      <Sun
        className={cn('size-6 dark:hidden', className)}
        strokeWidth={strokeWidth}
      />
      <Moon
        className={cn('hidden size-6 dark:block', className)}
        strokeWidth={strokeWidth}
      />
    </button>
  )
}
