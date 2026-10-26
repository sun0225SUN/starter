import { routing } from './routing'

type Locale = (typeof routing.locales)[number]

const localesByPrefixLength = [...routing.locales].sort(
  (left, right) => right.length - left.length,
)

type PrefixMode = 'always' | 'as-needed' | 'never'

function prefixMode(): PrefixMode {
  const localePrefix = routing.localePrefix as
    | PrefixMode
    | { mode: PrefixMode }
    | undefined
  if (!localePrefix) return 'always'
  return typeof localePrefix === 'string' ? localePrefix : localePrefix.mode
}

function hidesPrefix(locale: Locale) {
  const mode = prefixMode()
  return (
    mode === 'never' ||
    (mode === 'as-needed' && locale === routing.defaultLocale)
  )
}

export function splitLocalePath(pathname: string) {
  const locale = localesByPrefixLength.find(
    (item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`),
  )

  if (!locale) return { locale: undefined, pathname }

  return {
    locale,
    pathname: pathname.slice(locale.length + 1) || '/',
  }
}

export function prefixPathname(pathname: string, locale?: Locale) {
  if (!locale || hidesPrefix(locale)) return pathname
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}
