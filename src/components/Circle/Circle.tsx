import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'

interface CircleProps extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode
    backgroundColor?: string
    className?: string
    width?: string
    height?: string
    border?: string
    useBackground?: boolean
    disabled?: boolean
}

const Circle = forwardRef<HTMLDivElement, CircleProps>((circleProps: CircleProps, ref) => {
    const {
        children,
        backgroundColor = '#EFF6FF',
        className = '',
        width = '3rem',
        height = '3rem',
        border,
        useBackground = true,
        disabled,
        ...props
    } = circleProps

    const chooseClassNameCircle = React.useCallback(() => {
        if (disabled) return `disabled:text-gray-300 disabled:border disabled:border-gray-300 disabled:bg-white`
        return className
    }, [className, disabled])

    return (
        <div
            ref={ref}
            className={composeClasses('items-center flex justify-center rounded-full', chooseClassNameCircle())}
            style={{ backgroundColor: !useBackground ? '' : backgroundColor, width, height, border }}
            {...props}
        >
            {children}
        </div>
    )
})

Circle.displayName = 'Circle'
export default Circle
