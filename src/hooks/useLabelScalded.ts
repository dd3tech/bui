import { useEffect, useState } from 'react'

export interface UseLabelScaldedParams {
  label: string
  isFocused: boolean
  isFilled: boolean
}

const useLabelScalded = (params: UseLabelScaldedParams) => {
  const { isFilled, isFocused, label } = params || {}

  const [isLabelScalded, setIsLabelScalded] = useState(
    !label || isFocused || isFilled
  )

  useEffect(() => {
    setIsLabelScalded(!label || isFocused || isFilled)
  }, [label, isFocused, isFilled])

  return { isLabelScalded, setIsLabelScalded }
}

export default useLabelScalded
