import React from 'react'

export const Flex = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`flex ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
}
