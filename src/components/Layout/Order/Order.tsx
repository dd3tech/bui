import React from 'react'
export interface OrderProps extends React.HTMLAttributes<HTMLDivElement> {
    order: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'first' | 'last' | 'none'
}

export const Order = ({ className, children, order, ...props }: OrderProps) => {
    return (
        <div className={`${order ? `order-${order}` : ''} ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
}
