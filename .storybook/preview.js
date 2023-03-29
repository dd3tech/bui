import '../src/dd360.css'
import { ThemeProvider, createTheme } from '../src/theme'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}

const theme = createTheme({
    palette: {
      secondary: {
        
      }
    }
})

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    ),
]
