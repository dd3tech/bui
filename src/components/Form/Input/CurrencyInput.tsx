import { useState, useCallback } from 'react'
import { getValueWithDecimalFormat } from 'dd360-utils'
import BaseInput, { InputProps } from './BaseInput'

function CurrencyInput(props: InputProps) {
    const { onChange, value } = props
    const [localValue, setLocalValue] = useState(getValueWithDecimalFormat(String(value)))

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.target.value = getValueWithDecimalFormat(event.target.value)
            setLocalValue(event.target.value)
            onChange && onChange(event)
        },
        [onChange, localValue]
    )

    return <BaseInput {...props} onChange={handleChange} value={localValue} />
}

export default CurrencyInput
