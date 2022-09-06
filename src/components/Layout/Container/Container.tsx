import React, { forwardRef } from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
    shadow?: 'lg' | 'sm'
    rounded?: 'lg' | 'sm'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>((containerProps: ContainerProps, ref) => {
    const { children, className, shadow, rounded, ...props } = containerProps

    const chooseRounded = React.useCallback(() => {
        if (!rounded) return ''
        return `rounded-${rounded}`
    }, [rounded])

    const chooseShadow = React.useCallback(() => {
        if (!shadow) return ''
        return `shadow-${shadow}`
    }, [shadow])

    return (
        <div ref={ref} className={`container mx-auto ${className ?? ''} ${chooseShadow()} ${chooseRounded()}`} {...props}>
            {children}
        </div>
    )
})

Container.displayName = 'Container'

export default Container
