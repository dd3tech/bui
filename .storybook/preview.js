import '../src/dd360.css'
import { ThemeProvider } from '../src/theme'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}

export const decorators = [
    (Story) => (
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    ),
]
