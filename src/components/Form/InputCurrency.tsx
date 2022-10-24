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
    onBlurInput?: () => void
    disabled?: boolean
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    role?: string
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>
}

const InputCurrency: FC<InputCurrencyProps> = (props) => {
    return (
        <CurrencyInput
            className={`${
                props.disabled ? 'bg-gray-100 text-gray-500' : ''
            } flex items-center justify-between bg-transparent transition duration-500 ease-out focus:ease-in font-medium rounded-sm p-3 mt-1 ${
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
            onBlur={() => props.onBlurInput && props.onBlurInput()}
            disabled={props.disabled}
            onFocus={(e) => props.onFocus && props.onFocus(e)}
            role={props?.role ?? ''}
            onPaste={props.onPaste}
        />
    )
}

export default InputCurrency
