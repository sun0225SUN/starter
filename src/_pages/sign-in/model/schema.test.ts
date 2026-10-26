import { describe, expect, it } from 'vitest'
import { fieldMessage, signInSchema } from './schema'

describe('signInSchema', () => {
  it('accepts an email and password', () => {
    expect(
      signInSchema.safeParse({ email: 'hello@example.com', password: 'secret' })
        .success,
    ).toBe(true)
  })

  it('rejects invalid credentials with field messages', () => {
    const result = signInSchema.safeParse({ email: 'hello', password: '' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(fieldMessage(result.error, 'email')).toBe('email-invalid')
      expect(fieldMessage(result.error, 'password')).toBe('password-required')
    }
  })
})
