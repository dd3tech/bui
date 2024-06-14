const { alias } = require('../alias.config.cjs')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
    webpackFinal: async (config, _) => {
        config.resolve = {
            ...(config.resolve || {}),
            extensions: ['.ts', '.tsx', '.js'],
            alias
        }
        return config
    }
}
