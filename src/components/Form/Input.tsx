import { ChangeEvent, MouseEventHandler, FocusEvent, useState } from 'react'
import { formatCurrency, getValueWithDecimalFormat } from 'dd360-utils'
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'

interface IInputProps {
    label?: string
    padding?: number
    variant?: string
    message?: string
    type?: string
    value?: any
    defaultValue?: any
    isCurrency?: boolean
    separators?: boolean
    endAdorment?: string
    startAdorment?: string
    inputBlank?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void
    onClick?: MouseEventHandler<HTMLInputElement>
    required?: boolean
    name?: string
    style?: any
    onKeyPress?: any
    className?: string
    disabled?: boolean
    placeholder?: string
    rounded?: string
    onBlur?: (event: { target: HTMLInputElement }) => void
    max?: number
    min?: number
    isDecimal?: boolean
    isInteger?: boolean
    role?: string
    onSubmit?: any
}

const inputVariants: { [key: string]: { input: { borderColor: string; color?: string }; text: { color: string } } } = {
    active: {
        input: {
            borderColor: 'border-black'
        },
        text: {
            color: 'text-black'
        }
    },
    focus: {
        input: {
            borderColor: 'border-blue-500'
        },
        text: {
            color: 'text-blue-500'
        }
    },
    success: {
        input: {
            borderColor: 'border-green-500'
        },
        text: {
            color: 'text-green-500'
        }
    },
    warning: {
        input: {
            borderColor: 'border-yellow-500'
        },
        text: {
            color: 'text-yellow-500'
        }
    },
    error: {
        input: {
            borderColor: 'border-red-500',
            color: ''
        },
        text: {
            color: 'text-red-500'
        }
    }
}

