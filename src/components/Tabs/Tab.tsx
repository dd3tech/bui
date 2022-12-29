import { ClockIcon } from '@heroicons/react/outline'
import { useRef, useMemo } from 'react'

interface PrivateProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabledText?: string
    index?: number
    value?: number
    childClassName?: string
    textColor?: string
    variant?: 'primary' | 'secondary'
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    label: string
    disabled?: boolean
    fontSize?: string
}

function Tab({ label, id, disabled, fontSize, ...otherProps }: Props) {
    const element = useRef<HTMLButtonElement | null>(null)
    const { onClick, disabledText, index, value, childClassName = '', textColor, variant = 'primary' } = otherProps as PrivateProps

    const variantStyle = {
        secondary: 'border rounded-md py-2 px-5',
        primary: 'py-3 px-4'
    }

    const classes = useMemo(() => {
        const list = []
        list.push(fontSize ? fontSize : 'text-xs')
        list.push(index !== value ? 'font-semibold' : 'font-bold')
        if (index === value) {
            if (variant === 'secondary') {
                list.push('border-blue-500')
                list.push('text-blue-500')
            }
        } else {
            list.push(disabled ? 'text-gray-300' : 'text-gray-500')
        }
        return list.join(' ')
    }, [value, variant])

    return (
        <button
            ref={element}
            disabled={disabled}
            onClick={onClick}
            style={{ color: textColor && index === value ? textColor : undefined }}
            {...otherProps}
            className={`inline-flex justify-center flex-wrap items-center box-content leading-5 select-none transition-all duration-300 ease-in ${classes} ${variantStyle[variant]} ${childClassName}`}
        >
            {label}
            {disabledText && disabled && (
                <label style={{ fontSize: 10 }} className="flex gap-1.5 ml-3">
                    <ClockIcon width={15} />
                    {disabledText}
                </label>
            )}
        </button>
    )
}

export default Tab
