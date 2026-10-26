import { Aperture, Home, Settings, User } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { LanguageToggle } from '@/features/language'
import { ThemeToggle } from '@/features/theme'
import type { Session } from '@/shared/auth/index.server'
import { Link } from '@/shared/i18n/navigation'
import { SignOutButton } from './sign-out-button'

export async function DashboardShell({
  children,
  session,
}: {
  children: ReactNode
  session: Session
}) {
  const t = await getTranslations('dashboard')

  return (
    <div className='bg-muted/30 min-h-svh md:grid md:grid-cols-[16rem_1fr]'>
      <aside className='bg-sidebar text-sidebar-foreground border-sidebar-border hidden border-r md:flex md:flex-col'>
        <Link className='flex h-20 items-center gap-3 border-b px-6' href='/'>
          <span className='bg-sidebar-primary text-sidebar-primary-foreground flex size-9 items-center justify-center rounded-xl'>
            <Aperture aria-hidden='true' />
          </span>
          <span className='font-semibold tracking-tight'>Starter</span>
        </Link>

        <nav className='flex flex-1 flex-col gap-1 p-3'>
          <p className='text-muted-foreground px-3 py-2 text-xs font-medium tracking-widest uppercase'>
            {t('menu')}
          </p>
          <Link
            className='bg-sidebar-accent text-sidebar-accent-foreground flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium'
            href='/dashboard'
          >
            <Home aria-hidden='true' />
            {t('home')}
          </Link>
          <span className='text-muted-foreground flex h-9 items-center gap-3 rounded-lg px-3 text-sm opacity-60'>
            <Settings aria-hidden='true' />
            {t('settings')}
          </span>
        </nav>

        <div className='border-t p-3'>
          <div className='mb-2 flex items-center gap-3 rounded-lg px-3 py-2'>
            <span className='bg-sidebar-accent flex size-9 items-center justify-center rounded-lg'>
              <User aria-hidden='true' />
            </span>
            <div className='min-w-0 flex-1 text-sm'>
              <p className='truncate font-medium'>{session.user.name}</p>
              <p className='text-muted-foreground truncate text-xs'>
                {session.user.email}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      <div className='min-w-0'>
        <header className='bg-background/85 sticky top-0 flex h-20 items-center justify-between border-b px-5 backdrop-blur-xl sm:px-8'>
          <div>
            <p className='text-muted-foreground text-sm'>{t('overview')}</p>
            <h1 className='text-xl font-semibold'>{t('dashboard')}</h1>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-muted-foreground max-w-40 truncate text-xs md:hidden'>
              {session.user.email}
            </p>
            <LanguageToggle />
            <ThemeToggle />
            <div className='md:hidden'>
              <SignOutButton className='w-auto px-2' />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
