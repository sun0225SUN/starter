import { desc } from 'drizzle-orm'
import { createTRPCRouter, publicProcedure } from '@/shared/api/trpc'
import { db } from '@/shared/db'
import { demoNotes } from '@/shared/db/schema'
import { createDemoNoteInput } from './input'

export const homeRouter = createTRPCRouter({
  listNotes: publicProcedure.query(() =>
    db.select().from(demoNotes).orderBy(desc(demoNotes.createdAt)).limit(5),
  ),
  createNote: publicProcedure
    .input(createDemoNoteInput)
    .mutation(({ input }) =>
      db.insert(demoNotes).values({ content: input.content }).returning(),
    ),
})
