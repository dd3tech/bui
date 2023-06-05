import { useCallback, useState, useEffect } from 'react'
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon
} from '@heroicons/react/outline'
import BaseInput, { InputProps } from './BaseInput'

export interface InputNumberProps extends InputProps {
  controllers?: boolean
}

function NumberInput({
  onChange,
  value,
  controllers,
  endAdornment,
  ...props
}: InputNumberProps) {
  const [localValue, setLocalValue] = useState(value || 0)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const validateNumber = /^[0-9]*$/.test(event.target.value)
      if (validateNumber) {
        setLocalValue(event.target.value)
        onChange && onChange(event)
      }
    },
    [onChange]
  )

  const increment = useCallback(() => {
    setLocalValue((prevValue) => Number(prevValue) + 1)
  }, [])

  const decrement = useCallback(() => {
    setLocalValue((prevValue) =>
      Number(prevValue) > 0 ? Number(prevValue) - 1 : prevValue
    )
  }, [])

  useEffect(() => {
    if (!isNaN(Number(value))) setLocalValue(String(value))
  }, [value])

  return (
    <BaseInput
      {...props}
      onChange={handleChange}
      value={localValue}
      endAdornment={
        controllers ? (
          <div className="grid -mt-2.5 gap-y-0.5  text-info">
            <button role="increment-number" onClick={increment} type="button">
              <ArrowCircleUpIcon aria-label="arrowUp" width={20} />
            </button>
            <button role="decrement-number" onClick={decrement} type="button">
              {<ArrowCircleDownIcon aria-label="arrowDown" width={20} />}
            </button>
          </div>
        ) : (
          endAdornment
        )
      }
    />
  )
}

export default NumberInput
