import { useEffect } from 'react'
import { getValueWithDecimalFormat, inputCurrency } from 'dd360-utils'
import { getInputClassName, variantIs } from './shared'

type HTMLOmitEvents = Omit<HTMLInputElement, 'onChange'>

export interface InputCurrencyProps extends React.HTMLProps<HTMLOmitEvents> {
    success?: boolean
    error?: boolean
    variant?: string
    value?: string
    onChangeCurrency?: (n: string) => void
    useSymbol?: boolean
    helperText?: string
    classNameHelperText?: string
    rounded?: 'sm' | 'md' | 'full'
}

export function InputCurrency({
    success,
    error,
    onChangeCurrency,
    value,
    useSymbol,
    rounded,
    variant = 'active',
    helperText,
    className,
    ...otherProps
}: InputCurrencyProps) {
    const { format } = inputCurrency
    const formatProps = { removeCents: false, removeCommas: false, removeSymbol: !useSymbol }
    const { input: inputClassName, message: messageClassName } = getInputClassName({
        variant: variantIs({ error, success, variant }),
        rounded: rounded ?? 'md',
        border: true
    })

    function inputOnChange({ target }: { target: HTMLInputElement }) {
        if (onChangeCurrency) {
            let formattedValue = useSymbol ? `$${getValueWithDecimalFormat(target.value)}` : getValueWithDecimalFormat(target.value)
            onChangeCurrency(formattedValue)
        }
    }

    function onBlurCurrency(e: React.FocusEvent<HTMLInputElement, Element>) {
        if (onChangeCurrency) {
            const formattedValue = useSymbol ? format(e.target.value, formatProps) : format(e.target.value).replace(/[$]/g, '')
            onChangeCurrency(formattedValue)
        }
        if (otherProps.onBlur) {
            otherProps.onBlur(e)
        }
    }

    useEffect(() => {
        if (onChangeCurrency) {
            const formattedValue = useSymbol ? format(value, formatProps) : format(value).replace(/[$]/g, '')
            onChangeCurrency(formattedValue)
        }
    }, [useSymbol])

    return (
        <>
            <input
                style={{ outline: 'none' }}
                className={`${className ?? ''} ${inputClassName}`}
                onChange={inputOnChange}
                onBlur={onBlurCurrency}
                value={value}
                {...otherProps}
            />
            {helperText && <small className={`${messageClassName} ${otherProps.classNameHelperText ?? ''}`}>{helperText}</small>}
        </>
    )
}
