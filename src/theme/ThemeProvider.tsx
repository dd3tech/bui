/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { createContext, ReactNode } from 'react'
import { ThemeProps } from './shared'

interface ThemeProviderProps {
  children: ReactNode
  theme: ThemeProps
}

export const ThemeContext = createContext({} as ThemeProps)

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  useEffect(() => {
    const { error, info, primary, secondary, success, warning } = theme.palette!
    const root = document.documentElement.style
    root.setProperty('--primary', primary!.main!)
    root.setProperty('--secondary', secondary!.main!)
    root.setProperty('--error', error!.main!)
    root.setProperty('--info', info!.main!)
    root.setProperty('--success', success!.main!)
    root.setProperty('--warning', warning!.main!)
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
