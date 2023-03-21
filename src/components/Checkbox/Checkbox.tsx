import { useState, ChangeEvent, useCallback, useMemo } from 'react'
import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  IndeterminateCheckBoxIcon
} from './icons'
import { composeClasses } from 'lib/classes'

interface Props extends React.HTMLProps<HTMLInputElement> {
  fontSize?: 'sm' | 'xl' | '2xl' | '3xl' | '4xl'
  color?: string
  padding?: string
  indeterminate?: boolean
  classNameContainer?: string
}

const sizeByProp = {
  sm: 'text-sm',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
}

function Checkbox({
  checked,
  color = '#3b82f6',
  fontSize = '2xl',
  disabled,
  padding,
  classNameContainer,
  indeterminate,
  onChange,
  ...props
}: Props) {
  const [selected, setSelected] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    if (checked === undefined) {
      setSelected(event.target.checked)
    }
  }

  const checkedValue: boolean = useMemo(() => {
    if (checked === undefined) return selected
    return checked
  }, [checked, selected])

  const getColor = useCallback(() => {
    const disabledColor = 'rgba(0, 0, 0, 0.26)'
    if (disabled) return disabledColor
    if (checkedValue || indeterminate) return color
    return undefined
  }, [color, disabled, indeterminate, checkedValue])

  const svgClassName = `fill-current select-none duration-200 transition ${sizeByProp[fontSize]}`

  return (
    <span
      role="container"
      style={{ color: getColor() }}
      className={composeClasses(
        'inline-flex relative outline-none align-middle',
        padding ? padding : 'p-2.5',
        classNameContainer
      )}
    >
      <input
        {...props}
        role="checkbox"
        type="checkbox"
        className="opacity-0 absolute top-0 left-0 m-0 p-0 w-full h-full z-10 cursor-pointer"
        disabled={disabled}
        checked={checkedValue}
        onChange={handleChange}
      />
      {indeterminate ? (
        <IndeterminateCheckBoxIcon className={svgClassName} />
      ) : checkedValue ? (
        <CheckBoxIcon className={svgClassName} />
      ) : (
        <CheckBoxOutlineBlankIcon className={svgClassName} />
      )}
    </span>
  )
}

export default Checkbox
