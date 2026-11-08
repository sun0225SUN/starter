import { getSessionCookie } from 'better-auth/cookies'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { prefixPathname, splitLocalePath } from '@/shared/i18n/pathname'
import { routing } from '@/shared/i18n/routing'

const handleI18n = createMiddleware(routing)

function isProtectedPath(pathname: string) {
  return pathname === '/dashboard' || pathname.startsWith('/dashboard/')
}

function redirectToSignIn(
  request: NextRequest,
  locale: ReturnType<typeof splitLocalePath>['locale'],
  intlResponse: NextResponse,
) {
  const url = request.nextUrl.clone()
  url.pathname = prefixPathname('/sign-in', locale)
  const redirect = NextResponse.redirect(url)

  for (const cookie of intlResponse.headers.getSetCookie()) {
    redirect.headers.append('set-cookie', cookie)
  }

  return redirect
}

export default function proxy(request: NextRequest) {
  const intlResponse = handleI18n(request)

  // Locale detection and prefix normalization belong to next-intl.
  // An unprefixed or /en URL may still need to become /zh before auth runs.
  if (intlResponse.headers.has('location')) return intlResponse

  const { locale, pathname } = splitLocalePath(request.nextUrl.pathname)
  if (isProtectedPath(pathname) && !getSessionCookie(request)) {
    return redirectToSignIn(request, locale, intlResponse)
  }

  return intlResponse
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
