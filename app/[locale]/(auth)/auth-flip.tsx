'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { SignInForm } from '@/_pages/sign-in'
import { SignUpForm } from '@/_pages/sign-up'
import type { SocialProviderName } from '@/shared/auth/providers'
import { usePathname } from '@/shared/i18n/navigation'

function isSignUpPath(pathname: string) {
  return pathname === '/sign-up' || pathname.endsWith('/sign-up')
}

export function AuthFlip({ providers }: { providers: SocialProviderName[] }) {
  const showSignUp = isSignUpPath(usePathname())
  const [canFlip, setCanFlip] = useState(false)

  useEffect(() => {
    setCanFlip(true)
  }, [])

  return (
    <div style={{ perspective: 1400 }}>
      <div
        className='grid'
        style={{
          transform: showSignUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          transition: canFlip
            ? 'transform 700ms cubic-bezier(0.4, 0.05, 0.2, 1)'
            : 'none',
        }}
      >
        <CardFace hidden={showSignUp}>
          <SignInForm providers={providers} />
        </CardFace>
        <CardFace flipped hidden={!showSignUp}>
          <SignUpForm />
        </CardFace>
      </div>
    </div>
  )
}

function CardFace({
  children,
  flipped = false,
  hidden,
}: {
  children: ReactNode
  flipped?: boolean
  hidden: boolean
}) {
  return (
    <div
      aria-hidden={hidden}
      className='col-start-1 row-start-1'
      inert={hidden}
      style={{
        backfaceVisibility: 'hidden',
        transform: flipped ? 'rotateY(180deg)' : undefined,
      }}
    >
      {children}
    </div>
  )
}
