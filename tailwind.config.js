module.exports = {
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}']
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderWidth: {
                '3': '3px'
            },
            fontSize: {
                xxs: '0.625rem'
            },
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
