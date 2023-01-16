import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
    shadow?: 'lg' | 'sm' | 'md' | 'xl' | '2xl' | 'inner' | 'none'
    rounded?: 'lg' | 'sm' | 'md' | 'xl' | '2xl' | '3xl' | 'full' | 'rounded' | 'none'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>((containerProps: ContainerProps, ref) => {
    const { children, className, shadow, rounded, ...props } = containerProps
    return (
        <div ref={ref} className={composeClasses('container mx-auto', rounded && `rounded-${rounded}`, shadow && `shadow-${shadow}`, className)} {...props}>
            {children}
        </div>
    )
})

Container.displayName = 'Container'

export default Container
