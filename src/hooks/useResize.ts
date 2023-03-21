import React from 'react'

export type SizeTypes = {
  width: undefined | number
  height: undefined | number
}

export type useResizeReturnedTypes = {
  size: SizeTypes
  isMobile: boolean
}

/**
 * It returns an object with the current window size and a boolean value that indicates if the window
 * is mobile or not
 * @returns An object with two properties: size and isMobile.
 */
function useResize(): useResizeReturnedTypes {
  const [size, setSize] = React.useState<SizeTypes>({
    width: undefined,
    height: undefined
  })

  const handleChangeResize = React.useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  React.useLayoutEffect(() => {
    if (!size.width || !size.height) {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window?.addEventListener('resize', handleChangeResize)
    return () => window.removeEventListener('resize', handleChangeResize)
  }, [])

  return { size, isMobile: window.innerWidth < 768 }
}

export default useResize
