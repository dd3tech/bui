import { CSSProperties, forwardRef } from 'react'
import { composeClasses } from 'lib/classes'

export interface IRadio {
  label?: string
  name?: string
  value: string
  checked?: boolean
  disabled?: boolean
  error?: boolean
  color?: 'primary' | 'success' | 'danger'
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  style?: CSSProperties
}

export const getClasses = (
  checked: boolean,
  disabled: boolean,
  error: boolean,
  markColor: string
) => {
  const classes = {
    label: 'text-gray-900',
    radio: 'border-gray-300',
    mark: { size: 'w-0 h-0 opacity-0', color: markColor }
  }

  if (checked) {
    classes.mark.size = 'w-3.5 h-3.5 opacity-100'
  }

  if (error) {
    classes.radio = 'border-red-500'
  }

  if (disabled) {
    classes.label = 'text-gray-400'
    classes.radio = 'bg-gray-200 border-gray-300'
    classes.mark.color = 'bg-gray-400'
  }

  return classes
}

const colorsVariants: { [key: string]: string } = {
  primary: 'bg-blue-700',
  success: 'bg-green-500',
  danger: 'bg-red-600'
}

const Radio = forwardRef<HTMLLabelElement, IRadio>(
  (
    {
      label,
      name,
      value,
      checked = false,
      disabled = false,
      error = false,
      color = 'primary',
      inputProps,
      className,
      style,
      onChange
    }: IRadio,
    ref
  ) => {
    const classes = getClasses(checked, disabled, error, colorsVariants[color])

    return (
      <label
        role="label"
        ref={ref}
        className={composeClasses(
          'flex items-center relative text-sm font-medium mb-5 content-radio',
          classes.label,
          className
        )}
        style={style}
      >
        <input
          type="radio"
          name={name}
          value={value}
          className="h-4 w-4 absolute hidden"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...inputProps}
        />
        <span
          role="radioCustom"
          className={composeClasses(
            'flex justify-center items-center relative w-5 h-5 rounded-full mr-3.5 border',
            classes.radio
          )}
        >
          <span
            role="mark"
            className={composeClasses(
              'block rounded-full absolute transition-all',
              classes.mark.size,
              classes.mark.color
            )}
          />
        </span>
        {label}
      </label>
    )
  }
)

export default Radio
