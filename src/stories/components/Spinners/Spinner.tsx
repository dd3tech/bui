import React from 'react'

interface SpinnerProps {
    color?: string
    className?: string
    variant?: 'red' | 'green' | 'blue' | 'black' | 'yellow'
    type?: 'circle' | 'grow'
}

export const Spinner = ({ color, className, variant, type, ...props }: SpinnerProps) => {
    const choiseType = (type: SpinnerProps['type']) => {
        switch (type) {
            case 'circle':
                return 'spinner-border'
            case 'grow':
                return 'spinner-grow'
            default:
                return 'spinner-border'
        }
    }

    const choiseColor = (color: SpinnerProps['color']) => {
        switch (color) {
            case 'red':
                return 'text-red-500'
            case 'green':
                return 'text-green-500'
            case 'blue':
                return 'text-blue-500'
            case 'black':
                return 'text-black-500'
            case 'yellow':
                return 'text-yellow-500'
            default:
                return ''
        }
    }

    return <div className={`${choiseType(type)} ${choiseColor(variant)} ${className ?? ''}`} style={{ color: color }} {...props}></div>
}
