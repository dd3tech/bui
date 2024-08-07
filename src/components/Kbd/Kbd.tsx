/*
 * Copyright (c) DD360 and its affiliates.
 */
import React, { forwardRef, LegacyRef, useRef, useCallback } from 'react'

export interface KBDProps {
  kbds: Array<string>
  separator?: string
}

const Kbd = forwardRef<HTMLElement, KBDProps>(
  ({ kbds = ['Ctrl', 'Shift', 'R'], separator = '+' }: KBDProps, ref) => {
    const keyCounter = useRef(0)

    const isLastKbd = useCallback(
      (indexOfKey: number) => {
        return kbds.length - 1 === indexOfKey
      },
      [kbds]
    )

    const createKey = () => {
      keyCounter.current += 1
      return keyCounter.current
    }

    return (
      <p
        className="text-info dark:text-gray-400"
        ref={ref as LegacyRef<HTMLParagraphElement>}
      >
        {kbds.map((text) => {
          const mockedId = createKey()
          return (
            <React.Fragment key={mockedId}>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-info">
                {text}
              </kbd>{' '}
              <span>{!isLastKbd(kbds.indexOf(text)) && separator} </span>
            </React.Fragment>
          )
        })}
      </p>
    )
  }
)

Kbd.displayName = 'Kbd'

export default Kbd
