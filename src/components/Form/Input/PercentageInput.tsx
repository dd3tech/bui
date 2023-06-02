import { useCallback, useState, useEffect } from 'react'
import BaseInput, { InputProps } from './BaseInput'

function PercentageInput(props: InputProps) {
  const { onChange, value } = props
  const [localValue, setLocalValue] = useState(value || 0)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const validatePercentage =
        /^(100(?!\.)?|\d{1,2}(\.\d{1,2})?|\d{1,2}(\.\d{0,2})?|)$/.test(
          event.target.value
        )
      if (validatePercentage) {
        setLocalValue(event.target.value)
        onChange && onChange(event)
      }
    },
    [onChange, localValue]
  )
  useEffect(() => {
    if (typeof value === 'string' || typeof value === 'number')
      setLocalValue(value)
  }, [value])

  return <BaseInput {...props} onChange={handleChange} value={localValue} />
}

export default PercentageInput
