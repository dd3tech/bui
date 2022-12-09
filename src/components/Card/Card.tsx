import { useCallback } from 'react'

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    rounded?: 'sm' | 'md' | 'full' | 'lg' | 'xl' | '2x' | '3x' | '2xl' | '3xl' | '4xl' | '5xl' | 'none'
    padding?: number
    paddingY?: number
    paddingX?: number
    className?: string
    height?: 'fit-content' | 'auto' | number
    width?: number | string
}

const Card = ({ children, rounded, height, width, padding, paddingX, paddingY, className, style, ...otherProps }: ICardProps) => {
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

        return `p-${padding}`
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
Card.defaultProps = {
    rounded: 'none',
    padding: 4,
    height: 'fit-content',
    className: ''
}

export default Card
