export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    rounded?: 'sm' | 'md' | 'full' | 'lg' | 'xl' | '2x' | '3x' | '2xl' | '3xl' | '4xl' | '5xl'
    padding?: number
    paddingY?: number
    paddingX?: number
    className?: string
    height?: 'fit-content' | 'auto' | number
    width?: number
}

function Card({ children, rounded = 'md', height = 'fit-content', width, padding = 4, paddingX, paddingY, className, style, ...otherProps }: ICardProps) {
    const getPadding = () => {
        if (paddingX && paddingY) {
            return `px-${paddingX} py-${paddingY}`
        }

        if (paddingX) {
            return `px-${paddingX}`
        }

        if (paddingY) {
            return `py-${paddingY}`
        }

        if (padding !== undefined) {
            return `p-${padding}`
        }

        return 'p-2'
    }
    return (
        <div
            data-testid="card-contain"
            {...otherProps}
            style={{ ...style, height, width }}
            className={`rounded-${rounded} ${getPadding()} shadow-sm border ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
