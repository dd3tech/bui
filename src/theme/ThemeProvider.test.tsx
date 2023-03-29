import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { ThemeProps } from './shared'

describe('ThemeProvider', () => {
  test('should render children', () => {
    const theme: ThemeProps = {
      palette: {
        primary: {
          main: 'red'
        }
      }
    }
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <div>Child Component</div>
      </ThemeProvider>
    )

    const childComponent = getByText(/child component/i)
    expect(childComponent).toBeInTheDocument()
  })
})
