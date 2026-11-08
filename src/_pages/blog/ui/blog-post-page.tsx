import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { formatPostDate } from '@/entities/blog'
import { getPost, listPosts } from '@/entities/blog/index.server'
import { Link } from '@/shared/i18n/navigation'
import { Mdx } from '@/shared/ui/mdx'
import { PageChrome } from '@/widgets/page-chrome'

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  }
}

export async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <PageChrome>
      <Suspense fallback={<ArticleFallback />}>
        <BlogArticle params={params} />
      </Suspense>
    </PageChrome>
  )
}

function ArticleFallback() {
  return (
    <div className='mx-auto w-full max-w-3xl px-6 py-20'>
      <div className='bg-muted h-96 animate-pulse rounded-xl' />
    </div>
  )
}

async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const t = await getTranslations('blogs')
  const locale = await getLocale()

  return (
    <article className='mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20'>
      <Link
        className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm'
        href='/blogs'
      >
        <ArrowLeft className='size-4' />
        {t('back')}
      </Link>
      <header className='space-y-6 text-center'>
        <time className='text-muted-foreground text-sm' dateTime={post.date}>
          {formatPostDate(post.date, locale)}
        </time>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
          {post.title}
        </h1>
        <div className='relative aspect-video overflow-hidden rounded-xl border'>
          <Image
            alt=''
            className='object-cover'
            fill
            priority
            sizes='(min-width: 768px) 768px, 100vw'
            src={post.cover}
          />
        </div>
      </header>
      <div className='prose prose-neutral dark:prose-invert max-w-none'>
        <Mdx source={post.markdown} />
      </div>
    </article>
  )
}
