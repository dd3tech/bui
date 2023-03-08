import { HTMLProps, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { inputVariants, InputVariant as InputVariantType } from './shared'
import { Padding, ShadowVariants } from '../../interfaces/types'

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    variant?: InputVariantType
    label?: string
    message?: string
    inputBlank?: boolean
    paddingX?: Padding
    paddingY?: Padding
    endAdornment?: ReactNode
    classNameAdornment?: string
    rounded?: string
    large?: boolean
    boxShadow?: ShadowVariants
}

function TextArea({
    variant = 'default',
    label,
    rounded = 'lg',
    className,
    classNameAdornment,
    paddingX = '4',
    paddingY = '2',
    endAdornment,
    message,
    inputBlank,
    size,
    large,
    boxShadow = 'lg',
    ...otherProps
}: TextAreaProps) {
    const { disabled } = otherProps
    variant = disabled ? 'disabled' : variant
    const { input, text } = inputVariants[variant]

    const styles = {
        adornment: composeClasses('text-gray-400 transition duration-500 ease-out max-h-6 focus:ease-in'),
        container: composeClasses(
            'placeholder-gray-400 mt-1 flex items-center justify-between bg-transparent font-medium relative',
            'border-solid border',
            'transition duration-500 ease-out focus:ease-in',
            `hover:shadow-${boxShadow} hover:border-gray-500`,
            inputBlank && 'border-none',
            rounded && `rounded-${rounded}`,
            !['error', 'success', 'warning'].includes(variant) && 'focus:border-blue-500',
            `px-${paddingX}`,
            `py-${paddingY}`,
            input.borderColor,
            input.color,
            variant === 'disabled' && 'bg-gray-100 text-gray-400 cursor-not-allowed',
            classNameAdornment
        )
    }

    return (
        <>
            <div className="relative">
                {label && (
                    <label
                        style={{ cursor: 'inherit' }}
                        className={composeClasses(
                            'z-10 w-full block text-xxs  font-medium leading-none absolute px-4 py-2',
                            variant !== 'disabled' ? 'text-gray-500' : 'text-gray-400',
                            `px-${paddingX}`,
                            `pt-${paddingY}`
                        )}
                    >
                        {label}
                    </label>
                )}
                <textarea {...otherProps} className={'w-full px-4 py-5 focus:outline-none ' + styles.container} disabled={variant === 'disabled'} />
                {endAdornment && (
                    <div data-testid="endAdornment" className={'absolute bottom-3 right-2.5 ' + styles.adornment}>
                        {endAdornment}
                    </div>
                )}
            </div>
            {message && <p className={composeClasses('text-xs mt-1 ml-2', text.color)}>{message}</p>}
        </>
    )
}

export default TextArea
