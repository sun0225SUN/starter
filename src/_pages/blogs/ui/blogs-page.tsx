import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatPostDate, PostCard } from '@/entities/blog'
import { listPosts } from '@/entities/blog/index.server'
import { PageChrome } from '@/widgets/page-chrome'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blogs')

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export async function BlogsPage() {
  const t = await getTranslations('blogs')
  const locale = await getLocale()
  const posts = await listPosts()

  return (
    <PageChrome>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20'>
        <header className='mx-auto max-w-2xl space-y-3 text-center'>
          <h1 className='text-4xl font-semibold tracking-tight'>
            {t('title')}
          </h1>
          <p className='text-muted-foreground text-lg'>{t('subtitle')}</p>
        </header>
        {posts.length === 0 ? (
          <p className='text-muted-foreground text-center'>{t('empty')}</p>
        ) : (
          <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard
                  formattedDate={formatPostDate(post.date, locale)}
                  post={post}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageChrome>
  )
}
