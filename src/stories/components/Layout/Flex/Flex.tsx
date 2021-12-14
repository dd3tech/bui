import React from 'react'
interface FlexProps {
    className?: string
    children?: React.ReactNode
}

export const Flex = ({ className, children, ...props }: FlexProps) => {
    return (
        <div className={`flex ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
}
