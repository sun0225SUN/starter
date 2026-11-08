'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { signUp } from '@/shared/auth'
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
import { type SignUpFormValues, signUpSchema } from '../model/schema'

export function SignUpForm() {
  const t = useTranslations('auth')
  const router = useRouter()
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const {
    formState: { errors, isSubmitting },
    register,
  } = form

  async function onSubmit(values: SignUpFormValues) {
    try {
      const response = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      if (response.error || !response.data) {
        form.setError('root', {
          message: response.error?.message ?? t('sign-up-error'),
        })
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
      <h1 className='mb-6 text-center text-2xl font-bold'>{t('sign-up')}</h1>
      <form
        autoComplete='on'
        className='space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthField
          error={authText(t, errors.name?.message)}
          id='sign-up-name'
          label={t('username')}
        >
          <Input
            aria-invalid={Boolean(errors.name)}
            autoComplete='name'
            className={authControlClassName}
            id='sign-up-name'
            placeholder={t('username-placeholder')}
            {...register('name')}
          />
        </AuthField>
        <AuthField
          error={authText(t, errors.email?.message)}
          id='sign-up-email'
          label={t('email')}
        >
          <Input
            aria-invalid={Boolean(errors.email)}
            autoComplete='email'
            className={authControlClassName}
            id='sign-up-email'
            placeholder={t('email-placeholder')}
            type='email'
            {...register('email')}
          />
        </AuthField>
        <AuthField
          error={authText(t, errors.password?.message)}
          id='sign-up-password'
          label={t('password')}
        >
          <PasswordInput
            aria-invalid={Boolean(errors.password)}
            autoComplete='new-password'
            className={authControlClassName}
            hideLabel={t('hide-password')}
            id='sign-up-password'
            placeholder={t('password-placeholder')}
            showLabel={t('show-password')}
            {...register('password')}
          />
        </AuthField>
        <AuthField
          error={authText(t, errors.confirmPassword?.message)}
          id='sign-up-confirm-password'
          label={t('confirm-password')}
        >
          <PasswordInput
            aria-invalid={Boolean(errors.confirmPassword)}
            autoComplete='new-password'
            className={authControlClassName}
            hideLabel={t('hide-password')}
            id='sign-up-confirm-password'
            placeholder={t('confirm-password-placeholder')}
            showLabel={t('show-password')}
            {...register('confirmPassword')}
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
          {isSubmitting ? <Spinner /> : t('sign-up')}
        </Button>
      </form>
      <AuthSwitchLink
        hint={t('already-have-account')}
        href='/sign-in'
        label={t('go-to-sign-in')}
      />
    </AuthFormCard>
  )
}
