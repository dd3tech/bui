/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useState, useCallback, useEffect } from 'react'

export type SizeTypes = {
  width: undefined | number
  height: undefined | number
}

export type useResizeReturnedTypes = {
  size: SizeTypes
  isMobile: boolean
  isMdScreen: boolean
}

/**
 * hook that returns an object containing the current window size and a
 * boolean indicating if the window is in mobile view.
 * @returns The function `useResize` returns an object with two properties: `size` and `isMobile`. The
 * `size` property is an object with `width` and `height` properties, which are numbers representing
 * the current width and height of the window. The `isMobile` property is a boolean value indicating
 * whether the current window width is less than 768 pixels, which is commonly used as
 */
export default function useResize(): useResizeReturnedTypes {
  const [size, setSize] = useState<SizeTypes>({
    width: undefined,
    height: undefined
  })

  const handleChangeResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  useEffect(() => {
    if (!size.width || !size.height) {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window?.addEventListener('resize', handleChangeResize)
    return () => window.removeEventListener('resize', handleChangeResize)
  }, [])

  return {
    size,
    isMobile: window.innerWidth < 768,
    isMdScreen: window.innerWidth <= 1024
  }
}
