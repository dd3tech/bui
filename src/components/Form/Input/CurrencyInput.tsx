import { useState, useCallback, useRef, forwardRef } from 'react'
import CInput from 'react-currency-input-field'
import { composeClasses } from 'lib/classes'
import { getPaddingInput } from '../shared'
import FormLabel from '../FormLabel'
import { IconStatus, InputProps } from './BaseInput'
import useInputStyles from './useInputStyles'

export interface InputCurrencyProps extends InputProps {
  language?: 'es' | 'en'
  prefix?: string
  groupSeparator?: string
  decimalSeparator?: string
  decimalsLimit?: number
  suffix?: string
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
      disabled,
      internalClassName,
      ...otherProps
    }: InputCurrencyProps,
    ref
  ) => {
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const { styles, isLabelScalded, text, isDisabled } = useInputStyles({
      classNameAdornment,
      className,
      boxShadow,
      disabled,
      inputBlank,
      rounded,
      variant,
      focused,
      padding,
      paddingX,
      paddingY,
      large,
      label,
      inputRef
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

    const handleOnChange = useCallback(
      (inputValue, name) => {
        const newValue = Number(inputValue)
        const newMin = Number(min)
        const newMax = Number(max)

        if (newMin && inputValue && newValue < newMin) {
          return
        }
        if (newMax && inputValue && newValue > newMax) {
          return
        }
        const event = {
          target: {
            value: newValue || undefined,
            name
          }
        }
        onChange && onChange(event as any)
      },
      [min, max, onChange]
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
          <div className="w-full relative h-11">
            {label && (
              <FormLabel
                isLabelScalded={isLabelScalded || focused}
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
                internalClassName ??
                  'absolute outline-none w-full font-medium bg-transparent'
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
              onValueChange={handleOnChange}
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
