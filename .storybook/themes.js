import { create } from '@storybook/theming'

export const customDD360 = create({
    // UI
    appBg: '#F6F9FC',
    appContentBg: '#FFFFFF',
    appBorderColor: 'rgba(0,0,0,.1)',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    // Base color
    base: 'light',
    colorPrimary: '#1D4ED8',
    colorSecondary: '#1D4ED8',

    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: 'rgba(0,0,0,.3)',
    inputTextColor: '#333333',
    inputBorderRadius: 4,

    brandTitle: 'DD360 Storybook',
    brandUrl: 'https://dd360.mx',
    brandImage: 'https://dd360.mx/images/logo/DD360_LOGO.png',
    brandTarget: '_self'
})
