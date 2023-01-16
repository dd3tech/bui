import { ChangeEvent, useState, ReactElement } from 'react'
import { formatCurrency, getValueWithDecimalFormat } from 'dd360-utils'
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'

import { composeClasses } from 'lib/classes'

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
    label?: string
    padding?: number | string
    variant?: 'active' | 'focus' | 'success' | 'warning' | 'error'
    message?: string
    value?: any
    defaultValue?: any
    isCurrency?: boolean
    separators?: boolean
    endAdorment?: string | ReactElement
    startAdorment?: string | ReactElement
    inputBlank?: boolean
    rounded?: string
    isDecimal?: boolean
    isInteger?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
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
    padding = 3,
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
    const [focused, setFocused] = useState(false)

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

    const finalClassName = composeClasses(
        'mt-1 flex items-center justify-between bg-transparent transition duration-500 ease-out focus:ease-in border-solid border border-black font-medium',
        inputBlank && 'border-none',
        variant === 'active' && focused && 'border-blue-500',
        rounded && `rounded-${rounded}`,
        `p-${padding}`,
        className ?? 'w-60',
        input.borderColor,
        input.color
    )

    const iconClassName = composeClasses('transition duration-500 ease-out', 'focus:ease-in', text.color)

    return (
        <>
            {label && <label className="block text-sm font-medium leading-4">{label}</label>}
            {isCurrency || separators ? (
                <div className={finalClassName}>
                    {startAdorment && !inputBlank && <span className=" text-gray-400 text mr-2">{startAdorment}</span>}
                    <input
                        {...props}
                        className="w-full"
                        type={typeInput}
                        name={name}
                        disabled={disabled}
                        onClick={onClick}
                        onChange={(e) => onChanceCurrency(e, isCurrency)}
                        placeholder={placeholder}
                        style={{ outline: 'none' }}
                        onFocus={(event) => {
                            setIsEditingCurrency(false)
                            setFocused(true)
                            onFocus && onFocus(event)
                        }}
                        onBlur={(event: any) => {
                            setIsEditingCurrency(true)
                            setFocused(false)
                            onBlur && onBlur(event)
                        }}
                        value={valueCurrency(isCurrency)}
                    />
                    {endAdorment && !inputBlank && <span className="text-gray-400 ml-2">{endAdorment}</span>}
                </div>
            ) : (
                <>
                    <div className={finalClassName}>
                        {startAdorment && !inputBlank && <span className=" text-gray-400 text mr-2">{startAdorment}</span>}
                        <input
                            {...props}
                            className="w-full"
                            type={typeInput}
                            name={name}
                            disabled={disabled}
                            onClick={onClick}
                            onChange={handleChange}
                            placeholder={placeholder}
                            style={{ outline: 'none' }}
                            value={value}
                            defaultValue={defaultValue}
                            onFocus={(e) => {
                                setFocused(true)
                                onFocus && onFocus(e)
                            }}
                            onBlur={(event: any) => {
                                setFocused(false)
                                onBlur && onBlur(event)
                            }}
                        />
                        {type === 'email' && variant !== 'active' && (
                            <span className="bold">
                                {variant === 'error' && <XCircleIcon width={24} className={iconClassName} />}
                                {variant !== 'error' && <CheckCircleIcon width={24} className={iconClassName} />}
                            </span>
                        )}
                        {type === 'password' && (
                            <span
                                onClick={() => {
                                    setTypeInput((prev: string) => (prev === 'text' ? 'password' : 'text'))
                                }}
                                className="bold cursor-pointer "
                            >
                                {typeInput === 'password' ? (
                                    <EyeIcon className={iconClassName} width={23} />
                                ) : (
                                    <EyeOffIcon className={iconClassName} width={23} />
                                )}
                            </span>
                        )}
                        {endAdorment && !inputBlank && <span className="text-gray-400 ml-2">{endAdorment}</span>}
                    </div>
                    {variant !== 'active' && message && <p className={composeClasses('text-xs mt-2 ml-2 font-medium', text.color)}>{message}</p>}
                </>
            )}
        </>
    )
}
