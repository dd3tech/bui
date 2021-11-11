import React from 'react'

interface ContainerProps {
    children?: React.ReactNode
    className?: string
    shadow?: 'lg' | 'sm'
    rounded?: 'lg' | 'sm'
}

export const Container = ({ children, className, shadow, rounded, ...props }: ContainerProps) => {
    return (
        <div className={`container mx-auto ${className} ${shadow && `shadow-${shadow}`} ${rounded && `rounded-${rounded}`} `} {...props}>
            {children}
        </div>
    )
}
