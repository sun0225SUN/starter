import type { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { Link } from '@/shared/i18n/navigation'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'

type AuthTranslator = ReturnType<typeof useTranslations<'auth'>>

export const authControlClassName =
  'h-10 rounded-md bg-transparent dark:bg-input/30'

export function authText(t: AuthTranslator, key: string | undefined) {
  switch (key) {
    case 'username-required':
      return t('username-required')
    case 'email-invalid':
      return t('email-invalid')
    case 'password-required':
      return t('password-required')
    case 'password-length':
      return t('password-length')
    case 'password-uppercase':
      return t('password-uppercase')
    case 'password-lowercase':
      return t('password-lowercase')
    case 'password-number':
      return t('password-number')
    case 'passwords-do-not-match':
      return t('passwords-do-not-match')
    default:
      return undefined
  }
}

export function AuthField({
  children,
  error,
  id,
  label,
}: {
  children: ReactNode
  error?: string
  id: string
  label: string
}) {
  return (
    <Field className='gap-3' invalid={Boolean(error)}>
      <FieldLabel className='text-sm font-medium' htmlFor={id}>
        {label}
      </FieldLabel>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  )
}

export function AuthSwitchLink({
  hint,
  href,
  label,
}: {
  hint: string
  href: '/sign-in' | '/sign-up'
  label: string
}) {
  return (
    <p className='text-muted-foreground mt-6 text-center text-sm'>
      {hint}{' '}
      <Link className='text-primary font-medium hover:underline' href={href}>
        {label}
      </Link>
    </p>
  )
}
