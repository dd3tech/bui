import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
    shadow?: 'lg' | 'sm'
    rounded?: 'lg' | 'sm'
}

export const Container = ({ children, className, shadow, rounded, ...props }: ContainerProps) => {
    const chooseRounded = React.useCallback(() => {
        if (!rounded) return ''
        return `rounded-${rounded}`
    }, [rounded])

    const chooseShadow = React.useCallback(() => {
        if (!shadow) return ''
        return `shadow-${shadow}`
    }, [shadow])

    return (
        <div className={`container mx-auto ${className ?? ''} ${chooseShadow()} ${chooseRounded()}`} {...props}>
            {children}
        </div>
    )
}
