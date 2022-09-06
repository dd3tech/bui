import React, { forwardRef } from 'react'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
    cols: 1 | 2 | 3 | 4
    sm?: 1 | 2 | 3 | 4
    md?: 1 | 2 | 3 | 4
    gap?: 1 | 2 | 3 | 4 | 5
}

const Row = forwardRef<HTMLDivElement, RowProps>((rowProps: RowProps, ref) => {
    const { children, className, cols, md, gap, sm, ...props } = rowProps

    const finalClassName = React.useCallback(() => {
        const defCols = `${cols ? `grid-cols-${cols}` : ''} `
        const smCols = `${sm ? `sm:grid-cols-${sm}` : ''}`
        const mdCols = `${md ? `md:grid-cols-${md}` : ''}`
        return `grid ${defCols} ${smCols} ${mdCols} ${gap ? `gap-${gap}` : ''} ${className ?? ''}`
    }, [className, cols, md, gap, sm])

    return (
        <div className={finalClassName()} ref={ref} {...props}>
            {children}
        </div>
    )
})

export default Row
