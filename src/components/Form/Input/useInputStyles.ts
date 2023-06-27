import { RefObject, useEffect, useState } from 'react'
import { composeClasses } from 'lib/classes'
import {
  getClassesByPseudoClass,
  inputVariants,
  InputVariant as InputVariantType
} from '../shared'

interface UseInputStylesParams {
  classNameAdornment?: string
  className?: string
  boxShadow?: string
  disabled?: boolean
  inputBlank?: boolean
  rounded?: string
  variant: InputVariantType
  focused?: boolean
  padding?: string
  paddingX?: string
  paddingY?: string
  large?: boolean
  label?: string
  inputRef: RefObject<HTMLInputElement>
  value?: string | number | readonly string[]
}

const useInputStyles = ({
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
  inputRef,
  value
}: UseInputStylesParams) => {
  variant = disabled ? 'disabled' : variant
  const isDisabled = variant === 'disabled'
  const { input, text } = inputVariants[variant]

  const [styles, setStyles] = useState<{
    adornment: string
    container: string
  }>({
    adornment: '',
    container: composeClasses(
      'gap-3 placeholder-gray-400 mt-1 flex items-center justify-between bg-transparent font-medium',
      'border-solid border',
      'transition duration-500 ease-out focus:ease-in',
      !isDisabled && `hover:shadow-${boxShadow} hover:border-info`
    )
  })

  const [isLabelScalded, setIsLabelScalded] = useState(
    !label ||
      focused ||
      Boolean(inputRef.current?.defaultValue) ||
      Boolean(inputRef.current?.value) ||
      Boolean(value?.toLocaleString().length)
  )

  useEffect(
    () =>
      setIsLabelScalded(
        !label ||
          focused ||
          Boolean(inputRef.current?.value) ||
          Boolean(value?.toLocaleString().length)
      ),
    [inputRef.current?.value, label, focused, value]
  )

  useEffect(() => {
    setStyles({
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
    })
  }, [
    classNameAdornment,
    className,
    boxShadow,
    isDisabled,
    disabled,
    inputBlank,
    rounded,
    variant,
    focused,
    padding,
    paddingX,
    paddingY,
    large,
    input,
    text,
    isDisabled,
    inputVariants
  ])

  return { styles, isLabelScalded, isDisabled, text }
}

export default useInputStyles