export const Input = ({
    variant = 'active',
    message,
    type = 'text',
    value,
    defaultValue,
    onChange,
    name,
    disabled,
    className,
    placeholder,
    onBlur,
    onClick,
    isCurrency,
    separators,
    endAdorment,
    startAdorment,
    inputBlank,
    onFocus,
    padding,
    rounded = 'lg',
    isDecimal,
    isInteger,
    label,
    ...props
}: IInputProps) => {
    const { input, text } = inputVariants[variant]
    const numberValue = () => {
        if (typeof value === 'string' && (isCurrency || separators)) {
            return Number(value?.split(',').join(''))
        }

        if (typeof value === 'number' && value > 1) {
            return value
        }

        return value
    }
    const [isEditingCurrency, setIsEditingCurrency] = useState<boolean>(true)
    const [typeInput, setTypeInput] = useState<string>(type)
    const [numberFormat, setNumberFormat] = useState<any>(numberValue())

    const getNumbers = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.split(',').join('').match('^[0-9]*$')) {
            onChange!(e)
            setNumberFormat(Number(e.target.value.split(',').join('')).toLocaleString('en-US'))
        }
    }

    const inputValue: any = () => {
        if (isEditingCurrency && parseFloat(value)) {
            return numberFormat
        } else {
            return value
        }
    }

    const onChanceCurrency: any = (e: ChangeEvent<HTMLInputElement>, typeCurrency: boolean) => {
        if (typeCurrency) {
            onChange!(e)
        } else if (isDecimal) {
            e.target.value = getValueWithDecimalFormat(e.target.value)
            onChange!(e)
        } else {
            getNumbers(e)
        }
    }

    const valueCurrency: any = (typeCurrency: boolean) => {
        if (typeCurrency) {
            return inputValue()
        } else {
            if (isDecimal) {
                return getValueWithDecimalFormat(String(value))
            }
            if (numberFormat) {
                return typeof numberFormat === 'number' ? (numberFormat === 0 ? '' : formatCurrency(numberFormat)) : numberFormat
            }
            return formatCurrency(value)
        }
    }

    const handleChange = isInteger ? getNumbers : onChange

    return (
        <>
            {label && <label className="block text-sm font-medium leading-4">{label}</label>}
            {isCurrency || separators ? (
                <div className="relative">
                    {!inputBlank && (
                        <>
                            <span
                                style={{ transform: separators ? 'translateY(-40%)' : 'translateY(-39%)' }}
                                className="absolute text-gray-400 left-4 top-1/2 translate-y-2/4 text"
                            >
                                {startAdorment}
                            </span>
                            <span
                                style={{ transform: separators ? 'translateY(-40%)' : 'translateY(-39%)' }}
                                className="absolute text-gray-400 right-4 top-1/2 translate-y-2/4"
                            >
                                {endAdorment}
                            </span>
                        </>
                    )}
                    <input
                        className={`${
                            inputBlank && 'border-none'
                        } focus:border-blue-500 bg-transparent transition duration-500 ease-out focus:ease-in border-solid border border-black font-medium w-full rounded-${rounded} p-${
                            padding ?? '3'
                        } mt-1 ${className ?? ''} ${startAdorment && 'pl-8'} ${endAdorment && 'pr-8'} ${input.borderColor} ${input.color}`}
                        type={typeInput}
                        name={name}
                        disabled={disabled}
                        onClick={onClick}
                        onChange={(e) => onChanceCurrency(e, isCurrency)}
                        placeholder={placeholder}
                        style={{ outline: 'none' }}
                        onFocus={(event) => {
                            setIsEditingCurrency(false)
                            onFocus && onFocus(event)
                        }}
                        onBlur={(event: any) => {
                            setIsEditingCurrency(true)
                            onBlur && onBlur(event)
                        }}
                        value={valueCurrency(isCurrency)}
                        {...props}
                    />
                </div>
            ) : (
                <>
                    <div className="relative">
                        <>
                            <span
                                style={{ transform: separators ? 'translateY(-40%)' : 'translateY(-39%)' }}
                                className="absolute text-gray-400 left-4 top-1/2  translate-y-2/4 text"
                            >
                                {startAdorment}
                            </span>
                            <span
                                style={{ transform: separators ? 'translateY(-40%)' : 'translateY(-39%)' }}
                                className="absolute text-gray-400 right-4 top-1/2 translate-y-2/4"
                            >
                                {endAdorment}
                            </span>
                        </>
                        <input
                            className={`${inputBlank && 'border-none'} ${
                                variant === 'active' && 'focus:border-blue-500'
                            } bg-transparent transition duration-500 ease-out focus:ease-in border-solid border border-black font-medium rounded-${rounded} p-${
                                padding ?? '3'
                            } mt-1 ${className ?? ''} ${input.borderColor} ${input.color}`}
                            type={typeInput}
                            name={name}
                            disabled={disabled}
                            onClick={onClick}
                            onChange={handleChange}
                            placeholder={placeholder}
                            style={{ outline: 'none' }}
                            value={value}
                            defaultValue={defaultValue}
                            onFocus={onFocus}
                            onBlur={(event: any) => {
                                setIsEditingCurrency(true)
                                onBlur && onBlur(event)
                            }}
                            {...props}
                        />
                        {type === 'email' && variant !== 'active' && (
                            <span style={{ transform: 'translateY(-39%)' }} className="absolute bold right-4 top-1/2">
                                {variant === 'error' && <XCircleIcon width={24} className={`${text.color} transition duration-500 ease-out focus:ease-in`} />}
                                {variant !== 'error' && (
                                    <CheckCircleIcon width={24} className={`${text.color} transition duration-500 ease-out focus:ease-in`} />
                                )}
                            </span>
                        )}
                        {type === 'password' && (
                            <span
                                onClick={() => {
                                    setTypeInput((prev: string) => (prev === 'text' ? 'password' : 'text'))
                                }}
                                style={{ transform: 'translateY(-39%)' }}
                                className="absolute bold cursor-pointer right-4 top-1/2 "
                            >
                                {typeInput === 'password' ? (
                                    <EyeIcon className={`${text.color} transition duration-500 ease-out focus:ease-in`} width={23} />
                                ) : (
                                    <EyeOffIcon className={`${text.color} transition duration-500 ease-out focus:ease-in`} width={23} />
                                )}
                            </span>
                        )}
                    </div>
                    {variant !== 'active' && message && <p className={`text-xs mt-2 ml-2 font-medium ${text.color}`}>{message}</p>}
                </>
            )}
        </>
    )
}
