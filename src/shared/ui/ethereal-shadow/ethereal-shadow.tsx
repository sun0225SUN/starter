'use client'

import {
  type AnimationPlaybackControls,
  animate,
  useMotionValue,
} from 'motion/react'
import { type CSSProperties, useEffect, useId, useRef } from 'react'

type AnimationConfig = {
  scale: number
  speed: number
}

type NoiseConfig = {
  opacity: number
  scale: number
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
) {
  if (fromLow === fromHigh) return toLow
  const percentage = (value - fromLow) / (fromHigh - fromLow)
  return toLow + percentage * (toHigh - toLow)
}

export function EtherealShadow({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className,
}: {
  sizing?: 'fill' | 'stretch'
  color?: string
  animation?: AnimationConfig
  noise?: NoiseConfig
  style?: CSSProperties
  className?: string
}) {
  const rawId = useId().replace(/:/g, '')
  const filterId = `shadowoverlay-${rawId}`
  const animationEnabled = Boolean(animation && animation.scale > 0)
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null)
  const hueRotate = useMotionValue(180)
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null)

  const displacementScale = animation
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0
  const animationDuration = animation
    ? mapRange(animation.speed, 1, 100, 1000, 50)
    : 1

  useEffect(() => {
    if (!feColorMatrixRef.current || !animationEnabled) return

    hueRotateAnimation.current?.stop()
    hueRotate.set(0)
    hueRotateAnimation.current = animate(hueRotate, 360, {
      duration: animationDuration / 25,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'loop',
      ease: 'linear',
      onUpdate: (value) => {
        feColorMatrixRef.current?.setAttribute('values', String(value))
      },
    })

    return () => {
      hueRotateAnimation.current?.stop()
    }
  }, [animationDuration, animationEnabled, hueRotate])

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${filterId}) blur(4px)` : 'none',
        }}
      >
        {animationEnabled && animation ? (
          <svg aria-hidden='true' style={{ position: 'absolute' }}>
            <title>Silk shadow</title>
            <defs>
              <filter id={filterId}>
                <feTurbulence
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  numOctaves='2'
                  result='undulation'
                  seed='0'
                  type='turbulence'
                />
                <feColorMatrix
                  in='undulation'
                  ref={feColorMatrixRef}
                  type='hueRotate'
                  values='180'
                />
                <feColorMatrix
                  in='dist'
                  result='circulation'
                  type='matrix'
                  values='4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0'
                />
                <feDisplacementMap
                  in='SourceGraphic'
                  in2='circulation'
                  result='dist'
                  scale={displacementScale}
                />
                <feDisplacementMap
                  in='dist'
                  in2='undulation'
                  result='output'
                  scale={displacementScale}
                />
              </filter>
            </defs>
          </svg>
        ) : null}
        <div
          style={{
            backgroundColor: color,
            maskImage: "url('/images/auth/silk-mask.png')",
            maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {noise && noise.opacity > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/images/auth/silk-noise.png')",
            backgroundSize: noise.scale * 200,
            backgroundRepeat: 'repeat',
            opacity: noise.opacity / 2,
          }}
        />
      ) : null}
    </div>
  )
}
