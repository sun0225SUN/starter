import { cacheLife } from 'next/cache'
import 'server-only'
import { blogCollection } from 'qino/collections/blogs'
import { sortPostsByDate } from '../model/sort-posts'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  cover: string
  markdown: string
}

type BlogEntry = {
  title: string
  description: string
  date: string
  cover: string
  markdown: string
  _meta: { slug: string }
}

function toPost(entry: BlogEntry): BlogPost {
  return {
    slug: entry._meta.slug,
    title: entry.title,
    description: entry.description,
    date: entry.date,
    cover: entry.cover,
    markdown: entry.markdown,
  }
}

export async function listPosts(): Promise<BlogPost[]> {
  'use cache'
  cacheLife('max')

  const entries = await blogCollection.getEntries()
  return sortPostsByDate(entries.map(toPost))
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  'use cache'
  cacheLife('max')

  const slugs = await blogCollection.getAllSlugs()
  if (!slugs.includes(slug)) return null

  const entry = await blogCollection.getEntry(slug as (typeof slugs)[number])
  return toPost(entry)
}
