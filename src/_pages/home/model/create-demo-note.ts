'use server'

import { refresh } from 'next/cache'
import { db } from '@/shared/db'
import { demoNotes } from '@/shared/db/schema'
import { parseDemoNote } from './parse-demo-note'

export async function createDemoNote(formData: FormData) {
  const content = parseDemoNote(formData.get('content'))

  if (!content) {
    return
  }

  await db.insert(demoNotes).values({ content })
  refresh()
}
