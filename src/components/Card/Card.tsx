import { forwardRef } from 'react'
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

const Card = forwardRef<HTMLDivElement, ICardProps>((cardProps: ICardProps, ref) => {
    const { children, rounded = 'md', height = 'fit-content', width, padding = 4, paddingX, paddingY, className, style, ...otherProps } = cardProps

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
            style={{ ...style, height, width }}
            className={`rounded-${rounded} ${getPadding()} shadow-sm border ${className}`}
            ref={ref}
            {...otherProps}
        >
            {children}
        </div>
    )
})

Card.displayName = 'Card'
Card.defaultProps = {
    children: undefined,
    rounded: 'sm',
    padding: undefined,
    paddingY: undefined,
    paddingX: undefined,
    className: undefined,
    height: 'auto',
    width: 100
}

export default Card
