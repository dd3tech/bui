interface OverFlowProps {
    children?: React.ReactNode
    className?: string
    overflow?: 'auto' | 'hidden' | 'visible' | 'x-auto' | 'x-hidden' | 'x-visible' | 'scroll' | 'y-auto' | 'y-hidden' | 'y-visible' | 'x-scroll' | 'y-scroll'
}

export const OverFlow = ({ children, className, overflow, ...props }: OverFlowProps) => {
    return (
        <div className={`overflow-${overflow ?? 'auto'} ${className ?? ''}`} {...props}>
            {children}
        </div>
    )
}
