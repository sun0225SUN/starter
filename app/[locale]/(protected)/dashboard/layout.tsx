import { getLocale } from 'next-intl/server'
import { type ReactNode, Suspense } from 'react'
import { DashboardShell } from '@/_pages/dashboard'
import { getSession } from '@/shared/auth/index.server'
import { redirect } from '@/shared/i18n/navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  )
}

async function AuthenticatedDashboard({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  const session = await getSession()

  if (!session) {
    return redirect({ href: '/sign-in', locale })
  }

  return <DashboardShell session={session}>{children}</DashboardShell>
}

function DashboardLoading() {
  return <div className='bg-muted min-h-svh animate-pulse' />
}
