const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}']
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--fontFamily)', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        error: 'var(--error)',
        info: 'var(--info)',
        success: 'var(--success)',
        warning: 'var(--warning)'
      },
      borderWidth: {
        3: '3px'
      },
      fontSize: {
        h1: 'var(--h1)',
        h2: 'var(--h2)',
        h3: 'var(--h3)',
        h4: 'var(--h4)',
        h5: 'var(--h5)',
        h6: 'var(--h6)',
        paragraph: 'var(--base)',
        xxs: '0.625rem'
      },
      borderRadius: {
        base: '0.25rem'
      },
      height: {
        inherit: 'inherit',
        13: '3.375rem'
      },
      inset: {
        13: '3.375rem'
      },
      boxShadow: {
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      opacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      translate: ['group-hover'],
      scale: ['group-hover']
    }
  },
  plugins: []
}
