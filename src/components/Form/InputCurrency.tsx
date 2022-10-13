import { FC } from 'react'
import CurrencyInput from 'react-currency-input-field'

export interface InputCurrencyProps {
    className?: string
    name?: string
    placeholder?: string
    defaultValue?: number
    decimalsLimit?: number
    onChange?: (value: string | undefined, name: string) => void
    prefix?: string
    decimalScale?: number
    suffix?: string
    value?: string | number
}

const InputCurrency: FC<InputCurrencyProps> = (props) => {
    return (
        <CurrencyInput
            className={`flex items-center justify-between border-none bg-transparent transition duration-500 ease-out focus:ease-in font-medium rounded-sm p-3 mt-1 ${
                props.className ?? 'w-60'
            }`}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            decimalsLimit={props.decimalsLimit}
            onValueChange={props.onChange}
            prefix={props.prefix}
            decimalScale={props.decimalScale}
            suffix={props.suffix}
            value={props.value}
        />
    )
}

export default InputCurrency
