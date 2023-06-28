import {
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
  forwardRef
} from 'react'
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import XCircleIcon from '@heroicons/react/outline/XCircleIcon'
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon'
import { composeClasses } from 'lib/classes'
import {
  inputVariants,
  InputVariant as InputVariantType,
  InputType,
  getPaddingInput
} from '../shared'
import { Padding, Rounded, ShadowVariants } from '../../../interfaces/types'
import FormLabel from '../FormLabel'
import useInputStyles from './useInputStyles'

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
  rounded?: Rounded
  language?: 'es' | 'en'
  large?: boolean
  boxShadow?: ShadowVariants
  isRequired?: boolean
  internalClassName?: string
}

export const IconStatus = ({ variant }: { variant: InputVariantType }) => {
  const { bgIcon, text } = inputVariants[variant]
  return (
    <div
      className={composeClasses(
        'flex justify-center items-center rounded-xl bg-red-50 text-error',
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

const BaseInput = forwardRef<HTMLDivElement, InputProps>(
  (
    {
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
      isRequired,
      disabled,
      internalClassName,
      ...otherProps
    }: InputProps,
    ref
  ) => {
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const { styles, isLabelScalded, isDisabled, text } = useInputStyles({
      disabled,
      variant,
      focused,
      classNameAdornment,
      className,
      boxShadow,
      inputBlank,
      rounded,
      padding,
      paddingX,
      paddingY,
      large,
      label,
      inputRef,
      value
    })

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

    return (
      <>
        <div
          ref={ref}
          role="input-container"
          className={styles.container}
          style={style}
        >
          {startAdornment && (
            <div data-testid="startAdornment" className={styles.adornment}>
              {startAdornment}
            </div>
          )}
          <div className="flex flex-col w-full relative h-11">
            {label && (
              <FormLabel
                isLabelScalded={isLabelScalded}
                isDisabled={isDisabled}
                isRequired={isRequired}
                label={label}
              />
            )}
            <input
              ref={inputRef}
              {...otherProps}
              placeholder={isLabelScalded ? placeholder : ''}
              className={composeClasses(
                internalClassName,
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
)

export default BaseInput
