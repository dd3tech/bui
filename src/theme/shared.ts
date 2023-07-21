/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ReactNode } from 'react'
import { DEFAULT_TAILWIND_TEXT_SIZE } from '../lib/font'

// Define the props for the ThemeProvider component
export interface ThemeProviderProps {
  children: ReactNode // The children that the ThemeProvider wraps
  theme?: ThemeProps // The theme object that provides styling for the children
}

// Define the optional properties for a color palette option
interface PaletteOptions {
  main?: string // The main color value
  contrastText?: string // The text color that provides contrast to the main color
}

// Define the optional properties for a typography style option
interface TypographyStyleOptions {
  fontSize?: number | string // The font size of the typography
  fontWeight?: number | string // The font weight of the typography
}

interface Palette {
  primary?: PaletteOptions // The primary color options
  secondary?: PaletteOptions // The secondary color options
  error?: PaletteOptions // The error color options
  warning?: PaletteOptions // The warning color options
  info?: PaletteOptions // The info color options
  success?: PaletteOptions // The success color options
  background?: string
  textColor?: string
}

interface TypographyStyles {
  fontFamily?: string // The font family to be used for the typography
  fontSize?: number // The default font size to be used for the typography
  srcFont?: string // The source URL of the font to be used for the typography
  h1?: TypographyStyleOptions // The options for heading 1 typography
  h2?: TypographyStyleOptions // The options for heading 2 typography
  h3?: TypographyStyleOptions // The options for heading 3 typography
  h4?: TypographyStyleOptions // The options for heading 4 typography
  h5?: TypographyStyleOptions // The options for heading 5 typography
  h6?: TypographyStyleOptions // The options for heading 6 typography
  base?: TypographyStyleOptions // The base typography options
  subtitle1?: TypographyStyleOptions // The options for subtitle 1 typography
  subtitle2?: TypographyStyleOptions // The options for subtitle 2 typography
  body1?: TypographyStyleOptions // The options for body 1 typography
  body2?: TypographyStyleOptions // The options for body 2 typography
  caption?: TypographyStyleOptions // The options for caption typography
  button?: TypographyStyleOptions // The options for button typography
  overline?: TypographyStyleOptions // The options for overline typography
}

// Define the properties for the theme object
export interface ThemeProps {
  palette: Palette
  typography?: TypographyStyles

  [key: string]: any // only to use in mergeData
}

// Defining the default light mode theme
export const lightModeTheme: ThemeProps = {
  palette: {
    primary: {
      contrastText: 'white',
      main: '#1c4ed9'
    },
    secondary: {
      main: 'white',
      contrastText: ''
    },
    success: {
      main: '#22c55e'
    },
    warning: {
      main: '#eab308'
    },
    info: {
      main: '#6b7280'
    },
    error: {
      main: '#ef4444'
    },
    background: '#fff',
    textColor: '#000'
  },
  typography: {
    fontFamily: 'Archivo',
    srcFont:
      'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&display=swap',
    h1: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['4xl']
    },
    h2: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['3xl']
    },
    h3: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['2xl']
    },
    h4: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['xl']
    },
    h5: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['lg']
    },
    h6: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['base']
    },
    base: {
      fontSize: DEFAULT_TAILWIND_TEXT_SIZE['sm']
    }
  }
}

// Function to merge two theme objects
export function mergeThemes(
  theme1: ThemeProps,
  theme2: ThemeProps
): ThemeProps {
  const merged: ThemeProps = { ...theme1 }
  for (const [key, value] of Object.entries(theme2)) {
    if (typeof theme1[key] === 'object' && theme1[key] !== null) {
      merged[key] = mergeThemes(theme1[key], value)
    } else {
      merged[key] = value || ''
    }
  }
  return merged
}

// Function to create a new theme object by merging the default light mode theme and a custom theme
export function createTheme(theme: ThemeProps): ThemeProps {
  const defaultTheme = mergeThemes(lightModeTheme, theme)
  return defaultTheme
}

// Function to generate CSS properties from an object
export function generateCSSProperties(obj?: { [key: string]: any }) {
  if (!obj) return ''
  const cssProperties = Object.entries(obj)
    .filter(([_, value]) => {
      return value !== undefined
    })
    .map(([key, value]) => `${key}: ${value} !important;`)
    .join('\n')
  return cssProperties
}
