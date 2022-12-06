import { useCallback } from 'react'

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    rounded?: 'sm' | 'md' | 'full' | 'lg' | 'xl' | '2x' | '3x' | '2xl' | '3xl' | '4xl' | '5xl'
    padding?: number
    paddingY?: number
    paddingX?: number
    className?: string
    height?: 'fit-content' | 'auto' | number
    width?: number | string
}

const Card = ({ children, rounded = 'lg', height = 'fit-content', width, padding = 4, paddingX, paddingY, className, style, ...otherProps }: ICardProps) => {
    const getPadding = useCallback(() => {
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
    }, [padding, paddingY, paddingX])

    return (
        <div
            data-testid="card-contain"
            style={{ ...style, height, width }}
            className={`rounded-${rounded} ${getPadding()} shadow-sm border ${className}`}
            {...otherProps}
        >
            {children}
        </div>
    )
}

Card.displayName = 'Card'

export default Card
