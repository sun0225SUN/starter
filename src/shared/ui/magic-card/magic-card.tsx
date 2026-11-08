'use client'

import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { cn } from '@/shared/lib/cn'

export function MagicCard({
  children,
  className,
  backgroundClassName,
  gradientClassName,
  gradientSize = 200,
  gradientColor = 'var(--magic-spotlight)',
  gradientOpacity = 0.8,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
}: {
  children?: ReactNode
  className?: string
  backgroundClassName?: string
  gradientClassName?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)
  const [animated, setAnimated] = useState(false)
  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [gradientSize, mouseX, mouseY])

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    setAnimated(true)
  }, [])

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    const handleGlobalPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) reset()
    }

    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') reset()
    }

    window.addEventListener('pointerout', handleGlobalPointerOut)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('pointerout', handleGlobalPointerOut)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reset])

  const borderBackground = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, var(--border) 100%)`
  const spotlightBackground = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`

  const borderClassName = cn(
    'bg-border pointer-events-none absolute inset-0 hidden rounded-[inherit] duration-300 group-hover:opacity-100 md:block',
    gradientClassName,
  )
  const spotlightClassName = cn(
    'pointer-events-none absolute inset-px hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block',
    gradientClassName,
  )

  return (
    <div
      className={cn('group relative rounded-[inherit]', className)}
      onPointerEnter={reset}
      onPointerLeave={reset}
      onPointerMove={handlePointerMove}
    >
      {animated ? (
        <motion.div
          className={borderClassName}
          style={{ background: borderBackground }}
        />
      ) : (
        <div className={borderClassName} />
      )}
      <div
        className={cn(
          'bg-background absolute inset-px rounded-[inherit]',
          backgroundClassName,
        )}
      />
      {animated ? (
        <motion.div
          className={spotlightClassName}
          style={{ background: spotlightBackground, opacity: gradientOpacity }}
        />
      ) : (
        <div className={spotlightClassName} />
      )}
      <div className='relative'>{children}</div>
    </div>
  )
}
