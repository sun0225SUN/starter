import { expect, test } from 'vitest'
import { prefixPathname, splitLocalePath } from './pathname'

test('strips every configured locale, including the default locale when it is written in the url', () => {
  expect(splitLocalePath('/dashboard')).toEqual({
    locale: undefined,
    pathname: '/dashboard',
  })
  expect(splitLocalePath('/zh/dashboard')).toEqual({
    locale: 'zh',
    pathname: '/dashboard',
  })
  expect(splitLocalePath('/en/dashboard')).toEqual({
    locale: 'en',
    pathname: '/dashboard',
  })
  expect(splitLocalePath('/zh')).toEqual({ locale: 'zh', pathname: '/' })
})

test('prefixes a path only when this routing mode shows that locale', () => {
  expect(prefixPathname('/sign-in')).toBe('/sign-in')
  expect(prefixPathname('/sign-in', 'en')).toBe('/sign-in')
  expect(prefixPathname('/sign-in', 'zh')).toBe('/zh/sign-in')
  expect(prefixPathname('/', 'zh')).toBe('/zh')
})
