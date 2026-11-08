import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'

export async function DashboardPage() {
  const t = await getTranslations('dashboard')

  return (
    <div className='flex flex-col gap-8 p-5 sm:p-8'>
      <section className='bg-card relative overflow-hidden rounded-2xl border p-7 sm:p-10'>
        <div className='bg-primary/8 absolute top-0 right-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl' />
        <div className='relative max-w-2xl'>
          <p className='text-muted-foreground mb-3 flex items-center gap-2 text-sm font-medium'>
            <Sparkles aria-hidden='true' />
            {t('ready')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('welcome')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-xl leading-7'>
            {t('description')}
          </p>
        </div>
      </section>

      <div className='grid gap-5 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShieldCheck aria-hidden='true' />
              {t('session-title')}
            </CardTitle>
            <CardDescription>{t('session-description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm leading-6'>{t('session-ready')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ArrowUpRight aria-hidden='true' />
              {t('next-title')}
            </CardTitle>
            <CardDescription>{t('next-description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm leading-6'>{t('next-ready')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
