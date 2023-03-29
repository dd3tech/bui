interface PaletteOptions {
  main?: string
  contrastText?: string
}

export interface ThemeProps {
  palette: {
    primary?: PaletteOptions
    secondary?: PaletteOptions
    error?: PaletteOptions
    warning?: PaletteOptions
    info?: PaletteOptions
    success?: PaletteOptions
  }
  // other props
}

const designSystemTheme: ThemeProps = {
  palette: {
    primary: {
      contrastText: 'white',
      main: '#1d4ed8'
    },
    secondary: {
      contrastText: '',
      main: 'white'
    },
    success: {
      contrastText: '',
      main: '#22c55e'
    },
    warning: {
      contrastText: '',
      main: '#eab308'
    },
    info: {
      contrastText: '',
      main: '#6b7280'
    },
    error: {
      contrastText: '',
      main: '#ef4444'
    }
  }
}

export function mergeThemes(
  theme1: ThemeProps,
  theme2: ThemeProps
): ThemeProps {
  const merged: ThemeProps = { ...theme1 }
  for (const [key, value] of Object.entries(theme2)) {
    if (typeof value === 'object' && value !== null) {
      merged[key] = mergeThemes(theme1[key], value)
    } else {
      merged[key] = value
    }
  }
  return merged
}

export function createTheme(theme: ThemeProps): ThemeProps {
  const defaultTheme = mergeThemes(designSystemTheme, theme)
  return defaultTheme
}
