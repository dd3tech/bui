import { useCallback, useState } from 'react'
import BaseInput, { InputProps } from './BaseInput'
import { getValueWithDecimalFormat } from 'dd360-utils'

function PercentageInput(props: InputProps) {
    const { onChange, value } = props
    const [localValue, setLocalValue] = useState(getValueWithDecimalFormat(String(value)))

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const validatePercentage = /^(100(?!\.)|\d{1,2})(\.\d{1,2})?$|^(100(?!\.)|\d{1,2})(\.\d{0,2})?$/.test(event.target.value)
            if (event.target.value === '') setLocalValue('')
            if (validatePercentage) event.target.value === '' ? setLocalValue('') : setLocalValue(event.target.value)
            onChange && onChange(event)
        },
        [onChange, localValue]
    )

    return <BaseInput type="percentage" {...props} onChange={handleChange} value={localValue} />
}

export default PercentageInput
