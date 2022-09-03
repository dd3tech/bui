import React, { forwardRef } from 'react'

const Flex = forwardRef<HTMLDivElement>(({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>, ref) => {
    return (
        <div ref={ref} className={`flex ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
})

export default Flex
