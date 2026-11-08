import { z } from 'zod'
import qino from '..'

export const blogCollection = qino.defineCollection({
  directory: 'blogs',
  extension: '.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.iso.date(),
    cover: z.string(),
  }),
  views: (view) => ({
    default: view({
      sort: (left, right) => right.date.localeCompare(left.date),
    }),
  }),
})
