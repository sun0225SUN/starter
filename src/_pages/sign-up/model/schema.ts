import { z } from 'zod'

export { fieldMessage } from '@/shared/lib/zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: 'username-required' })
      .max(50, { error: 'username-required' }),
    email: z.email({ error: 'email-invalid' }),
    password: z
      .string()
      .min(8, { error: 'password-length' })
      .regex(/[A-Z]/, { error: 'password-uppercase' })
      .regex(/[a-z]/, { error: 'password-lowercase' })
      .regex(/[0-9]/, { error: 'password-number' }),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'passwords-do-not-match',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
