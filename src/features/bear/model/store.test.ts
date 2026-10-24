import { beforeEach, expect, test } from 'vitest'
import { useBearStore } from './store'

beforeEach(() => {
  useBearStore.setState({ bears: 0 })
})

test('increasePopulation adds one bear', () => {
  useBearStore.getState().increasePopulation()

  expect(useBearStore.getState().bears).toBe(1)
})

test('removeAllBears resets the count', () => {
  const { increasePopulation, removeAllBears } = useBearStore.getState()
  increasePopulation()
  removeAllBears()

  expect(useBearStore.getState().bears).toBe(0)
})
