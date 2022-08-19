import React from 'react'

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
    placeholder,
    maxlength,
    onChange,
    onClick,
    onFocus,
    label,
    classNameLabel,
    ...props
}: ITextAreaProps) => {
    return (
        <>
            {label && <label className={`block text-sm font-medium leading-4 mb-2 ${classNameLabel}`}>{label}</label>}
            <textarea
                placeholder={placeholder}
                className={` ${className} focus:border-blue-500 bg-transparent transition duration-500 ease-out focus:ease-in border-solid border border-black font-medium rounded-lg outline-none p-3 `}
                maxLength={maxlength ?? 400}
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
