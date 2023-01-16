import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    index: number
    children: React.ReactNode
}

function TabPanel({ index, value, children, className, ...otherProps }: Props) {
    if (index !== value) return null
    return (
        <div role="tabpanel" className={className || 'px-4 py-2'} {...otherProps}>
            {children}
        </div>
    )
}

export default TabPanel
