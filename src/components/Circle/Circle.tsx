import { ReactNode } from 'react'

interface CircleProps {
    children?: ReactNode
    backgroundColor?: string
    onClick?: () => void
    className?: string
    onBlur?: () => void
    width?: string
    height?: string
    border?: string
    useBackground?: boolean
    disabled?: boolean
}

export const Circle = ({
    children,
    backgroundColor = '#EFF6FF',
    className = '',
    width = '3rem',
    height = '3rem',
    border,
    useBackground = true,
    disabled,
    ...props
}: CircleProps) => {
    const classNameCircle = `${className} items-center flex justify-center rounded-full`

    const disabledClassName = 'text-gray-300 border border-gray-300 flex justify-center rounded-full bg-white'

    return (
        <div
            className={disabled ? disabledClassName : classNameCircle}
            style={{ backgroundColor: !useBackground ? '' : backgroundColor, width, height, border }}
            {...props}
        >
            {children}
        </div>
    )
}
