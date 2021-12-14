import React from 'react'
interface OrderProps {
    children: React.ReactNode
    className?: string
    order: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'first' | 'last' | 'none'
    onClick?: (event: React.ChangeEvent<any>) => void
}

export const Order = ({ className, children, order, ...props }: OrderProps | any) => {
    return (
        <div className={`${order ? `order-${order}` : ''} ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
}
