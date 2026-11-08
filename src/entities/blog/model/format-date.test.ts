import { describe, expect, it } from 'vitest'
import { formatPostDate } from './format-date'

describe('formatPostDate', () => {
  it('formats an ISO date in English and Chinese without shifting the day', () => {
    expect(formatPostDate('2026-11-08', 'en')).toBe('November 8, 2026')
    expect(formatPostDate('2026-11-08', 'zh')).toBe('2026年11月8日')
  })
})
