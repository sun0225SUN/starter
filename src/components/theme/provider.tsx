'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ReactNode, useLayoutEffect, useSyncExternalStore } from 'react'

const storageKey = 'theme'
const defaultTheme = 'system'

// Hydration uses the server snapshot; cached/client mounts use the client one.
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function ThemeSync() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  useLayoutEffect(() => {
    // Next.js keeps locale layouts in Activity boundaries, including their old
    // provider state. Reconcile that state when the layout becomes visible again.
    let currentTheme = theme
    try {
      currentTheme = localStorage.getItem(storageKey) || defaultTheme
    } catch {
      // Storage may be unavailable; retain the provider's in-memory preference.
    }
    if (currentTheme && currentTheme !== theme) setTheme(currentTheme)

    let appearance = currentTheme || resolvedTheme
    if (appearance === 'system') {
      appearance = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    if (appearance !== 'light' && appearance !== 'dark') return

    // Locale navigation remounts <html> and clears its theme attributes.
    // Restore them before paint; next-themes applies them in a passive effect.
    const root = document.documentElement
    root.classList.toggle('dark', appearance === 'dark')
    root.classList.toggle('light', appearance === 'light')
    root.style.colorScheme = appearance
  }, [theme, resolvedTheme, setTheme])

  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isClientRender = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )

  return (
    <NextThemesProvider
      attribute='class'
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      // Keep the blocking initialization script for SSR and hydration only.
      // On client navigation, ThemeSync restores the theme before paint.
      scriptProps={{ type: isClientRender ? 'text/plain' : 'text/javascript' }}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
