import { desc } from 'drizzle-orm'
import { db } from '@/shared/db'
import { demoNotes } from '@/shared/db/schema'
import { Button } from '@/shared/ui/button'
import { createDemoNote } from '../model/create-demo-note'

export async function DatabaseDemo() {
  const notes = await db
    .select()
    .from(demoNotes)
    .orderBy(desc(demoNotes.createdAt))
    .limit(5)

  return (
    <section className='bg-card text-card-foreground w-full rounded-xl border p-5 shadow-sm'>
      <div className='mb-4'>
        <h2 className='font-semibold'>Drizzle + PostgreSQL</h2>
        <p className='text-muted-foreground text-sm'>
          Add a note to verify the local database connection.
        </p>
      </div>

      <form action={createDemoNote} className='flex gap-2'>
        <input
          className='bg-background focus-visible:ring-ring/50 h-9 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none focus-visible:ring-3'
          maxLength={200}
          name='content'
          placeholder='A note stored by Drizzle'
          required
        />
        <Button type='submit'>Save</Button>
      </form>

      <ul className='mt-4 space-y-2 text-sm'>
        {notes.length === 0 ? (
          <li className='text-muted-foreground'>No notes yet.</li>
        ) : (
          notes.map((note) => (
            <li className='bg-muted rounded-lg px-3 py-2' key={note.id}>
              {note.content}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
