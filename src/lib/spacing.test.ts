import { it, describe } from 'vitest'
import { spacing } from './spacing'

describe('spacing', () => {
    it('should be contain the correct number of attributes', () => {
        expect(Object.keys(spacing).length).toBe(13)
    })
})
