interface TextProps {
    children: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export const Text = ({ children, className, variant }: TextProps) => {
    switch (variant) {
        case 'h1':
            return <h1 className={className}>{children}</h1>
        case 'h2':
            return <h2 className={className}>{children}</h2>
        case 'h3':
            return <h3 className={className}>{children}</h3>
        case 'h4':
            return <h4 className={className}>{children}</h4>
        case 'h5':
            return <h5 className={className}>{children}</h5>
        case 'h6':
            return <h6 className={className}>{children}</h6>
        case 'p':
            return <p className={className}>{children}</p>
        case 'span':
            return <span className={className}>{children}</span>
        default:
            return <p className={className}>{children}</p>
    }
}
