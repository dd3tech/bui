/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { createContext } from 'react'
import { generateCSSProperties, ThemeProps, ThemeProviderProps } from './shared'

export const ThemeContext = createContext({} as ThemeProps)

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  useEffect(() => {
    new LoanTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

class LoanTheme {
  constructor(theme: ThemeProps) {
    this.loadVariables(theme.palette)
    this.loadTypography(theme.typography)
  }

  private loadVariables(theme: ThemeProps['palette']) {
    const { error, info, primary, secondary, success, warning } = theme
    const root = document.documentElement.style
    root.setProperty('--primary', primary!.main!)
    root.setProperty('--secondary', secondary!.main!)
    root.setProperty('--error', error!.main!)
    root.setProperty('--info', info!.main!)
    root.setProperty('--success', success!.main!)
    root.setProperty('--warning', warning!.main!)
  }

  private loadTypography(typography: ThemeProps['typography']) {
    const fontFace = {
      'font-family': typography?.fontFamily,
      src: typography?.srcFont
    }
    const fontFaceRule = `@font-face {
      ${generateCSSProperties(fontFace)}
    }`

    const style = document.createElement('style')
    style.appendChild(document.createTextNode(fontFaceRule))
    document.head.appendChild(style)

    const root = document.documentElement.style
    const { fontFamily, fontSize, h1, h2, h3, h4, h5, h6, base } = typography!
    root.setProperty('--fontFamily', fontFamily!)
    root.setProperty(
      '--fontSize',
      typeof fontSize === 'number' ? `${fontSize}px` : String(fontSize)
    )
    root.setProperty('--h1', String(h1?.fontSize))
    root.setProperty('--h2', String(h2?.fontSize))
    root.setProperty('--h3', String(h3?.fontSize))
    root.setProperty('--h4', String(h4?.fontSize))
    root.setProperty('--h5', String(h5?.fontSize))
    root.setProperty('--h6', String(h6?.fontSize))
    root.setProperty('--base', String(base?.fontSize))
  }
}
