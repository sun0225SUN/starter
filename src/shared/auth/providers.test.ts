import { describe, expect, it } from 'vitest'
import { buildSocialAuth } from './providers'

describe('buildSocialAuth', () => {
  it('enables a provider only when both the client id and secret are set', () => {
    const config = buildSocialAuth({
      googleClientId: 'google-id',
      googleClientSecret: 'google-secret',
      githubClientId: 'github-id',
    })

    expect(config.providers).toEqual(['google'])
    expect(config.socialProviders.google).toEqual({
      clientId: 'google-id',
      clientSecret: 'google-secret',
    })
    expect(config.socialProviders.github).toBeUndefined()
  })

  it('returns no providers when credentials are missing', () => {
    expect(buildSocialAuth({}).providers).toEqual([])
  })
})
