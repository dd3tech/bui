import { HTMLProps, ReactNode, useCallback, useState } from 'react'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

import { inputVariants, InputVariant as InputVariantType, InputType, getClassesByPseudoClass } from '../shared'

export type InputVariant = InputVariantType

export interface InputProps extends HTMLProps<HTMLInputElement> {
    type?: InputType
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
    ...otherProps
}: InputProps) {
    const [focused, setFocused] = useState(false)
    const { input, text } = inputVariants[variant]
    const { disabled } = otherProps

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

    const styles = {
        adornment: composeClasses('transition duration-500 ease-out max-h-6', 'focus:ease-in', text.color),
        container: composeClasses(
            'mt-1 flex items-center justify-between bg-transparent border-solid border border-black font-medium',
            'transition duration-500 ease-out focus:ease-in',
            className && disabled && getClassesByPseudoClass(className, 'disabled'),
            inputBlank && 'border-none',
            rounded && `rounded-${rounded}`,
            variant === 'active' && focused && 'border-blue-500',
            `p-${padding}`,
            className ?? 'w-60',
            input.borderColor,
            input.color,
            classNameAdornment
        )
    }

    return (
        <>
            {label && <label className="block text-sm font-medium leading-none mb-2">{label}</label>}
            <div role="input-container" className={styles.container}>
                {startAdornment && (
                    <div data-testid="startAdornment" className={styles.adornment}>
                        {startAdornment}
                    </div>
                )}
                <input {...otherProps} className={composeClasses('outline-none w-full', className)} onFocus={handleFocus} onBlur={handleBlur} />
                {endAdornment && (
                    <div data-testid="endAdornment" className={styles.adornment}>
                        {endAdornment}
                    </div>
                )}
                {!endAdornment && variant !== 'active' && (
                    <div role="defaultIcon" className={styles.adornment}>
                        {variant === 'warning' && <InformationCircleIcon aria-label="warning" width={24} />}
                        {variant === 'error' && <XCircleIcon aria-label="error" width={24} />}
                        {variant === 'success' && <CheckCircleIcon aria-label="check" width={24} />}
                    </div>
                )}
            </div>
            {message && <p className={composeClasses('text-xs mt-2 ml-2 font-medium', text.color)}>{message}</p>}
        </>
    )
}

export default BaseInput
