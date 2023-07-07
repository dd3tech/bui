import { useCallback, useRef, forwardRef } from 'react'
import CInput from 'react-currency-input-field'
import { unFormatCurrency } from 'dd360-utils'
import { composeClasses } from 'lib/classes'
import { useInputFocused, useLabelScalded } from 'hooks'

import { getPaddingInput, inputIsDisabled } from '../shared'
import { InputProps } from './BaseInput'
import WrapperInput from './WrapperInput'

export interface InputCurrencyProps extends InputProps {
  /**
   * The prefix to be displayed before the input value.
   */
  prefix?: string
  /**
   * Separator between integer part and fractional part of value.
   */
  decimalSeparator?: string
  /**
   * Separator between thousand, million and billion
   * This cannot be a number
   */
  groupSeparator?: string
  /**
   * The maximum number of decimal places allowed in the input value.
   * Default = 2
   */
  decimalsLimit?: number
  /**
   * The suffix to be displayed after the input value.
   */
  suffix?: string
  /**
   * The number of decimal places that will appear after the decimalSeparator prop.
   * Default = 2
   * example: 0.5 -> decimalScale = 2 -> 0.50
   */
  decimalScale?: number
}

const getEvent = (e: React.FocusEvent<HTMLInputElement>, prefix: string) => {
  const newValue = e.target.value.replace(prefix, '')
  const unformatedValue = unFormatCurrency(newValue)
  return {
    ...e,
    target: {
      ...e.target,
      value: (unformatedValue || undefined) as any,
      name: e.target.name
    }
  }
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
      onChange,
      disabled,
      isCell,
      defaultValue,
      decimalScale = 2,
      ...otherProps
    }: InputCurrencyProps,
    ref
  ) => {
    variant = disabled ? 'disabled' : variant
    const isDisabled = inputIsDisabled(variant)
    const inputRef = useRef<HTMLInputElement>(null)

    const { isFocused, handleFocusOff, handleFocusOn } = useInputFocused()
    const { isLabelScalded } = useLabelScalded({
      label: label || '',
      isFocused,
      isFilled:
        Boolean(inputRef.current?.defaultValue) ||
        Boolean(inputRef.current?.value) ||
        Boolean(value?.toLocaleString().length)
    })

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        handleFocusOn()
        const formattedEvent = getEvent(e, prefix)
        onFocus && onFocus(formattedEvent)
      },
      [onFocus, prefix]
    )

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        handleFocusOff()
        const formattedEvent = getEvent(e, prefix)
        onBlur && onBlur(formattedEvent)
      },
      [onBlur, prefix]
    )

    const handleOnChange = useCallback(
      (value, name) => onChange && onChange({ target: { value, name } } as any),
      [value, defaultValue, onChange]
    )

    return (
      <WrapperInput
        ref={ref}
        boxShadow={boxShadow}
        className={className}
        classNameAdornment={classNameAdornment}
        endAdornment={endAdornment}
        isCell={isCell}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isLabelScalded={isLabelScalded}
        isRequired={isRequired}
        label={label}
        large={large}
        message={message}
        padding={padding}
        paddingX={paddingX}
        paddingY={paddingY}
        rounded={rounded}
        startAdornment={startAdornment}
        style={style}
        variant={variant}
      >
        {isCell ? (
          <CInput
            {...otherProps}
            placeholder={placeholder}
            className={className}
            defaultValue={(defaultValue as string) || undefined}
            value={value}
            allowDecimals={true}
            allowNegativeValue={true}
            step={undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            groupSeparator={groupSeparator}
            decimalSeparator={decimalSeparator}
            decimalsLimit={decimalsLimit}
            decimalScale={decimalScale}
            prefix={prefix}
            disabled={isDisabled}
            suffix={suffix}
            onChange={undefined}
            onValueChange={handleOnChange}
          />
        ) : (
          <CInput
            ref={inputRef}
            {...otherProps}
            placeholder={isLabelScalded ? placeholder : ''}
            className={composeClasses(
              'absolute outline-none w-full font-medium bg-transparent'
            )}
            defaultValue={(defaultValue as string) || undefined}
            value={value}
            allowDecimals={true}
            allowNegativeValue={true}
            step={undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            groupSeparator={groupSeparator}
            decimalSeparator={decimalSeparator}
            decimalsLimit={decimalsLimit}
            decimalScale={decimalScale}
            prefix={prefix}
            disabled={isDisabled}
            suffix={suffix}
            style={{
              cursor: 'inherit',
              zIndex: 1,
              ...getPaddingInput(!!label)
            }}
            onChange={undefined}
            onValueChange={handleOnChange}
          />
        )}
      </WrapperInput>
    )
  }
)

export default CurrencyInput
