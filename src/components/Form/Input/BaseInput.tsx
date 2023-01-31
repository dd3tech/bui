import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import { HTMLProps, ReactNode, useCallback, useState } from 'react'

export type InputVariant = 'active' | 'focus' | 'success' | 'warning' | 'error'

export interface InputProps extends HTMLProps<HTMLInputElement> {
    type?: 'text' | 'currency' | 'password' | 'email' | 'date' | 'year' | 'month' | 'number'
    variant?: InputVariant
    label?: string
    message?: string
    defaultValue?: any
    inputBlank?: boolean
    padding?: number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    endAdornment?: ReactNode
    startAdornment?: ReactNode
    classNameAdornment?: string
    rounded?: string
    language?: 'es' | 'en'
}

const inputVariants: { [key in InputVariant]: { input: { borderColor: string; color?: string }; text: { color: string } } } = {
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

function BaseInput({
    variant = 'active',
    label,
    rounded = 'lg',
    className,
    classNameAdornment,
    padding = 3,
    startAdornment,
    endAdornment,
    message,
    inputBlank,
    onFocus,
    onBlur,
    ...props
}: InputProps) {
    const [focused, setFocused] = useState(false)
    const { input, text } = inputVariants[variant]

    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true)
            onFocus && onFocus(event)
        },
        [onFocus]
    )

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false)
            onBlur && onBlur(event)
        },
        [onBlur]
    )

    const adornmentClassName = composeClasses('transition duration-500 ease-out max-h-6', 'focus:ease-in', text.color)
    const finalClassName = composeClasses(
        'mt-1 flex items-center justify-between bg-transparent transition duration-500 ease-out focus:ease-in border-solid border border-black font-medium',
        inputBlank && 'border-none',
        rounded && `rounded-${rounded}`,
        variant === 'active' && focused && 'border-blue-500',
        `p-${padding}`,
        className ?? 'w-60',
        input.borderColor,
        input.color,
        classNameAdornment
    )

    return (
        <>
            {label && <label className="block text-sm font-medium leading-none mb-2">{label}</label>}
            <div role="input-container" className={finalClassName}>
                {startAdornment && (
                    <div data-testid="startAdornment" className={adornmentClassName}>
                        {startAdornment}
                    </div>
                )}
                <input {...props} className={composeClasses('outline-none w-full', className)} onFocus={handleFocus} onBlur={handleBlur} />
                {endAdornment && (
                    <div data-testid="endAdornment" className={adornmentClassName}>
                        {endAdornment}
                    </div>
                )}
                {!endAdornment && variant !== 'active' && (
                    <div role="defaultIcon" className={adornmentClassName}>
                        {variant === 'error' && <XCircleIcon aria-label="x" width={24} />}
                        {variant !== 'error' && <CheckCircleIcon aria-label="check" width={24} />}
                    </div>
                )}
            </div>
            {message && <p className={composeClasses('text-xs mt-2 ml-2 font-medium', text.color)}>{message}</p>}
        </>
    )
}

export default BaseInput
