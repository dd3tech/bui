import { useState, useRef, useEffect, useCallback } from 'react'
import { createPopper, Instance, preventOverflow, flip } from '@popperjs/core'
import { PositionVariants } from '../interfaces/types'

export interface TooltipParams {
  placement?: PositionVariants
  showDelay?: number
  hideDelay?: number
  modifiers?: object[]
}

const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])
  return isMounted
}

/**
 * This is a hook function that creates a tooltip with customizable position, show and hide
 * delays, and uses the Popper.js library for positioning.
 * @param {TooltipProps} props - `position`: The position of the tooltip relative to the element
 * triggering it. It can be one of the following values: 'top', 'bottom', 'left', 'right'.
 * - `showDelay`: The delay in milliseconds before showing the tooltip after the user hovers
 * over the element triggering it.
 * - `hideDelay`: The delay in milliseconds before hiding the tooltip after the user stops
 * hovering over the element triggering it.
 * @returns An object with the following properties:
 * - `isVisible`: A boolean indicating whether the tooltip is currently visible
 * - `handleMouseEnter`: A function to handle the mouse enter event on the tooltip trigger element
 * - `handleMouseLeave`: A function to handle the mouse leave event on the tooltip trigger element
 * - `handleClick`: A function to handle the click event on the tooltip trigger element
 * - `refs`: An object containing three references
 */
export default function useTooltip(params?: TooltipParams) {
  const {
    placement = 'top',
    showDelay = 100,
    hideDelay = 100,
    modifiers = []
  } = params || {}

  const isMounted = useIsMounted()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const refElement = useRef<HTMLDivElement>(null)
  const popperElement = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<Instance | null>(null)

  const entryTimer = useRef<null | NodeJS.Timeout>(null)
  const leaveTimer = useRef<null | NodeJS.Timeout>(null)

  const handleMouseEnter = useCallback(() => {
    if (entryTimer?.current) clearTimeout(entryTimer.current)
    entryTimer.current = setTimeout(() => {
      if (isMounted.current) setIsVisible(true)
    }, showDelay)
  }, [isMounted, showDelay])

  const handleMouseLeave = useCallback(() => {
    if (leaveTimer?.current) clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      if (isMounted.current) setIsVisible(false)
    }, hideDelay)
  }, [isMounted, hideDelay])

  const handleOnClick = useCallback(() => {
    if (isMounted.current) setIsVisible((prev) => !prev)
  }, [isMounted])

  useEffect(() => {
    if (!isVisible || !refElement.current || !popperElement.current) {
      popperInstance.current?.destroy()
      return
    }

    popperInstance.current = createPopper(
      refElement.current,
      popperElement.current,
      {
        placement: placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          preventOverflow,
          flip,
          ...modifiers
        ]
      }
    )
  }, [isVisible, placement])

  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
    handleOnClick,
    refs: { refElement, popperElement, popperInstance }
  }
}
