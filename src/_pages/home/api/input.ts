import { z } from 'zod'

export const createDemoNoteInput = z.object({
  content: z.string().trim().min(1).max(200),
})
