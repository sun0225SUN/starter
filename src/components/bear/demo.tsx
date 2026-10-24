'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useBearStore } from '@/stores/use-bear-store'

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  const t = useTranslations('bear')

  return (
    <h1 className='text-2xl font-medium tracking-tight'>
      {t('aroundHere', { count: bears })}
    </h1>
  )
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const removeAllBears = useBearStore((state) => state.removeAllBears)
  const t = useTranslations('bear')

  return (
    <div className='flex items-center gap-2'>
      <Button onClick={increasePopulation}>{t('oneUp')}</Button>
      <Button variant='outline' onClick={removeAllBears}>
        {t('removeAll')}
      </Button>
    </div>
  )
}

export function BearDemo() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <BearCounter />
      <Controls />
    </div>
  )
}
