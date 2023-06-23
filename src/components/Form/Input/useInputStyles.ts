import { composeClasses } from 'lib/classes'
import { RefObject, useEffect, useState } from 'react'
import { getClassesByPseudoClass } from '../shared'

interface IUseInputStyles {
  classNameAdornment?: string
  className?: string
  boxShadow?: string
  isDisabled?: boolean
  disabled?: boolean
  inputBlank?: boolean
  rounded?: string
  variant: string
  focused?: boolean
  padding?: string
  paddingX?: string
  paddingY?: string
  large?: boolean
  input: {
    borderColor: string
    color?: string | undefined
  }
  label?: string
  inputRef: RefObject<HTMLInputElement>
}

const useInputStyles = ({
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
  label,
  inputRef
}: IUseInputStyles) => {
  const [styles, setStyles] = useState<{
    adornment: string
    container: string
  }>({
    adornment: '',
    container: ''
  })

  const [isLabelScalded, setIsLabelScalded] = useState(
    !label ||
      focused ||
      Boolean(inputRef.current?.defaultValue) ||
      Boolean(inputRef.current?.value)
  )

  useEffect(
    () =>
      setIsLabelScalded(!label || focused || Boolean(inputRef.current?.value)),
    [inputRef.current?.value, label, focused]
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
    input
  ])

  return { styles, isLabelScalded }
}

export default useInputStyles
