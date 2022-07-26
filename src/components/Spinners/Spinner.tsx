import React from 'react'
import { css } from '@emotion/css'

interface SpinnerProps {
    color?: string
    className?: string
    variant?: 'red' | 'green' | 'blue' | 'black' | 'yellow'
    type?: 'circle' | 'grow'
    pageLoader?: boolean
}

export const Spinner = ({ color, className, variant, type, pageLoader, ...props }: SpinnerProps) => {
    if (pageLoader) {
        const loader = css`
            border-top-color: #1d4ed8;
            border-right-color: #1d4ed8;
        `
        return (
            <div className="flex justify-center items-center">
                <div className={`${loader} animate-spin rounded-full border-8 border-t-8 h-32 w-32 border-gray-300`} />
            </div>
        )
    }

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

export const LoaderSpinner = () => {}
