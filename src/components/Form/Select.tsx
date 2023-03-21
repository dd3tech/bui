import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import XCircleIcon from '@heroicons/react/outline/XCircleIcon'
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon'
import { StyleObject } from 'lib/styles'
import { composeClasses } from 'lib/classes'
import { Padding, ShadowVariants } from '../../interfaces/types'
import {
  inputVariants,
  InputVariant as SelectVariantType,
  getAnimationLabel,
  getPaddingInput
} from './shared'

type ItemObj = {
  label?: string
  disabled?: boolean
  selected?: boolean
}
export interface ISelectOptions {
  [key: string]: ItemObj | string
}

export interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: SelectVariantType
  label?: string
  message?: string
  noBorders?: boolean
  padding?: Padding
  paddingX?: Padding
  paddingY?: Padding
  endAdornment?: ReactNode
  startAdornment?: ReactNode
  classNameAdornment?: string
  rounded?: string
  large?: boolean
  boxShadow?: ShadowVariants
  optionsList: ISelectOptions
  itemWidth?: 'trimWithEllipsis' | 'fullWidth' | 'textWrap'
}

const IconStatus = ({ variant }: { variant: SelectVariantType }) => {
  const { bgIcon, text } = inputVariants[variant]
  return (
    <div
      className={composeClasses(
        'flex justify-center items-center rounded-xl bg-red-50 text-red-500',
        text.color,
        bgIcon?.color
      )}
      style={{ marginLeft: 11, marginRight: -10, minWidth: 36, minHeight: 36 }}
      role="defaultIcon"
    >
      {variant === 'success' && (
        <CheckCircleIcon aria-label="check" width={24} />
      )}
      {variant === 'warning' && (
        <InformationCircleIcon aria-label="warning" width={24} />
      )}
      {variant === 'error' && <XCircleIcon aria-label="error" width={24} />}
    </div>
  )
}

const getAnimationStyle = (isOpen: boolean): StyleObject => {
  return {
    visibility: isOpen ? 'visible' : 'hidden',
    transition:
      'opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: isOpen
      ? 'scaleY(1) translateY(0)'
      : 'scaleY(0.4) translateY(-5px)',
    opacity: isOpen ? 1 : 0,
    transformOrigin: '100% 0%',
    maxHeight: '450px'
  }
}

export const getLabel = (
  key: HTMLInputElement['value'],
  optionsList: ISelectOptions
) => {
  if (!optionsList[key]) return ''

  if (typeof optionsList[key] === 'string') return optionsList[key] as string

  const item = optionsList[key] as ItemObj
  if (item.label) return item.label

  return key
}

export const getSelectedKey = (optionsList: ISelectOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selected = Object.entries(optionsList).filter(([_, option]) => {
    if (typeof option === 'object') return option.selected
    return ''
  })

  return selected[0]?.[0]
}

