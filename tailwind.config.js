module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
            opacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
            cursor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
            translate: ['group-hover'],
            scale: ['group-hover']
        }
    },
    plugins: []
}
