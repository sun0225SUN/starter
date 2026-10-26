import { describe, expect, it } from 'vitest'
import { createDemoNoteInput } from './input'

describe('createDemoNoteInput', () => {
  it('trims valid note content', () => {
    expect(createDemoNoteInput.parse({ content: '  hello  ' })).toEqual({
      content: 'hello',
    })
  })

  it('rejects empty and overlong notes', () => {
    expect(createDemoNoteInput.safeParse({ content: '   ' }).success).toBe(
      false,
    )
    expect(
      createDemoNoteInput.safeParse({ content: 'a'.repeat(201) }).success,
    ).toBe(false)
  })
})
