import '../src/dd360.css'
import { ThemeProvider } from '../src/theme'

const parameters = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
}
export default parameters
