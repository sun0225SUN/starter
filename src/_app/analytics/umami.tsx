import Script from 'next/script'
import { env } from '@/env'

function umamiOrigin() {
  const host = env.NEXT_PUBLIC_UMAMI_HOST?.replace(/\/$/, '')
  if (!host) return ''
  return host.startsWith('http://') || host.startsWith('https://')
    ? host
    : `https://${host}`
}

export function UmamiAnalytics() {
  if (env.NODE_ENV === 'development') return null

  const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const origin = umamiOrigin()
  if (!websiteId || !origin) return null

  return (
    <>
      <Script
        defer
        src={`${origin}/recorder.js`}
        data-website-id={websiteId}
        strategy='afterInteractive'
      />
      <Script
        defer
        src={`${origin}/script.js`}
        data-website-id={websiteId}
        strategy='afterInteractive'
      />
    </>
  )
}
