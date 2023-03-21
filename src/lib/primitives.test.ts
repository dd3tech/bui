import { it, describe } from 'vitest'
import {
  ButtonVariants,
  HorizontalPositions,
  Importances,
  Sizes,
  TextAlignments,
  VerticalPositions
} from './primitives'

describe('primitives', () => {
  it('should be contain the correct number of attributes', () => {
    expect(Object.keys(TextAlignments).length).toBe(6)
    expect(Object.keys(Sizes).length).toBe(8)
    expect(Object.keys(Importances).length).toBe(2)
    expect(Object.keys(ButtonVariants).length).toBe(13)
    expect(Object.keys(HorizontalPositions).length).toBe(2)
    expect(Object.keys(VerticalPositions).length).toBe(2)
  })
})
