import { z } from 'zod'

export { fieldMessage } from '@/shared/lib/zod'

export const signInSchema = z.object({
  email: z.email({ error: 'email-invalid' }),
  password: z.string().min(1, { error: 'password-required' }),
})

export type SignInFormValues = z.infer<typeof signInSchema>
