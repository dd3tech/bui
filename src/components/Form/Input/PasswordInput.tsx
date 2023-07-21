/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useState, useCallback } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import BaseInput, { InputProps } from './BaseInput'

function PasswordInput(props: InputProps) {
  const [showText, setShowText] = useState(false)
  const onHandleShow = useCallback(
    () => setShowText((prevShow) => !prevShow),
    []
  )

  return (
    <BaseInput
      {...props}
      type={showText ? 'text' : 'password'}
      endAdornment={
        <button
          className="flex items-center justify-center"
          type="button"
          role="showText"
          onClick={onHandleShow}
        >
          {showText ? (
            <EyeIcon aria-label="eyeOn" width={23} />
          ) : (
            <EyeOffIcon aria-label="eyeOff" width={23} />
          )}
        </button>
      }
    />
  )
}

export default PasswordInput
