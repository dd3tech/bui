interface IProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    paddingVertical?: number
    paddingHorizontal?: number
    maxWidth?: 'full' | 'screen-2xl' | 'screen-xl' | 'screen-lg' | 'screen-md' | 'screen-sm'
    hasViewportHeight?: boolean
}

function Wrapper({
    children,
    className,
    paddingVertical = 10,
    paddingHorizontal = 20,
    maxWidth = 'screen-2xl',
    hasViewportHeight,
    style,
    ...otherProps
}: IProps) {
    return (
        <div
            {...otherProps}
            style={{ ...style, minHeight: hasViewportHeight ? 'calc(100vh - 193px)' : '' }}
            className={`py-${paddingVertical} max-w-${maxWidth} px-${paddingHorizontal} mx-auto ${className ?? ''}`}
        >
            {children}
        </div>
    )
}

export default Wrapper
