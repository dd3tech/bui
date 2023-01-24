import CurrencyInput from './CurrencyInput'
import PasswordInput from './PasswordInput'
import BaseInput from './BaseInput'
import DateInput from './DateInput'
import YearInput from './YearInput'
import MonthInput from './MonthInput'
import type { InputProps } from './BaseInput'

export default function Input(props: InputProps) {
    const { type = 'text' } = props
    switch (type) {
        case 'text':
            return <BaseInput {...props} />
        case 'currency':
            return <CurrencyInput {...props} />
        case 'password':
            return <PasswordInput {...props} />
        case 'date':
            return <DateInput placeholder="dd/mm/year" {...props} />
        case 'year':
            return <YearInput placeholder="yyyy" {...props} />
        case 'month':
            return <MonthInput {...props} />
        default:
            return <BaseInput {...props} />
    }
}
