import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const demoNotes = pgTable('demo_notes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
