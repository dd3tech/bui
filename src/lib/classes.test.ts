import { expect, describe } from 'vitest'
import { composeClasses } from './classes'

describe('composeClasses function', () => {
  const mockWords = {
    first: 'first',
    second: 'second',
    three: 'three'
  }

  it('should return a string', () => {
    expect(composeClasses()).toBe('')
  })

  it('should concatenate the parameters that we pass to it', () => {
    expect(composeClasses(mockWords.first, mockWords.second)).toBe(
      `${mockWords.first} ${mockWords.second}`
    )
  })

  it('if we pass any argument in undefined it should remove it', () => {
    expect(composeClasses(undefined)).toBe('')
    expect(composeClasses(mockWords.first, undefined, mockWords.three)).toBe(
      `${mockWords.first} ${mockWords.three}`
    )
    expect(composeClasses(mockWords.first, undefined)).toBe(mockWords.first)
  })

  it('if we pass any argument in null it should remove it', () => {
    expect(composeClasses(null)).toBe('')
    expect(composeClasses(mockWords.first, null, mockWords.three)).toBe(
      `${mockWords.first} ${mockWords.three}`
    )
    expect(composeClasses(mockWords.first, null)).toBe(mockWords.first)
  })

  it('should remove booleans', () => {
    expect(composeClasses(false)).toBe('')
    expect(composeClasses(mockWords.first, false, mockWords.three)).toBe(
      `${mockWords.first} ${mockWords.three}`
    )
    expect(composeClasses(mockWords.first, false)).toBe(mockWords.first)
  })

  it('should remove unnecessary spaces', () => {
    expect(
      composeClasses('  ', mockWords.first, mockWords.second, '    ')
    ).toBe(`${mockWords.first} ${mockWords.second}`)
    expect(composeClasses('   text-error   ')).toEqual('text-error')
  })
})
