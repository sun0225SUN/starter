'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Suspense, useState } from 'react'
import { signIn } from '@/shared/auth'
import type { SocialProviderName } from '@/shared/auth/providers'
import { getPathname } from '@/shared/i18n/navigation'
import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field'
import { Separator } from '@/shared/ui/separator'
import { Spinner } from '@/shared/ui/spinner'
import { GithubIcon } from './github-icon'
import { GoogleIcon } from './google-icon'

export function SocialLogin({
  providers,
  returnPath,
}: {
  providers: SocialProviderName[]
  returnPath: '/sign-in' | '/sign-up'
}) {
  const t = useTranslations('auth')
  const locale = useLocale()
  const [pendingProvider, setPendingProvider] =
    useState<SocialProviderName | null>(null)
  const [error, setError] = useState<string>()

  async function handleSocialLogin(provider: SocialProviderName) {
    setError(undefined)

    if (!providers.includes(provider)) {
      setError(t('social-not-configured'))
      return
    }

    setPendingProvider(provider)

    try {
      const callbackURL = getPathname({ href: '/dashboard', locale })
      const response = await signIn.social({
        provider,
        callbackURL,
        errorCallbackURL: getPathname({ href: returnPath, locale }),
      })

      if (response.error || !response.data?.url) {
        setError(t('social-sign-in-error'))
        setPendingProvider(null)
        return
      }

      window.location.href = response.data.url
    } catch {
      setError(t('network-error'))
      setPendingProvider(null)
    }
  }

  const providersToShow = [
    {
      provider: 'google' as const,
      icon: GoogleIcon,
      label: t('continue-with-google'),
    },
    {
      provider: 'github' as const,
      icon: GithubIcon,
      label: t('continue-with-github'),
    },
  ]

  return (
    <>
      <div className='my-6 flex items-center'>
        <Separator className='flex-1' />
        <span className='text-muted-foreground px-4 text-xs uppercase'>
          {t('or')}
        </span>
        <Separator className='flex-1' />
      </div>
      <div className='flex flex-col gap-6'>
        {providersToShow.map(({ provider, icon: Icon, label }) => (
          <Button
            className='h-10 w-full cursor-pointer rounded-md'
            disabled={pendingProvider !== null}
            key={provider}
            onClick={() => handleSocialLogin(provider)}
            type='button'
            variant='outline'
          >
            {pendingProvider === provider ? (
              <Spinner />
            ) : (
              <>
                <Icon />
                {label}
              </>
            )}
          </Button>
        ))}
      </div>
      <Suspense fallback={null}>
        <SocialLoginError message={error} />
      </Suspense>
    </>
  )
}

function SocialLoginError({ message }: { message?: string }) {
  const t = useTranslations('auth')
  const oauthError = useSearchParams().get('error')
  if (!message && !oauthError) return null

  return (
    <FieldError role='alert'>{message ?? t('social-sign-in-error')}</FieldError>
  )
}
