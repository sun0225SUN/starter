export type SocialProviderName = 'google' | 'github'

export type SocialProviderCredentials = {
  clientId: string
  clientSecret: string
}

export type SocialAuthConfig = {
  providers: SocialProviderName[]
  socialProviders: Partial<
    Record<SocialProviderName, SocialProviderCredentials>
  >
}

export function buildSocialAuth(input: {
  googleClientId?: string
  googleClientSecret?: string
  githubClientId?: string
  githubClientSecret?: string
}): SocialAuthConfig {
  const socialProviders: SocialAuthConfig['socialProviders'] = {}
  const providers: SocialProviderName[] = []

  if (input.googleClientId && input.googleClientSecret) {
    providers.push('google')
    socialProviders.google = {
      clientId: input.googleClientId,
      clientSecret: input.googleClientSecret,
    }
  }

  if (input.githubClientId && input.githubClientSecret) {
    providers.push('github')
    socialProviders.github = {
      clientId: input.githubClientId,
      clientSecret: input.githubClientSecret,
    }
  }

  return { providers, socialProviders }
}
