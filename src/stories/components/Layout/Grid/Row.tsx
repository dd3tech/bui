import React from 'react'

interface RowProps {
    children?: React.ReactNode
    className?: string
    cols: 1 | 2 | 3 | 4
    sm?: 1 | 2 | 3 | 4
    md?: 1 | 2 | 3 | 4
    gap?: 1 | 2 | 3 | 4 | 5
}

export const Row = ({ children, className, cols, md, gap, sm, ...props }: RowProps) => {
    return (
        <div className={`grid grid-cols-${cols} ${md && `md:grid-cols-${md}`} ${sm && `sm:grid-cols-${sm}`} ${gap && `gap-${gap}`} ${className}`} {...props}>
            {children}
        </div>
    )
}
