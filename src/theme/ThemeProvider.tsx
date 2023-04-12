/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { createContext } from 'react'
import { lightModeTheme, ThemeProps, ThemeProviderProps } from './shared'

export const ThemeContext = createContext({} as ThemeProps)

export function ThemeProvider({
  children,
  theme = lightModeTheme
}: ThemeProviderProps) {
  useEffect(() => {
    new LoanTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

class LoanTheme {
  private rootStyle: HTMLStyleElement | null = null
  private rootProperties: { [key: string]: string } = {}
  private fontFace = ''

  constructor(theme: ThemeProps) {
    this.loadVariables(theme.palette)
    this.loadTypography(theme.typography)

    this.updateRootStyle()
  }

  private addRootCSS(newProperties: { [key: string]: string }) {
    this.rootProperties = { ...this.rootProperties, ...newProperties }
  }

  private updateRootStyle() {
    if (!this.rootStyle) {
      this.rootStyle = document.createElement('style')
      document.head.appendChild(this.rootStyle)
    }

    const cssProperties = Object.entries(this.rootProperties)
      .map(([key, value]) => value && `--${key}: ${value};`)
      .join('\n')

    this.rootStyle.textContent += `${this.fontFace}\n:root {\n${cssProperties}\n}`
  }

  private loadVariables(theme: ThemeProps['palette']) {
    const {
      error,
      info,
      primary,
      secondary,
      success,
      warning,
      background,
      textColor
    } = theme

    this.addRootCSS({
      primary: primary!.main!,
      secondary: secondary!.main!,
      error: error!.main!,
      info: info!.main!,
      success: success!.main!,
      warning: warning!.main!,
      backgroundTheme: background!,
      textColor: textColor!
    })
  }

  private loadTypography(typography: ThemeProps['typography']) {
    if (typography?.srcFont) {
      const link = document.createElement('link')
      link.href = typography.srcFont
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    const { fontFamily, h1, h2, h3, h4, h5, h6, base } = typography!
    this.addRootCSS({
      fontFamily: fontFamily!,
      h1: String(h1?.fontSize),
      h2: String(h2?.fontSize),
      h3: String(h3?.fontSize),
      h4: String(h4?.fontSize),
      h5: String(h5?.fontSize),
      h6: String(h6?.fontSize),
      base: String(base?.fontSize)
    })
  }
}
