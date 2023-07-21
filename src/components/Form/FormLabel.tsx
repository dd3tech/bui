/*
 * Copyright (c) DD360 and its affiliates.
 */

import { composeClasses } from 'lib/classes'
import { getAnimationLabel } from './shared'

interface FormLabelProps {
  isLabelScalded: boolean
  isDisabled: boolean
  label: string
  isRequired?: boolean
}

const FormLabel = ({
  isLabelScalded,
  isDisabled,
  isRequired,
  label
}: FormLabelProps) => {
  return (
    <label
      style={{
        cursor: 'inherit',
        zIndex: 1,
        ...getAnimationLabel(isLabelScalded)
      }}
      className="absolute w-full block text-xs font-medium leading-none text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
    >
      <span
        className={composeClasses(!isDisabled ? 'text-info' : 'text-gray-400')}
      >
        {label}
      </span>
      {isRequired && <span className="text-red-600 absolute">*</span>}
    </label>
  )
}

export default FormLabel
