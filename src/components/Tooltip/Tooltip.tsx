/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ReactNode, cloneElement, ReactElement, FC } from 'react'
import { composeClasses } from 'lib/classes'
import { fontSize } from 'lib/font'
import useTooltip from 'hooks/useTooltip'
import { PositionVariants } from '../../interfaces/types'

export type TooltipVariant = 'primary' | 'secondary'

export interface TooltipProps {
  /**
   * The child element that will trigger the tooltip when hovered.
   */
  children: ReactElement<any>
  /**
   * The content to display in the tooltip.
   */
  content: ReactNode
  /**
   * The final adornment to display in the tooltip, after the content. (Most used to icons icons)
   */
  endAdornment?: ReactNode
  /**
   * The position at which to display the tooltip in relation to the child elements.
   * right | left | top | bottom. The default is top
   */
  position?: PositionVariants
  /**
   * The initial adornment to display in the tooltip, before the content. (Most used to insert icons)
   */
  startAdornment?: ReactNode
  /**
   * The style variant of the tooltip.
   * primary by default
   */
  variant?: TooltipVariant
}

const colorVariants: { [key: string]: string } = {
  primary: `text-center ${fontSize.xs} bg-gray-900 opacity-70 p-2 text-white rounded-md z-50`
}

const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  endAdornment,
  position,
  startAdornment,
  variant = 'primary'
}) => {
  const { isVisible, handleMouseEnter, handleMouseLeave, refs } = useTooltip({
    placement: position
  })

  const { refElement, popperElement } = refs

  const childrenElementWithAddons = cloneElement(children, {
    ref: refElement,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  })

  return (
    <>
      {childrenElementWithAddons}
      {isVisible && (
        <div
          role="tooltip-content"
          ref={popperElement}
          className={composeClasses(
            colorVariants[variant],
            (startAdornment || endAdornment) &&
              'flex items-center justify-center gap-1'
          )}
        >
          {startAdornment && startAdornment}
          {content}
          {endAdornment && endAdornment}
        </div>
      )}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
export default Tooltip
