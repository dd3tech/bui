import React from 'react'

interface TextProps {
    children: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
    align?: 'center' | 'left' | 'right' | 'justify'
}

export const Text = ({ children, className, align, variant, ...props }: TextProps) => {
    switch (variant) {
        case 'h1':
            return (
                <h1 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h3>
            )
        case 'h4':
            return (
                <h4 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h4>
            )
        case 'h5':
            return (
                <h5 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h5>
            )
        case 'h6':
            return (
                <h6 className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </h6>
            )
        case 'p':
            return (
                <p className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </p>
            )
        case 'span':
            return (
                <span className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </span>
            )
        default:
            return (
                <p className={`${align ? `text-${align}` : ''} ${className ?? ''}`} {...props}>
                    {children}
                </p>
            )
    }
}
