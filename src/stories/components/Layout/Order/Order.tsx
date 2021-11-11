interface OrderProps {
    children: React.ReactNode
    className?: string
    order: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'first' | 'last' | 'none'
}

export const Order = ({ className, children, order }: OrderProps) => {
    return <div className={`order-${order} ${className}`}>{children}</div>
}
