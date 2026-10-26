import { Field as FieldPrimitive } from '@base-ui/react/field'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

export function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-group'
      className={cn('flex flex-col gap-5', className)}
      {...props}
    />
  )
}

export function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot='field'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

export function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot='field-label'
      className={cn('text-sm font-medium', className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot='field-error'
      className={cn('text-destructive text-sm', className)}
      match
      {...props}
    />
  )
}
