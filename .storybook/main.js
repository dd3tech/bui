const { alias } = require('../alias.config')

const config = {
  stories: [
    {
      directory: '../src/**',
      files: '**/*.stories.@(mdx|tsx|ts|jsx|js)'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  webpackFinal: async (config, _) => {
    config.resolve = {
      ...(config.resolve || {}),
      extensions: ['.ts', '.tsx', '.js'],
      alias
    }
    return config
  }
}

export default config
