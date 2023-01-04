import { useState, ChangeEvent, useCallback, useEffect } from 'react'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 'small' | 'medium' | '2xl' | '3xl' | '4xl'
    checked?: boolean
    color?: string
    padding?: string
    disabled?: boolean
    indeterminate?: boolean
    defaultChecked?: boolean
}

const sizeByProp = {
    small: 'text-sm',
    medium: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
}

const CheckBoxIcon = () => {
    return <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
}

const CheckBoxOutlineBlank = () => {
    return <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
}

const CheckBoxIndeterminate = () => {
    return <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path>
}

function Checkbox({ checked, color = '#3b82f6', size = '2xl', disabled, padding, className, indeterminate, defaultChecked, ...props }: Props) {
    const [selected, setSelected] = useState(!!defaultChecked)
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.checked)
    }

    const getColor = useCallback(() => {
        if (disabled) return 'rgba(0, 0, 0, 0.26)'
        if (selected || indeterminate) return color
        return undefined
    }, [color, selected, disabled, indeterminate])

    useEffect(() => {
        if (checked !== undefined) {
            setSelected(checked)
        }
    }, [checked])

    return (
        <span {...props} style={{ color: getColor() }} className={`${padding ? padding : 'p-2.5'} inline-flex relative outline-none align-middle ${className}`}>
            <input
                type="checkbox"
                className="opacity-0 absolute top-0 left-0 m-0 p-0 w-full h-full z-10 cursor-pointer"
                disabled={disabled}
                checked={selected}
                onChange={onChange}
            />
            <svg
                className={`fill-current select-none duration-200 transition ${sizeByProp[size]}`}
                width="1em"
                height="1em"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
            >
                {indeterminate ? <CheckBoxIndeterminate /> : selected ? <CheckBoxIcon /> : <CheckBoxOutlineBlank />}
            </svg>
        </span>
    )
}

export default Checkbox
