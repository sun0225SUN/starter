import { notFound } from 'next/navigation'
import { locale as getLocale } from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async () => {
  const requested = await getLocale()
  if (!hasLocale(routing.locales, requested)) {
    notFound()
  }

  return {
    locale: requested,
    messages: (await import(`../../messages/${requested}.json`)).default,
  }
})
