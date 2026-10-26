import { describe, expect, it } from 'vitest'
import { parseDemoNote } from './parse-demo-note'

describe('parseDemoNote', () => {
  it('trims a valid note', () => {
    expect(parseDemoNote('  hello  ')).toBe('hello')
  })

  it('rejects empty and non-text values', () => {
    expect(parseDemoNote('   ')).toBeNull()
    expect(parseDemoNote(null)).toBeNull()
    expect(parseDemoNote(new File([], 'note.txt'))).toBeNull()
  })

  it('limits notes to the database demo maximum', () => {
    expect(parseDemoNote('a'.repeat(201))).toHaveLength(200)
  })
})
