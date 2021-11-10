import React from 'react'

interface ContainerProps {
    children?: React.ReactNode
    className?: string
}

export const Container = ({ children, className, ...props }: ContainerProps) => {
    return (
        <div className={`container mx-auto ${className}`} {...props}>
            {children}
        </div>
    )
}
