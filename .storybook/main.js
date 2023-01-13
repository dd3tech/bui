const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
    webpackFinal: async (config, { configType }) => {
        config.resolve = {
            ...(config.resolve || {}),
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                components: path.resolve(__dirname, '../src', 'components'),
                hooks: path.resolve(__dirname, '../src', 'hooks')
            }
        }
        return config
    }
}
