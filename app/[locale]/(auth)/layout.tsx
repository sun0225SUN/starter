import { connection } from 'next/server'
import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { enabledSocialProviders, getSession } from '@/shared/auth/index.server'
import { redirect } from '@/shared/i18n/navigation'
import { AuthShell } from '@/widgets/auth-shell'
import { AuthFlip } from './auth-flip'

export const instant = false

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthShell>
      <AuthFlip providers={enabledSocialProviders} />
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      {children}
    </AuthShell>
  )
}

async function RedirectIfSignedIn() {
  await connection()
  const locale = await getLocale()
  const session = await getSession()

  if (session) {
    redirect({ href: '/dashboard', locale })
  }

  return null
}