function Select({
  variant = 'default',
  label,
  rounded = 'lg',
  className,
  classNameAdornment,
  padding,
  paddingX = '4',
  paddingY,
  startAdornment,
  endAdornment,
  message,
  noBorders,
  onFocus,
  onBlur,
  large,
  boxShadow = 'lg',
  style,
  onChange,
  optionsList,
  name,
  value: selectedValue,
  placeholder,
  itemWidth = 'trimWithEllipsis',
  ...otherProps
}: SelectProps) {
  const { disabled } = otherProps
  variant = disabled ? 'disabled' : variant
  const isDisabled = variant === 'disabled'
  const { input, text } = inputVariants[variant]
  const selectRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOpt, setSelectedOpt] = useState<{
    value: string
    label: string
  }>({
    value: '',
    label: ''
  })

  const styles = {
    adornment: composeClasses(
      'text-gray-400 transition duration-500 ease-out focus:ease-in',
      classNameAdornment
    ),
    container: composeClasses(
      'relative placeholder-gray-400 mt-1 flex items-center justify-between font-medium gap-3 cursor-pointer',
      'border-solid border',
      'transition duration-500 ease-out focus:ease-in',
      !isDisabled && `hover:shadow-${boxShadow} hover:border-gray-500`,
      noBorders && 'border-none',
      `rounded-${rounded}`,
      !['error', 'success', 'warning'].includes(variant) &&
        focused &&
        'border-blue-500',
      ['error', 'success', 'warning'].includes(variant)
        ? 'bg-white'
        : 'bg-gray-50',
      isDisabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'hover:bg-white',
      input.borderColor,
      padding && `p-${padding}`,
      !padding && paddingX && `px-${paddingX}`,
      !padding && paddingY && `py-${paddingY}`,
      input.color,
      large ? 'h-13' : 'h-12',
      className
    )
  }

  const isLabelScalded = !label || focused || selectedOpt.value !== ''

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus && onFocus(event)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur &&
        onBlur({
          target: { value: event.target.value, name }
        } as FocusEvent<HTMLInputElement>)
    },
    [onBlur]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const label = getLabel(event.target.value, optionsList) as string
      setSelectedOpt({ value: event.target.value, label })
      onChange &&
        onChange({
          target: { value: event.target.value, name }
        } as ChangeEvent<HTMLInputElement>)
    },
    [onChange]
  )

  const handleSelect = useCallback(() => {
    !isDisabled && setIsOpen((prev) => !prev)
  }, [variant])

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const keyValue = selectedValue || getSelectedKey(optionsList)
    const value = (optionsList[`${keyValue}`] ? keyValue : '') as string
    const label = keyValue ? getLabel(keyValue.toString(), optionsList) : ''

    setSelectedOpt({
      value,
      label
    })
  }, [selectedValue, optionsList])

  return (
    <div
      ref={selectRef}
      role="select-container-group"
      className="relative"
      onClick={handleSelect}
    >
      <div
        role="select-container"
        className={styles.container}
        style={{ zIndex: 2, ...style }}
      >
        {startAdornment && (
          <div data-testid="startAdornment" className={styles.adornment}>
            {startAdornment}
          </div>
        )}
        <div className="flex flex-col w-full relative h-11">
          {label && (
            <label
              style={getAnimationLabel(isLabelScalded)}
              className={composeClasses(
                'absolute w-full block text-xxs font-medium leading-none text-left whitespace-nowrap overflow-hidden overflow-ellipsis',
                !isDisabled && 'text-gray-500'
              )}
            >
              {label}
            </label>
          )}
          <div className="relative">
            <input
              {...otherProps}
              className={composeClasses(
                'outline-none w-full font-medium bg-transparent text-transparent'
              )}
              placeholder={isLabelScalded ? placeholder : ''}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={selectedOpt.value}
              readOnly
              style={{
                cursor: 'inherit',
                ...getPaddingInput(!!label)
              }}
            />
            <div
              className="absolute w-full h-full whitespace-nowrap overflow-hidden top-0 left-0 bg-transparent text-left"
              style={{ zIndex: -1, ...getPaddingInput(!!label) }}
            >
              {selectedOpt.label}
            </div>
          </div>
        </div>

        {endAdornment && (
          <div data-testid="endAdornment" className={styles.adornment}>
            {endAdornment}
          </div>
        )}

        <div>
          {isOpen ? (
            <ChevronUpIcon className="text-gray-400" width={18} />
          ) : (
            <ChevronDownIcon className="text-gray-400" width={18} />
          )}
        </div>

        {['warning', 'error', 'success'].includes(variant) && (
          <IconStatus variant={variant} />
        )}
      </div>
      <div
        role="dropdown"
        className={composeClasses(
          'absolute left-0 z-10 w-full py-1 mt-1 bg-white overflow-y-auto',
          `top-${large ? '13' : '12'}  rounded-${rounded} shadow-${boxShadow}`,
          itemWidth === 'fullWidth' && 'min-w-max'
        )}
        style={getAnimationStyle(isOpen)}
      >
        {Object.entries(optionsList).map(([key, option]) => {
          const txtLabel = getLabel(key, optionsList)
          const disabled = typeof option !== 'string' ? option.disabled : false

          return (
            <button
              key={key}
              type="button"
              className={composeClasses(
                'block w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100',
                typeof option !== 'string' &&
                  disabled &&
                  'cursor-not-allowed opacity-50',
                key === selectedOpt.value && 'bg-blue-50',
                itemWidth === 'trimWithEllipsis' &&
                  'whitespace-nowrap overflow-hidden overflow-ellipsis'
              )}
              onClick={() =>
                handleChange({
                  target: { value: key }
                } as ChangeEvent<HTMLInputElement>)
              }
              disabled={disabled}
            >
              {txtLabel}
            </button>
          )
        })}
      </div>
      {message && (
        <p className={composeClasses('text-xs mt-1 ml-2', text.color)}>
          {message}
        </p>
      )}
    </div>
  )
}

export default Select
