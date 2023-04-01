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

const theme = createTheme({ palette: { primary: {main: 'purple'} }, typography: {
    fontFamily: `'Delicious Handrawn', sans-serif`,
    srcFont: 'https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap'
} })

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    ),
]
