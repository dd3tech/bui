import { it, describe } from 'vitest'
import { borderRadius } from './shape'

describe('shape', () => {
  it('should be contain the correct number of attributes', () => {
    expect(Object.keys(borderRadius).length).toBe(5)
  })
})
