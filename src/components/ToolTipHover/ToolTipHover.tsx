// TODO: Create storie and test for this component

import React, { ReactNode, useState, useCallback } from 'react'
import { getLeftAndTopScreen } from 'dd360-utils'
import { Portal } from '../../common/Portal'

interface IToolTipHover {
    children: ReactNode
    className?: string
    variantPopup: 'blue' | 'warning' | 'gray' | 'dark'
    element: any
    align?: string
    complementPosition?: { top: number; left: number }
    disabled?: boolean
}

const ToolTipHover = ({ children, variantPopup = 'blue', element, className, align, complementPosition = { top: 0, left: 0 }, disabled }: IToolTipHover) => {
    const [position, setPosition] = useState({ show: false, left: 0, top: 0 })

    const handleMouseOver = useCallback((e: React.MouseEvent) => {
        if (!position.show) {
            const { left, top } = getLeftAndTopScreen(e)
            setPosition({ ...position, show: true, left: left, top: top })
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        setPosition({ ...position, show: false, left: 0, top: 0 })
    }, [])

    const displayVariant: { [key: string]: string } = {
        blue: `${align ?? 'ml-1 -mt-10'} bg-white border-blue-700 p-2 text-slate-50`,
        warning: 'ml-1 -mt-10 bg-white border-yellow-500 p-2 text-gray-500',
        gray: 'text-center -ml-2 -mt-14 bg-gray-500 py-2 px-4 text-white',
        dark: 'text-center -ml-11 -mt-10 bg-gray-900 opacity-80 py-2 px-4 text-white'
    }

    return (
        <>
            {/* Element Hover */}
            <div role="element-tooltip" className="flex item-center justify-center" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
                {element}
            </div>
            {/* Popup */}
            {position.show && !disabled && (
                <Portal>
                    <div
                        role="children-tooltip"
                        className={`${displayVariant[variantPopup]} ${className} whitespace-pre-line antialiased z-50 w-auto text-xs font-thin leading-4 border rounded-md absolute`}
                        style={{ left: position.left + complementPosition.left, top: position.top + complementPosition.top }}
                    >
                        {children}
                    </div>
                </Portal>
            )}
        </>
    )
}

ToolTipHover.displayName = 'ToolTipHover'

export default ToolTipHover
