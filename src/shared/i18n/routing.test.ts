import { expect, test } from 'vitest'
import { routing } from './routing'

test('keeps english as the unprefixed default and chinese under /zh', () => {
  expect(routing.locales).toEqual(['en', 'zh'])
  expect(routing.defaultLocale).toBe('en')
  expect(routing.localePrefix).toBe('as-needed')
})
