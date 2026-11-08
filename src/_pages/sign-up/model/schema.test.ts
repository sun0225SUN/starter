import { describe, expect, it } from 'vitest'
import { fieldMessage, signUpSchema } from './schema'

describe('signUpSchema', () => {
  const validInput = {
    name: 'Starter Admin',
    email: 'admin@example.com',
    password: 'Starter123',
    confirmPassword: 'Starter123',
  }

  it('accepts a strong matching password', () => {
    expect(signUpSchema.safeParse(validInput).success).toBe(true)
  })

  it('rejects mismatched and weak passwords', () => {
    const mismatch = signUpSchema.safeParse({
      ...validInput,
      confirmPassword: 'Different123',
    })
    const weak = signUpSchema.safeParse({
      ...validInput,
      password: 'weak',
      confirmPassword: 'weak',
    })

    expect(mismatch.success).toBe(false)
    expect(weak.success).toBe(false)
    if (!mismatch.success) {
      expect(fieldMessage(mismatch.error, 'confirmPassword')).toBe(
        'passwords-do-not-match',
      )
    }
    if (!weak.success) {
      expect(fieldMessage(weak.error, 'password')).toBe('password-length')
    }
  })
})
