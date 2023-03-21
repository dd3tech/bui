import {
  TextareaHTMLAttributes,
  ReactNode,
  useCallback,
  useState,
  useRef
} from 'react'
import { composeClasses } from 'lib/classes'
import {
  inputVariants,
  InputVariant as InputVariantType,
  getAnimationLabel
} from './shared'
import { Padding, ShadowVariants } from '../../interfaces/types'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariantType
  label?: string
  message?: string
  inputBlank?: boolean
  paddingX?: Padding
  paddingY?: Padding
  endAdornment?: ReactNode
  classNameAdornment?: string
  rounded?: string
  large?: boolean
  boxShadow?: ShadowVariants
}

function TextArea({
  variant = 'default',
  label,
  rounded = 'lg',
  className,
  classNameAdornment,
  paddingX = '4',
  paddingY = '2',
  endAdornment,
  message,
  inputBlank,
  boxShadow = 'lg',
  placeholder,
  onFocus,
  onBlur,
  ...otherProps
}: TextAreaProps) {
  const { disabled } = otherProps
  variant = disabled ? 'disabled' : variant
  const isDisabled = variant === 'disabled'
  const { input, text } = inputVariants[variant]
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isLabelScalded = !label || focused || textareaRef.current?.value.length

  const styles = {
    adornment: composeClasses(
      'text-gray-400 transition duration-500 ease-out max-h-6 focus:ease-in',
      classNameAdornment
    ),
    container: composeClasses(
      'w-full placeholder-gray-400 mt-1 flex items-center justify-between font-medium relative',
      'border-solid border',
      'transition duration-500 ease-out focus:ease-in',
      !isDisabled && `hover:shadow-${boxShadow} hover:border-gray-500`,
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
      input.color,
      paddingX && `px-${paddingX}`,
      paddingY && `py-${paddingY}`,
      className
    )
  }

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true)
      onFocus && onFocus(event)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false)
      onBlur && onBlur(event)
    },
    [onBlur]
  )

  return (
    <>
      <div role="textarea-container" className={styles.container}>
        {label && (
          <label
            style={{
              cursor: 'inherit',
              zIndex: 1,
              ...getAnimationLabel(!!isLabelScalded)
            }}
            className={composeClasses(
              'absolute w-full block text-xxs font-medium leading-none text-left whitespace-nowrap overflow-hidden overflow-ellipsis pb-0.5',
              !isDisabled ? 'text-gray-500' : 'text-gray-400'
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          {...otherProps}
          className={composeClasses(
            'w-full h-full bg-transparent focus:outline-none',
            isDisabled && 'cursor-not-allowed'
          )}
          placeholder={isLabelScalded ? placeholder : ''}
          disabled={isDisabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ zIndex: 1, paddingTop: 15 }}
        />
        {endAdornment && (
          <div
            data-testid="endAdornment"
            className={'absolute bottom-3 right-2.5 ' + styles.adornment}
          >
            {endAdornment}
          </div>
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

export default TextArea
