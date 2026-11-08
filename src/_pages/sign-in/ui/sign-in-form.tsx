'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { SocialLogin } from '@/features/social-login'
import { signIn } from '@/shared/auth'
import type { SocialProviderName } from '@/shared/auth/providers'
import { useRouter } from '@/shared/i18n/navigation'
import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password-input'
import { Spinner } from '@/shared/ui/spinner'
import {
  AuthField,
  AuthFormCard,
  AuthSwitchLink,
  authControlClassName,
  authText,
} from '@/widgets/auth-shell'
import { type SignInFormValues, signInSchema } from '../model/schema'

export function SignInForm({ providers }: { providers: SocialProviderName[] }) {
  const t = useTranslations('auth')
  const router = useRouter()
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })
  const {
    formState: { errors, isSubmitting },
    register,
  } = form

  async function onSubmit(values: SignInFormValues) {
    try {
      const response = await signIn.email(values)
      if (response.error || !response.data) {
        form.setError('root', { message: t('sign-in-error') })
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      form.setError('root', { message: t('network-error') })
    }
  }

  return (
    <AuthFormCard>
      <h1 className='mb-6 text-center text-2xl font-bold'>{t('sign-in')}</h1>
      <form
        autoComplete='on'
        className='space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthField
          error={authText(t, errors.email?.message)}
          id='sign-in-email'
          label={t('email')}
        >
          <Input
            aria-invalid={Boolean(errors.email)}
            autoComplete='email'
            className={authControlClassName}
            id='sign-in-email'
            placeholder={t('email-placeholder')}
            type='email'
            {...register('email')}
          />
        </AuthField>
        <AuthField
          error={authText(t, errors.password?.message)}
          id='sign-in-password'
          label={t('password')}
        >
          <PasswordInput
            aria-invalid={Boolean(errors.password)}
            autoComplete='current-password'
            className={authControlClassName}
            hideLabel={t('hide-password')}
            id='sign-in-password'
            placeholder={t('password-placeholder')}
            showLabel={t('show-password')}
            {...register('password')}
          />
        </AuthField>
        {errors.root?.message ? (
          <FieldError role='alert'>{errors.root.message}</FieldError>
        ) : null}
        <Button
          className='mt-4 h-10 w-full cursor-pointer rounded-md'
          disabled={isSubmitting}
          type='submit'
        >
          {isSubmitting ? <Spinner /> : t('sign-in')}
        </Button>
        <SocialLogin providers={providers} returnPath='/sign-in' />
      </form>
      <AuthSwitchLink
        hint={t('no-account-yet')}
        href='/sign-up'
        label={t('go-to-sign-up')}
      />
    </AuthFormCard>
  )
}
