import { ReactNode, MouseEventHandler, memo, ReactElement } from 'react'

interface IButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link' | 'ghost' | 'cancel' | 'success' | 'outlineWhite' | 'outlineBlue'
    size?: 'small' | 'medium' | 'large'
    padding?: number
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: ReactNode
    isLoading?: boolean
    className?: string
    paddingX?: number
    paddingY?: number
    role?: string
    loadingComponent?: ReactElement
}

export const Button = memo(
    ({
        variant = 'primary',
        size = 'medium',
        onClick,
        children,
        isLoading,
        className = '',
        padding,
        paddingX,
        paddingY,
        loadingComponent,
        ...props
    }: IButtonProps) => {
        const buttonsVariants: { [key: string]: string } = {
            primary: 'bg-blue-700 hover:bg-blue-800 text-white disabled:bg-gray-300',
            secondary: 'bg-transparent border border-black hover:bg-white disabled:opacity-20',
            cancel: 'bg-white text-black hover:text-white hover:bg-red-500 disabled:opacity-75',
            outlineBlue: 'bg-transparent border border-blue-700 text-blue-700',
            success: 'bg-green-500 hover:bg-green-600 text-white',
            outlineWhite: 'bg-transparent border border-white  text-white  hover:bg-gray-50 hover:text-black'
        }

        const sizeVariants: { [key: string]: string } = {
            large: 'rounded-lg w-auto'
        }

        const buttonPading = () => {
            if (paddingX && paddingY) {
                return `px-${paddingX} py-${paddingY}`
            }

            if (paddingX) {
                return `px-${paddingX}`
            }

            if (paddingY) {
                return `py-${paddingY}`
            }

            if (padding) {
                return `p-${padding}`
            }

            return 'p-2'
        }

        return (
            <button
                className={`rounded-md ${buttonPading()} font-bold transition duration-500 ease-out hover:ease-in ${buttonsVariants[variant]} ${
                    sizeVariants[size]
                } ${className}`}
                onClick={onClick}
                {...props}
            >
                {isLoading ? <div className="flex items-center gap-2 justify-center">{loadingComponent}</div> : children}
            </button>
        )
    }
)
