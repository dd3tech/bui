/*
 * Copyright (c) DD360 and its affiliates.
 */

import { CSSProperties, ForwardedRef, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import XCircleIcon from '@heroicons/react/outline/XCircleIcon'
import InformationCircleIcon from '@heroicons/react/outline/InformationCircleIcon'

import {
  InputVariant as InputVariantType,
  inputVariants,
  getClassesByPseudoClass
} from '../shared'
import FormLabel from '../FormLabel'
import { SharedInputProps } from './BaseInput'

export interface WrapperInputProps extends SharedInputProps {
  isFocused: boolean
  isLabelScalded: boolean
  ref?: ForwardedRef<HTMLDivElement>
  style?: CSSProperties
  variant: InputVariantType
  className?: string
  children?: ReactNode
}

const WrapperInput = (props: WrapperInputProps) => {
  const {
    boxShadow,
    children,
    className,
    classNameAdornment,
    endAdornment,
    isCell,
    isDisabled,
    isFocused,
    isLabelScalded,
    isRequired,
    label,
    large,
    message,
    padding,
    paddingX,
    paddingY,
    ref,
    rounded,
    startAdornment,
    style,
    variant,
    isCalendar
  } = props

  const { input, text, bgIcon } = inputVariants[variant]
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
      className && isDisabled && getClassesByPseudoClass(className, 'disabled'),
      rounded && `rounded-${rounded}`,
      !['error', 'success', 'warning'].includes(variant) &&
        isFocused &&
        'border-blue-500',
      isDisabled && !isCalendar && !isCell
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
        <div className="w-full relative h-11 flex items-center">
          {label && (
            <FormLabel
              isLabelScalded={isLabelScalded || isFocused}
              isDisabled={isDisabled as boolean}
              isRequired={isRequired}
              label={label}
            />
          )}
          {children}
        </div>
        {endAdornment && (
          <div data-testid="endAdornment" className={styles.adornment}>
            {endAdornment}
          </div>
        )}
        {['warning', 'error', 'success'].includes(variant) && (
          <div
            className={composeClasses(
              'flex justify-center items-center rounded-xl bg-red-50 text-error',
              text.color,
              bgIcon?.color
            )}
            style={{
              marginLeft: 11,
              marginRight: -10,
              minWidth: 36,
              minHeight: 36
            }}
            role="defaultIcon"
          >
            {variant === 'success' && (
              <CheckCircleIcon aria-label="check" width={24} />
            )}
            {variant === 'warning' && (
              <InformationCircleIcon aria-label="warning" width={24} />
            )}
            {variant === 'error' && (
              <XCircleIcon aria-label="error" width={24} />
            )}
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

export default WrapperInput
