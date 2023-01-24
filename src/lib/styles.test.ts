import { describe, it, expect } from 'vitest'
import { composeStyles, StyleObject } from './styles'

describe('composeStyles', () => {
    it('should return an empty object when receiving a null array', () => {
        const composedStyles = composeStyles(null)
        expect(composedStyles).toEqual({})
    })

    it('should return an empty object when receiving an empty array', () => {
        const composedStyles = composeStyles([])
        expect(composedStyles).toEqual({})
    })

    it('should compose multiple style objects into a single CSS Object', () => {
        const buttonStyles = {
            background: 'red',
            color: 'white',
            padding: '10px',
            fontSize: '16px'
        }

        const textStyles = {
            fontWeight: 'bold',
            textDecoration: 'underline'
        }

        const composedStyles = composeStyles([buttonStyles, textStyles])
        expect(composedStyles).toEqual({
            background: 'red',
            color: 'white',
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            textDecoration: 'underline'
        })
    })

    it('should filter out null, undefined and boolean values', () => {
        const styleObjects: StyleObject[] = [
            { color: 'red', fontSize: 12, padding: null },
            { color: 'blue', fontSize: undefined, padding: '5px' },
            { color: 'green', fontSize: 14, padding: true }
        ]
        expect(composeStyles(styleObjects)).toEqual({ color: 'green', fontSize: 14, padding: '5px' })
    })
})
