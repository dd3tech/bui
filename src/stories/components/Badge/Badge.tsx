import './badge.css'
import React from 'react'

interface BadgeProps {
    children?: React.ReactNode
    backgroundColor?: string
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    className?: string
    btn?: boolean
    onClick?: () => void
}

export const Badge = ({ children, backgroundColor, variant = 'primary', className, btn = false, onClick, ...props }: BadgeProps) => {
    const classVariant = (variant: string) => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-500'
            case 'secondary':
                return 'bg-gray-500'
            case 'success':
                return 'bg-green-500'
            case 'danger':
                return 'bg-red-500'
            case 'warning':
                return 'bg-yellow-500'
            case 'info':
                return 'bg-blue-200'
            case 'light':
                return 'bg-white-500'
            case 'dark':
                return 'bg-black-200'
            default:
                return 'bg-blue-500'
        }
    }

    return (
        <>
            {btn ? (
                <button onClick={onClick}>
                    <span className={`storybook-badge ${classVariant(variant)}`} style={{ backgroundColor }} {...props}>
                        {children}
                    </span>
                </button>
            ) : (
                <span className={`storybook-badge ${classVariant(variant)}`} style={{ backgroundColor }} {...props}>
                    {children}
                </span>
            )}
        </>
    )
}
