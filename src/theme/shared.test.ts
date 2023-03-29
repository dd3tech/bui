/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTheme, mergeThemes } from './shared'

describe('mergeThemes', () => {
  test('should merge two themes together', () => {
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

    const mergedTheme = mergeThemes(theme1, theme2)

    expect(mergedTheme.palette.primary!.main).toEqual('#f00')
    expect(mergedTheme.palette.primary!.contrastText).toEqual('#fff')
    expect(mergedTheme.palette.secondary!.main).toEqual('#0f0')
  })
})

describe('createTheme', () => {
  test('should create a theme with default values', () => {
    const theme = {
      palette: {
        primary: {
          main: '#f00'
        }
      }
    }

    const createdTheme = createTheme(theme)

    expect(createdTheme.palette.primary!.main).toEqual('#f00')
    expect(createdTheme.palette.secondary!.main).toEqual('#f44336')
  })
})
