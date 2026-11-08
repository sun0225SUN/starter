import { describe, expect, it } from 'vitest'
import { sortPostsByDate } from './sort-posts'

describe('sortPostsByDate', () => {
  it('orders posts from newest to oldest', () => {
    const posts = [
      { date: '2026-10-02', title: 'older' },
      { date: '2026-11-08', title: 'newer' },
    ]

    expect(sortPostsByDate(posts).map((post) => post.title)).toEqual([
      'newer',
      'older',
    ])
  })

  it('does not mutate the input list', () => {
    const posts = [{ date: '2026-01-02' }, { date: '2026-03-04' }]

    sortPostsByDate(posts)

    expect(posts.map((post) => post.date)).toEqual(['2026-01-02', '2026-03-04'])
  })
})
