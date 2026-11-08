'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function NoiseBg() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )
  const { resolvedTheme } = useTheme()
  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div className='pointer-events-none fixed inset-0 -z-10 h-svh w-screen'>
      <div className='absolute inset-0 opacity-50'>
        <Image
          alt=''
          className='object-cover'
          fill
          sizes='100vw'
          src='/images/background/wave.webp'
        />
      </div>
      <div className='absolute inset-0 opacity-5'>
        <Image
          alt=''
          className='object-cover'
          fill
          sizes='100vw'
          src='/images/background/noise.png'
        />
      </div>
      <div
        className='absolute inset-0 opacity-30'
        style={{
          background:
            'radial-gradient(56.32% 64.6% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
    </div>
  )
}
