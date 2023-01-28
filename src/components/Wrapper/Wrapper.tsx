import React from 'react'
import { composeClasses } from '../../lib/classes'
import { MaxWidth, Padding } from '../../lib/types'
import { spacing } from '../../lib/spacing'

export interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    paddingY?: Padding
    paddingX?: Padding
    maxWidth?: MaxWidth
    hasViewportHeight?: boolean
}

function Wrapper({ children, className, paddingY = '10', paddingX = '20', maxWidth = 'screen-2xl', hasViewportHeight, style, ...otherProps }: WrapperProps) {
    return (
        <div
            style={{ ...style, minHeight: hasViewportHeight ? 'calc(100vh - 193px)' : '' }}
            className={composeClasses(`max-w-${maxWidth}`, `py-${paddingY}`, `px-${paddingX}`, spacing.auto.marginHorizontal, className)}
            {...otherProps}
        >
            {children}
        </div>
    )
}

export default Wrapper
