/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  InputHTMLAttributes,
  useRef,
  forwardRef,
  ReactNode,
  useCallback
} from 'react'
import { composeClasses } from 'lib/classes'
import { useLabelScalded, useInputFocused } from 'hooks'
import { Padding, Rounded, ShadowVariants } from '../../../interfaces/types'
import {
  InputVariant as InputVariantType,
  InputType,
  getPaddingInput,
  inputIsDisabled
} from '../shared'
import WrapperInput from './WrapperInput'

export interface SharedInputProps {
  boxShadow?: ShadowVariants
  /**
   * Additional CSS class for the input adornment.
   */
  classNameAdornment?: string
  /**
   * Element to be displayed as an adornment at the end of the input.
   */
  endAdornment?: ReactNode
  /**
   * Indicates if the input is used within a cell of a table or similar structure.
   */
  isCell?: boolean
  /**
   * Indicates if the input is required.
   */
  isRequired?: boolean
  /**
   * Label that describes the purpose of the input.
   */
  label?: string
  /**
   * Indicates if the input is large in size.
   */
  large?: boolean
  /**
   * Help message or additional information for the input.
   */
  message?: string
  /**
   * Inner padding of the input.
   */
  padding?: Padding
  /**
   * Horizontal padding of the input.
   */
  paddingX?: Padding
  /**
   * Vertical padding of the input.
   */
  paddingY?: Padding
  /**
   * Rounded border style of the input.
   */
  rounded?: Rounded
  /**
   * Element to be displayed as an adornment at the beginning of the input.
   */
  startAdornment?: ReactNode
  /**
   * Indicates if the input is disabled.
   */
  isDisabled?: boolean
  /**
   * Indicates if the input is a calendar.
   */
  isCalendar?: boolean
}

export interface InputProps
  extends SharedInputProps,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * The type of input element.
   */
  type?: InputType
  /**
   * The variant of the input component.
   */
  variant?: InputVariantType
  /**
   * The language of the input component.
   * It can be either 'es' for Spanish or 'en' for English.
   */
  language?: 'es' | 'en'
  /**
   * The maximum number of decimal places allowed in the input value.
   * Default = 2
   */
  decimalsLimit?: number
  /**
   * An optional CSS class to apply to the date picker component.
   * This allows for customization of the component's appearance through external styles.
   */
  classNameInputDatePicker?: string
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
      onFocus,
      onBlur,
      large,
      boxShadow = 'lg',
      style,
      placeholder,
      value,
      isRequired,
      disabled,
      isCell,
      isCalendar = false,
      ...otherProps
    }: InputProps,
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
      (event: React.FocusEvent<HTMLInputElement>) => {
        handleFocusOn()
        onFocus && onFocus(event)
      },
      [onFocus]
    )

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        handleFocusOff()
        onBlur && onBlur(event)
      },
      [onBlur]
    )

    return (
      <WrapperInput
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
        ref={ref}
        rounded={rounded}
        startAdornment={startAdornment}
        style={style}
        variant={variant}
        isCalendar={isCalendar}
      >
        {isCell ? (
          <input
            {...otherProps}
            placeholder={placeholder}
            className={className}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
            value={value}
          />
        ) : (
          <input
            ref={inputRef}
            {...otherProps}
            placeholder={isLabelScalded ? placeholder : ''}
            className={composeClasses(
              'outline-none w-full h-full font-medium bg-transparent absolute left-0 right-0'
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
            value={value}
            style={{
              cursor: 'inherit',
              zIndex: 1,
              ...getPaddingInput(!!label)
            }}
          />
        )}
      </WrapperInput>
    )
  }
)

export default BaseInput
