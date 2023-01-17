import React from 'react'
import { composeClasses } from 'lib/classes'

export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxlength?: number
    label?: string
    classNameLabel?: string
}

export const TextArea = ({
    value,
    required,
    name,
    className,
    disabled,
    placeholder = '',
    maxlength = 500,
    onChange,
    onClick,
    onFocus,
    label,
    classNameLabel,
    ...props
}: ITextAreaProps) => {
    return (
        <>
            {label && <label className={composeClasses('block text-sm font-medium leading-4 mb-2', classNameLabel)}>{label}</label>}
            <textarea
                placeholder={placeholder}
                className={composeClasses(
                    ' bg-transparent transition duration-500 ease-out border-solid border border-black font-medium rounded-lg outline-none p-3',
                    'focus:border-blue-500 focus:ease-in',
                    className
                )}
                maxLength={maxlength}
                onChange={onChange}
                onClick={onClick}
                onFocus={onFocus}
                value={value}
                required={required}
                name={name}
                disabled={disabled}
                {...props}
            />
        </>
    )
}
