/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useCallback, useState, useEffect } from 'react'
import BaseInput, { InputProps } from './BaseInput'

function PercentageInput({
  decimalsLimit = 2,
  onChange,
  value,
  ...props
}: InputProps) {
  const [localValue, setLocalValue] = useState(value || 0)

  function getRegexDecimal(numDecimals: number) {
    numDecimals = Math.max(0, numDecimals)

    const regexPattern = new RegExp(
      `^(100(?![.])?|\\d{1,2}(\\.\\d{1,${numDecimals}})?|\\d{1,2}(\\.\\d{0,${numDecimals}})?|)$`
    )

    return regexPattern
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const validatePercentage = getRegexDecimal(decimalsLimit).test(
        event.target.value
      )
      if (validatePercentage) {
        setLocalValue(event.target.value)
        onChange && onChange(event)
      }
    },
    [onChange, localValue, decimalsLimit]
  )
  useEffect(() => {
    if (!isNaN(Number(value))) setLocalValue(String(value))
  }, [value])

  return <BaseInput {...props} onChange={handleChange} value={localValue} />
}

export default PercentageInput
