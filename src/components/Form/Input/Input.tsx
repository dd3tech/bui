/*
 * Copyright (c) DD360 and its affiliates.
 */

import BaseInput, { InputProps } from './BaseInput'
import CurrencyInput, { InputCurrencyProps } from './CurrencyInput'
import PasswordInput from './PasswordInput'
import DateInput from './DateInput'
import YearInput from './YearInput'
import MonthInput from './MonthInput'
import PercentageInput from './PercentageInput'
import NumberInput from './InputNumber'

export interface GenericInputProps extends InputProps, InputCurrencyProps {
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
      return <MonthInput {...otherProps} pickerType="month" />
    case 'month-year':
      return <MonthInput {...otherProps} pickerType="month-year" />
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
