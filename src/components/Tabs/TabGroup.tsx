import React, { MouseEvent, useRef, useState, useEffect, ReactNode } from 'react'

interface IDashRect {
    width?: number
    height?: number
    left?: number
    right?: number
    top?: number
}

type Props = {
    disabledText?: string
    orientation?: 'vertical' | 'horizontal'
    children: React.ReactNode
    value?: number
    onChange?: (newValue: number) => void
    wideLine?: number
    width?: number
    childClassName?: string
    indicatorColor?: string
    textColor?: string
    variant?: 'secondary' | 'primary'
    className?: string
}

const getClientSize = (items: HTMLCollection, position: number) => {
    let totalWidth = 0,
        totalHeight = 0
    for (let i = 0; i < position; i++) {
        const { height, width } = items[i].getBoundingClientRect()
        totalHeight += height
        totalWidth += width
    }
    const { width, height } = items[position].getBoundingClientRect()
    return {
        top: totalHeight,
        left: totalWidth,
        width,
        height
    }
}

function TabGroup({
    orientation = 'horizontal',
    children,
    value = 0,
    onChange,
    wideLine = 3.2,
    width,
    disabledText,
    childClassName,
    indicatorColor,
    variant = 'primary',
    textColor,
    className = ''
}: Props) {
    const refContainer = useRef<HTMLDivElement | null>(null)
    const [dashRect, setDashRect] = useState<IDashRect>({})

    const orientationStyle = {
        vertical: 'flex-col',
        horizontal: 'min-w-max'
    }

    const variantStyle = {
        primary: 'border-gray-200',
        secondary: 'gap-4'
    }

    const getBorder = () => {
        if (orientation === 'horizontal' && variant === 'primary') return 'border-b'
        if (orientation === 'vertical' && variant === 'primary') return 'border-r'
        return ''
    }

    const handleChangeIndicator = (newValue: number) => {
        if (refContainer.current) {
            const { height, left, top, width } = getClientSize(refContainer.current.children, newValue)
            let newDashRect: IDashRect = {}
            if (orientation == 'horizontal') {
                newDashRect = { left, height: wideLine, width }
            } else {
                newDashRect = Object.assign({ height, width: wideLine, top }, variant == 'secondary' ? { left: 0 } : { right: 0 })
            }
            setDashRect(newDashRect)
        }
    }

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        const nodes = Array.prototype.slice.call(refContainer.current?.children)
        const newValue = nodes.indexOf(event.target) ?? 0
        handleChangeIndicator(newValue)
        onChange && onChange(newValue)
    }

    const childrenWithProps = (): ReactNode => {
        return React.Children.map(children, (child, index): ReactNode => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement, { index, value, onClick, disabledText, childClassName, textColor, variant })
            }
            return child
        })
    }

    useEffect(() => {
        handleChangeIndicator(value)
    }, [orientation, variant])

    return (
        <div style={{ width }} className="relative overflow-auto">
            <div ref={refContainer} className={`flex ${className} ${getBorder()} ${variantStyle[variant]} ${orientationStyle[orientation]}`}>
                {childrenWithProps()}
            </div>
            {variant === 'primary' && (
                <span
                    style={{
                        ...dashRect,
                        backgroundColor: !indicatorColor?.includes('bg-') ? indicatorColor : undefined
                    }}
                    className={`${indicatorColor?.includes('bg-') ? indicatorColor : ''} bg-blue-500 transition-all duration-300 ease-in absolute bottom-0`}
                />
            )}
        </div>
    )
}

export default TabGroup
