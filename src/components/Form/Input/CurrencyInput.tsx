import {
  useState,
  useCallback,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  forwardRef,
  useEffect
} from 'react'
import CInput from 'react-currency-input-field'
import { composeClasses } from 'lib/classes'
import {
  inputVariants,
  InputVariant as InputVariantType,
  InputType,
  getClassesByPseudoClass,
  getPaddingInput
} from '../shared'
import { Padding, Rounded, ShadowVariants } from '../../../interfaces/types'
import FormLabel from '../FormLabel'
import { IconStatus } from './BaseInput'

interface InputCurrencyProps extends InputHTMLAttributes<HTMLInputElement> {
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
  prefix?: string
  groupSeparator?: string
  decimalSeparator?: string
  decimalsLimit?: number
  suffix?: string
  min?: number
  max?: number
}

const CurrencyInput = forwardRef<HTMLDivElement, InputCurrencyProps>(
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
      prefix = '$',
      suffix,
      groupSeparator = ',',
      decimalSeparator = '.',
      decimalsLimit = 2,
      min,
      max,
      onChange,
      ...otherProps
    }: InputCurrencyProps,
    ref
  ) => {
    const [focused, setFocused] = useState(false)
    const { disabled } = otherProps
    variant = disabled ? 'disabled' : variant
    const isDisabled = variant === 'disabled'
    const { input, text } = inputVariants[variant]
    const inputRef = useRef<HTMLInputElement>(null)

    const [isLabelScalded, seTisLabelScalded] = useState<boolean>(
      !label || focused || Boolean(inputRef.current?.value)
    )

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
        !isDisabled && `hover:shadow-${boxShadow} hover:border-info`,
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

    useEffect(() => seTisLabelScalded(!!value), [value])

    useEffect(() => {
      seTisLabelScalded(!!otherProps?.defaultValue || !!value)
    }, [])

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
                isLabelScalded={(isLabelScalded as boolean) || focused}
                isDisabled={isDisabled}
                isRequired={isRequired}
                label={label}
              />
            )}
            <CInput
              ref={inputRef}
              {...otherProps}
              placeholder={isLabelScalded ? placeholder : ''}
              className={composeClasses(
                'outline-none w-full font-medium bg-transparent'
              )}
              defaultValue={Number(value) || undefined}
              allowDecimals={true}
              allowNegativeValue={true}
              step={undefined}
              onFocus={handleFocus}
              onBlur={handleBlur}
              groupSeparator={groupSeparator}
              decimalSeparator={decimalSeparator}
              decimalsLimit={decimalsLimit}
              prefix={prefix}
              disabled={isDisabled}
              suffix={suffix}
              style={{
                cursor: 'inherit',
                zIndex: 1,
                ...getPaddingInput(!!label)
              }}
              onValueChange={(value, name) => {
                const _value = Number(value)
                if (min && value && _value < min) {
                  return
                }
                if (max && value && _value > max) {
                  return
                }
                const event = {
                  target: {
                    value: _value || undefined,
                    name
                  }
                }
                onChange && onChange(event as any)
              }}
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

export default CurrencyInput
