import { useState, useCallback, useEffect } from 'react'
import { getValueWithDecimalFormat, unFormatCurrency } from 'dd360-utils'
import BaseInput, { InputProps } from './BaseInput'

function CurrencyInput(props: InputProps) {
  const { onChange, value, prefix = '' } = props
  const [localValue, setLocalValue] = useState(
    getValueWithDecimalFormat(String(value))
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = getValueWithDecimalFormat(event.target.value)
      setLocalValue(event.target.value)
      event.target.value = unFormatCurrency(event.target.value).toString()
      onChange && onChange(event)
    },
    [onChange, localValue]
  )

  useEffect(() => {
    if (typeof value === 'string' || typeof value === 'number')
      setLocalValue(getValueWithDecimalFormat(String(value)))
  }, [value])

  return (
    <BaseInput {...props} onChange={handleChange} value={prefix + localValue} />
  )
}

export default CurrencyInput
