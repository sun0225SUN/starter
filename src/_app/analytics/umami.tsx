import Script from 'next/script'

function umamiOrigin() {
  const host = process.env.NEXT_PUBLIC_UMAMI_HOST?.trim().replace(/\/$/, '')
  if (!host) return ''
  return host.startsWith('http://') || host.startsWith('https://')
    ? host
    : `https://${host}`
}

export function UmamiAnalytics() {
  if (process.env.NODE_ENV === 'development') return null

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim()
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
