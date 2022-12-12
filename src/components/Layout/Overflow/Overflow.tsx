import React, { forwardRef } from 'react'

export interface OverFlowProps extends React.HTMLAttributes<HTMLDivElement> {
    overflow?: 'auto' | 'hidden' | 'visible' | 'x-auto' | 'x-hidden' | 'x-visible' | 'scroll' | 'y-auto' | 'y-hidden' | 'y-visible' | 'x-scroll' | 'y-scroll'
}

const OverFlow = forwardRef<HTMLDivElement, OverFlowProps>((overflowProps: OverFlowProps, ref) => {
    const { children, className, overflow, ...props } = overflowProps

    return (
        <div ref={ref} className={`overflow-${overflow} ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
})

OverFlow.displayName = 'OverFlow'
OverFlow.defaultProps = {
    overflow: 'auto'
}

export default OverFlow
