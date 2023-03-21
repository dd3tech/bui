import CurrencyInput from './CurrencyInput'
import PasswordInput from './PasswordInput'
import BaseInput from './BaseInput'
import DateInput from './DateInput'
import YearInput from './YearInput'
import MonthInput from './MonthInput'
import PercentageInput from './PercentageInput'
import type { InputProps } from './BaseInput'
import NumberInput from './InputNumber'

export interface GenericInputProps extends InputProps {
  controllers?: boolean
}

export default function Input({
  type = 'text',
  ...otherProps
}: GenericInputProps) {
  switch (type) {
    case 'text':
      return <BaseInput {...otherProps} />
    case 'currency':
      return <CurrencyInput {...otherProps} />
    case 'password':
      return <PasswordInput {...otherProps} />
    case 'date':
      return <DateInput placeholder="dd/mm/year" {...otherProps} />
    case 'year':
      return <YearInput placeholder="yyyy" {...otherProps} />
    case 'month':
      return <MonthInput {...otherProps} />
    case 'percentage':
      return (
        <PercentageInput placeholder="00.00" endAdornment="%" {...otherProps} />
      )
    case 'number':
      return <NumberInput placeholder="0" {...otherProps} />
    default:
      return <BaseInput {...otherProps} />
  }
}
