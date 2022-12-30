import { ButtonHTMLAttributes, forwardRef } from 'react'
import Text, { TextSizeType } from '../Typography'

interface ICellProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large' | 'extraLarge'
    icon?: JSX.Element
    disabled?: boolean
    selected?: boolean
    border?: boolean
    className?: string
}

const sizeVariants: { [key: string]: string } = {
    small: 'xs',
    medium: 'sm',
    large: 'base',
    extraLarge: 'lg'
}

const iconSizeVariants: { [key: string]: number } = {
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18
}

export const getClassName = (selected: boolean, disabled: boolean, border: boolean) => {
    if (selected && !disabled) return `bg-blue-500 text-white ${border ? 'border border-blue-500' : ''}`
    return `bg-white text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed ${
        border ? 'border border-blue-500 disabled:border-gray-300' : ''
    }`
}

const Cell = forwardRef<HTMLButtonElement, ICellProps>(
    ({ size = 'medium', icon, children, onClick, border = false, selected = false, disabled = false, className }: ICellProps, ref) => {
        const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!disabled && onClick) {
                onClick(e)
            }
        }

        return (
            <button
                ref={ref}
                className={`${className ? className : ''} flex items-center rounded px-2 py-1 ${getClassName(selected, disabled, border)}`}
                onClick={onClickHandler}
                disabled={disabled}
            >
                {icon && (
                    <div
                        id="cell-icon"
                        className={`font-light mr-1 ${!disabled && !selected ? 'text-gray-400' : ''}`}
                        style={{ width: icon.props.width ? icon.props.width : iconSizeVariants[size] }}
                    >
                        {icon}
                    </div>
                )}
                <Text size={sizeVariants[size] as TextSizeType} fontBold="medium">
                    {children}
                </Text>
            </button>
        )
    }
)

export default Cell
