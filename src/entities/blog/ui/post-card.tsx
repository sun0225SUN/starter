import Image from 'next/image'
import { Link } from '@/shared/i18n/navigation'

export function PostCard({
  post,
  formattedDate,
}: {
  post: {
    slug: string
    title: string
    description: string
    date: string
    cover: string
  }
  formattedDate: string
}) {
  return (
    <Link
      className='group bg-card flex h-full flex-col overflow-hidden rounded-xl border'
      href={`/blogs/${post.slug}`}
    >
      <div className='relative aspect-video overflow-hidden'>
        <Image
          alt=''
          className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
          fill
          sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          src={post.cover}
        />
      </div>
      <div className='flex flex-1 flex-col gap-3 p-5'>
        <h2 className='line-clamp-2 text-xl font-semibold tracking-tight group-hover:underline'>
          {post.title}
        </h2>
        <p className='text-muted-foreground line-clamp-3 text-sm'>
          {post.description}
        </p>
        <time
          className='text-muted-foreground mt-auto text-xs'
          dateTime={post.date}
        >
          {formattedDate}
        </time>
      </div>
    </Link>
  )
}
