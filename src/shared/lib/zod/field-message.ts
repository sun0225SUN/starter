import type { z } from 'zod'

export function fieldMessage(error: z.ZodError, field: string) {
  return error.issues.find((issue) => issue.path[0] === field)?.message
}
