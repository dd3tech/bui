/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTheme, mergeThemes, generateCSSProperties } from './shared'

const theme1 = {
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff'
    }
  }
}

const theme2 = {
  palette: {
    primary: {
      main: '#f00'
    },
    secondary: {
      main: '#0f0'
    }
  },
  typography: {
    fontSize: 20
  }
}

describe('mergeThemes', () => {
  test('should merge two themes together', () => {
    const mergedTheme = mergeThemes(theme1, theme2)

    expect(mergedTheme.palette.primary!.main).toEqual('#f00')
    expect(mergedTheme.palette.primary!.contrastText).toEqual('#fff')
    expect(mergedTheme.palette.secondary!.main).toEqual('#0f0')
  })
})

const theme = {
  palette: {
    primary: {
      main: '#f00'
    }
  }
}

describe('createTheme', () => {
  test('should create a theme with default values', () => {
    const createdTheme = createTheme(theme)

    expect(createdTheme.palette.primary!.main).toEqual('#f00')
    expect(createdTheme.palette.secondary!.main).toEqual('white')
  })
})

describe('generateCSSProperties', () => {
  test('should return empty string if obj is undefined', () => {
    const result = generateCSSProperties(undefined)
    expect(result).toEqual('')
  })

  test('should filter out undefined values', () => {
    const result = generateCSSProperties({
      color: 'red',
      background: undefined,
      border: '1px solid black',
      padding: undefined
    })
    expect(result).not.toContain('background')
    expect(result).not.toContain('padding')
    expect(result).toContain('color')
    expect(result).toContain('border')
  })

  test('should generate CSS properties string with !important', () => {
    const result = generateCSSProperties({
      color: 'red',
      background: 'blue',
      border: '1px solid black'
    })
    expect(result).toContain('color: red !important;')
    expect(result).toContain('background: blue !important;')
    expect(result).toContain('border: 1px solid black !important;')
  })
})
