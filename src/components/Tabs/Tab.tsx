import { useMemo, useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import { ClockIcon } from '@heroicons/react/outline'

interface PrivateProps {
  onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void
  index?: number
  value?: number
  variant?: 'primary' | 'secondary'
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  textColor?: string
  disabledText?: string
  label: string
  disabled?: boolean
}

const variantStyle = {
  secondary: 'border rounded-md py-2 px-5',
  primary: 'py-3 px-4'
}

function Tab({
  label,
  disabled,
  onClick,
  disabledText,
  textColor,
  className,
  ...otherProps
}: Props) {
  const {
    onChange,
    index,
    value,
    variant = 'primary'
  } = otherProps as PrivateProps

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onChange && onChange(event)
      onClick && onClick(event)
    },
    [onClick, onChange]
  )

  const classes = useMemo(() => {
    const list = []
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
      {...otherProps}
      role="tab"
      disabled={disabled}
      onClick={handleClick}
      style={{ color: textColor && index === value ? textColor : undefined }}
      className={composeClasses(
        'inline-flex justify-center flex-wrap items-center box-content leading-5 select-none transition-all duration-300 ease-in',
        classes,
        variantStyle[variant],
        className
      )}
    >
      {label}
      {disabledText && disabled && (
        <label
          role="contentinfo"
          style={{ fontSize: 10 }}
          className="flex gap-1.5 ml-3"
        >
          <ClockIcon width={15} />
          {disabledText}
        </label>
      )}
    </button>
  )
}

export default Tab
