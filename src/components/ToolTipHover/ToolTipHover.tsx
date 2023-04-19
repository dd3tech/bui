// TODO: Create storie and test for this component

import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { getLeftAndTopScreen } from 'dd360-utils'
import { composeClasses } from 'lib/classes'
import { Portal } from '../../common/Portal'

interface IToolTipHover {
  children: ReactNode
  className?: string
  variantPopup: 'blue' | 'warning' | 'gray' | 'dark'
  element: any
  align?: string
  complementPosition?: { top: number; left: number }
  disabled?: boolean
  styleElement?: any
  classNameElement?: string
  classNameContainer?: string
}

const displayVariant: { [key: string]: string } = {
  blue: 'bg-white border-primary p-2 text-slate-50',
  warning: 'ml-1 -mt-10 bg-white border-warning p-2 text-info',
  gray: 'text-center -ml-2 -mt-14 bg-info py-2 px-4 text-white',
  dark: 'text-center -ml-11 -mt-10 bg-gray-900 opacity-80 py-2 px-4 text-white'
}

const ToolTipHover = ({
  children,
  variantPopup = 'blue',
  element,
  className,
  align,
  complementPosition = { top: 0, left: 0 },
  disabled,
  styleElement,
  classNameElement,
  classNameContainer
}: IToolTipHover) => {
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

  useEffect(() => {
    if (disabled) return
    setPosition({ ...position, show: false })
  }, [disabled])

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseOver}
      className={classNameContainer || 'inline-block'}
      role="container-tooltip"
    >
      {/* Element Hover */}
      <div
        role="element-tooltip"
        className={composeClasses(
          'flex item-center justify-center',
          classNameElement
        )}
        style={styleElement}
      >
        {element}
      </div>
      {/* Popup */}
      {position.show && !disabled && (
        <Portal>
          <div
            role="children-tooltip"
            className={composeClasses(
              'whitespace-pre-line antialiased z-50 w-auto text-xs font-thin leading-4 border rounded-md absolute',
              variantPopup === 'blue' && !align ? 'ml-1 -mt-10' : align,
              displayVariant[variantPopup],
              className
            )}
            style={{
              left: position.left + complementPosition.left,
              top: position.top + complementPosition.top
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </div>
  )
}

ToolTipHover.displayName = 'ToolTipHover'

export default ToolTipHover
