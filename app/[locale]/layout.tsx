import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { UmamiAnalytics } from '@/_app/analytics/umami'
import { CommandMenu } from '@/features/command-menu'
import { ThemeProvider } from '@/features/theme'
import { routing } from '@/shared/i18n'
import { cn } from '@/shared/lib/cn'
import '@/_app/styles/globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('site')

  return {
    applicationName: t('name'),
    title: {
      default: t('title'),
      template: `%s · ${t('name')}`,
    },
    description: t('description'),
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: t('name'),
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
}: LayoutProps<'/[locale]'>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={cn('h-full antialiased', 'font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body className='flex min-h-full flex-col'>
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
            <CommandMenu />
          </ThemeProvider>
        </NextIntlClientProvider>
        <UmamiAnalytics />
      </body>
    </html>
  )
}
