'use client'

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { type SubmitEvent, useState } from 'react'
import { useTRPC } from '@/_app/trpc/client'
import { Button } from '@/shared/ui/button'

export function DatabaseDemoClient() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const notesQuery = useSuspenseQuery(trpc.home.listNotes.queryOptions())
  const [content, setContent] = useState('')
  const createNote = useMutation(
    trpc.home.createNote.mutationOptions({
      onSuccess: async () => {
        setContent('')
        await queryClient.invalidateQueries({
          queryKey: trpc.home.listNotes.queryKey(),
        })
      },
    }),
  )

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedContent = content.trim()

    if (trimmedContent) {
      createNote.mutate({ content: trimmedContent })
    }
  }

  return (
    <section className='bg-card text-card-foreground w-full rounded-xl border p-5 shadow-sm'>
      <div className='mb-4'>
        <h2 className='font-semibold'>tRPC + React Query + Drizzle</h2>
        <p className='text-muted-foreground text-sm'>
          Add a note through a type-safe API and refresh the query cache.
        </p>
      </div>

      <form className='flex gap-2' onSubmit={handleSubmit}>
        <input
          className='bg-background focus-visible:ring-ring/50 h-9 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none focus-visible:ring-3'
          disabled={createNote.isPending}
          maxLength={200}
          onChange={(event) => setContent(event.target.value)}
          placeholder='A note stored by Drizzle'
          required
          value={content}
        />
        <Button disabled={createNote.isPending} type='submit'>
          {createNote.isPending ? 'Saving…' : 'Save'}
        </Button>
      </form>

      {createNote.error ? (
        <p className='text-destructive mt-2 text-sm' role='alert'>
          {createNote.error.message}
        </p>
      ) : null}

      <ul className='mt-4 space-y-2 text-sm'>
        {notesQuery.data.length === 0 ? (
          <li className='text-muted-foreground'>No notes yet.</li>
        ) : (
          notesQuery.data.map((note) => (
            <li className='bg-muted rounded-lg px-3 py-2' key={note.id}>
              {note.content}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
