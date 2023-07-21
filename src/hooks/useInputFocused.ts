/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useState, useCallback } from 'react'

const useInputFocused = () => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocusOn = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleFocusOff = useCallback(() => {
    setIsFocused(false)
  }, [])

  return { isFocused, handleFocusOn, handleFocusOff }
}

export default useInputFocused
