import React, { forwardRef } from 'react'
export interface OrderProps extends React.HTMLAttributes<HTMLDivElement> {
    order: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'first' | 'last' | 'none'
}

const Order = forwardRef<HTMLDivElement, OrderProps>((orderProps: OrderProps, ref) => {
    const { className = '', children, order, ...props } = orderProps

    return (
        <div className={`order-${order} ${className}`} ref={ref} {...props}>
            {children}
        </div>
    )
})

export default Order
