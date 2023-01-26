import React from 'react'
import { composeClasses } from 'lib/classes'
import { MaxWidth, paddingY, paddingX } from 'lib/types'
import { spacing } from 'lib/spacing'

export interface WrapperProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    paddingY?: paddingY
    paddingX?: paddingX
    maxWidth?: MaxWidth
    hasViewportHeight?: boolean
}

function Wrapper({
    children,
    className,
    paddingY = 'py-10',
    paddingX = 'px-20',
    maxWidth = 'max-w-screen-2xl',
    hasViewportHeight,
    style,
    ...otherProps
}: WrapperProps) {
    return (
        <div
            style={{ ...style, minHeight: hasViewportHeight ? 'calc(100vh - 193px)' : '' }}
            className={composeClasses(paddingY, maxWidth, paddingX, spacing.auto.marginHorizontal, className)}
            {...otherProps}
        >
            {children}
        </div>
    )
}

export default Wrapper
