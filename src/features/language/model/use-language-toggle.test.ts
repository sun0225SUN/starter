import { act, renderHook } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { useLanguageToggle } from './use-language-toggle'

const replace = vi.fn()

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}))

vi.mock('@/shared/i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace }),
}))

beforeEach(() => {
  replace.mockClear()
})

test('does not navigate when the locale stays the same', () => {
  const { result } = renderHook(() => useLanguageToggle())

  act(() => {
    result.current.onSelectChange('en')
  })

  expect(replace).not.toHaveBeenCalled()
})

test('replaces the route when the locale changes', () => {
  const { result } = renderHook(() => useLanguageToggle())

  act(() => {
    result.current.onSelectChange('zh')
  })

  expect(replace).toHaveBeenCalledWith('/', { locale: 'zh' })
})
