'use client'

import { Eye, EyeOff } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { Input } from '@/shared/ui/input'

export function PasswordInput({
  className,
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  ...props
}: ComponentProps<'input'> & {
  hideLabel?: string
  showLabel?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className='relative'>
      <Input
        className={cn('h-10 pr-10', className)}
        type={visible ? 'text' : 'password'}
        {...props}
      />
      <button
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
        onClick={() => setVisible((current) => !current)}
        type='button'
      >
        {visible ? (
          <EyeOff aria-hidden='true' size={18} />
        ) : (
          <Eye aria-hidden='true' size={18} />
        )}
      </button>
    </div>
  )
}
