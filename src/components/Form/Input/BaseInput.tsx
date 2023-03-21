import {
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react'
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import XCircleIcon from '@heroicons/react/outline/XCircleIcon'
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon'
import { composeClasses } from 'lib/classes'
import {
  inputVariants,
  InputVariant as InputVariantType,
  InputType,
  getClassesByPseudoClass,
  getAnimationLabel,
  getPaddingInput
} from '../shared'
import { Padding, ShadowVariants } from '../../../interfaces/types'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType
  variant?: InputVariantType
  label?: string
  message?: string
  inputBlank?: boolean
  padding?: Padding
  paddingX?: Padding
  paddingY?: Padding
  endAdornment?: ReactNode
  startAdornment?: ReactNode
  classNameAdornment?: string
  rounded?: string
  language?: 'es' | 'en'
  large?: boolean
  boxShadow?: ShadowVariants
}

const IconStatus = ({ variant }: { variant: InputVariantType }) => {
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

function BaseInput({
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
  inputBlank,
  onFocus,
  onBlur,
  large,
  boxShadow = 'lg',
  style,
  placeholder,
  value,
  ...otherProps
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const { disabled } = otherProps
  variant = disabled ? 'disabled' : variant
  const isDisabled = variant === 'disabled'
  const { input, text } = inputVariants[variant]
  const inputRef = useRef<HTMLInputElement>(null)
  const isLabelScalded =
    !label ||
    focused ||
    value?.toLocaleString().length ||
    inputRef.current?.value.length

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus && onFocus(event)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur && onBlur(event)
    },
    [onBlur]
  )

  const styles = {
    adornment: composeClasses(
      'text-gray-400 transition duration-500 ease-out focus:ease-in',
      classNameAdornment
    ),
    container: composeClasses(
      'gap-3 placeholder-gray-400 mt-1 flex items-center justify-between bg-transparent font-medium',
      'border-solid border',
      'transition duration-500 ease-out focus:ease-in',
      !isDisabled && `hover:shadow-${boxShadow} hover:border-gray-500`,
      className && disabled && getClassesByPseudoClass(className, 'disabled'),
      inputBlank && 'border-none',
      rounded && `rounded-${rounded}`,
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

  return (
    <>
      <div role="input-container" className={styles.container} style={style}>
        {startAdornment && (
          <div data-testid="startAdornment" className={styles.adornment}>
            {startAdornment}
          </div>
        )}
        <div className="flex flex-col w-full relative h-11">
          {label && (
            <label
              style={getAnimationLabel(!!isLabelScalded)}
              className={composeClasses(
                'absolute w-full block text-xxs font-medium leading-none text-left whitespace-nowrap overflow-hidden overflow-ellipsis',
                !isDisabled && 'text-gray-500'
              )}
            >
              {label}
            </label>
          )}
          <input
            ref={inputRef}
            {...otherProps}
            placeholder={isLabelScalded ? placeholder : ''}
            className={composeClasses(
              'outline-none w-full font-medium bg-transparent'
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              cursor: 'inherit',
              zIndex: 1,
              ...getPaddingInput(!!label)
            }}
            disabled={isDisabled}
            value={value}
          />
        </div>
        {endAdornment && (
          <div data-testid="endAdornment" className={styles.adornment}>
            {endAdornment}
          </div>
        )}
        {['warning', 'error', 'success'].includes(variant) && (
          <IconStatus variant={variant} />
        )}
      </div>
      {message && (
        <p className={composeClasses('text-xs mt-1 ml-2', text.color)}>
          {message}
        </p>
      )}
    </>
  )
}

export default BaseInput
