import { HTMLProps, ReactNode, useEffect, useState } from 'react'
import { Padding, Rounded, Size, Weight, Width } from '../../interfaces/types'

import { fontSize as textSize, fontWeight as textWeight } from 'lib/font'
import { composeClasses } from 'lib/classes'
import { borderRadius } from 'lib/shape'
import { spacing } from 'lib/spacing'

export type SelectVariant = 'none' | 'standard' | 'outlined'

export interface ISelectOptions {
    [key: string]: {
        label?: string
        disabled?: boolean
    }
}

export interface ISelectProps extends HTMLProps<HTMLSelectElement> {
    label?: string
    variant?: SelectVariant
    startAdornment?: ReactNode
    rounded?: Rounded
    active?: boolean
    success?: boolean
    warning?: boolean
    error?: boolean
    message?: string
    padding?: Padding
    fontSize?: Size
    fontWeight?: Weight
    optionsList: ISelectOptions
    width?: Width
}

export const getSelectStates = (state: { error?: boolean; warning?: boolean; success?: boolean; disabled?: boolean }) => {
    const classes = {
        input: {
            borderColor: 'border-gray-500 focus:border-blue-500',
            color: 'text-gray-900'
        },
        text: {
            color: 'text-gray-900'
        }
    }

    if (state.success) {
        classes.input.borderColor = 'border-green-500'
        classes.text.color = 'text-green-500'
    }

    if (state.warning) {
        classes.input.borderColor = 'border-yellow-500'
        classes.text.color = 'text-yellow-500'
    }

    if (state.error) {
        classes.input.borderColor = 'border-red-500'
        classes.text.color = 'text-red-500'
    }

    if (state.disabled) {
        classes.input.borderColor = 'border-gray-400 bg-gray-100'
        classes.input.color = 'text-gray-400'
        classes.text.color = 'text-gray-900'
    }

    return classes
}

const Select = ({
    label,
    variant = 'outlined',
    startAdornment,
    rounded = 'none',
    error,
    warning,
    success,
    active,
    message,
    padding = '3',
    fontSize = 'sm',
    fontWeight = 'medium',
    optionsList,
    disabled,
    width = 'full',
    ...props
}: ISelectProps) => {
    const { input, text } = getSelectStates({ error, warning, success, disabled })
    const [paddingLeft, setPaddingLeft] = useState('')

    const className = composeClasses(
        'absolute w-full h-full appearance-none bg-transparent px-4 left-0',
        'focus:outline-none',
        `rounded-${rounded}`,
        variant === 'outlined' && `border ${borderRadius.sm.all}`,
        variant === 'standard' && 'border-b-2',
        input.borderColor,
        input?.color,
        fontSize && `text-${fontSize}`,
        fontWeight && `font-${fontWeight}`,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    )

    useEffect(() => {
        const parent = document.querySelector('[role="group-select"]')
        if (parent && startAdornment) {
            const currentPadding = parseInt(getComputedStyle(parent).padding)
            const select = document.querySelector('select')
            select && setPaddingLeft(currentPadding + 28 + 'px')
        }
    }, [padding])

    return (
        <>
            {label && <label className={composeClasses('block leading-none', spacing.sm.marginBottom, textSize.sm, textWeight.medium)}>{label}</label>}
            <div
                role="group-select"
                className={composeClasses('w-full relative flex items-center', `p-${padding}`, startAdornment ? 'justify-between' : 'justify-end')}
            >
                {startAdornment && (
                    <div data-testid="startAdornment" className={` ${text.color}`}>
                        {startAdornment}
                    </div>
                )}
                <select {...props} className={className} style={{ paddingLeft: paddingLeft }} disabled={disabled}>
                    {Object.entries(optionsList).map(([key, { label, disabled }]) => (
                        <option key={key} disabled={disabled} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <div className={composeClasses(variant !== 'none' && spacing.xxl.paddingRight)}>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {message && <p className={composeClasses(textSize.xs, spacing.sm.marginTop, spacing.sm.marginLeft, textWeight.medium, text.color)}>{message}</p>}
        </>
    )
}

export default Select
