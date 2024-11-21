import { useCallback, useState } from 'react'
import { composeClasses } from 'lib/classes'
import FilterInput from './FilterInput'
import { FilterRangeSlider } from 'components/Filters'

export interface DropdownRangeSliderProps {
  /** Maximum value for the range */
  max: number
  /** Minimum value for the range */
  min: number
  /** Initial maximum value */
  initMaxValue?: number
  /** Initial minimum value */
  initMinValue?: number
  /** Text for the cancel button */
  cancelText: string
  /** Unit name to display next to the values */
  unitName?: string
  /** Text for the confirm button */
  confirmText: string
  /** Function to call when the form is submitted */
  onSubmit: (value: RangeValues) => void
  /** Function to call when the dropdown is closed */
  onClose?: () => void
  /** Title of the dropdown */
  title?: string
  /** Alignment of the dropdown */
  align?: 'left' | 'right'

  label?: string

  className?: string
}

type RangeValues = { max: number; min: number }

export const DropdownRangeSlider = ({
  max,
  min,
  initMaxValue,
  initMinValue,
  unitName = '',
  cancelText,
  confirmText,
  onSubmit,
  onClose,
  title,
  align = 'left',
  label,
  className
}: DropdownRangeSliderProps) => {
  const initialState = {
    max: initMaxValue || max,
    min: initMinValue || min
  }
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<RangeValues>(initialState)

  const handleSubmit = useCallback(
    (newValue: RangeValues) => {
      onSubmit(newValue)
      setIsActive(false)
      setSelected(newValue)
    },
    [onSubmit]
  )

  const handleClose = useCallback(() => {
    setIsActive(false)
    onClose && onClose()
  }, [onClose])

  return (
    <div
      role="dropdown-range-slider"
      className={composeClasses('relative', className)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <FilterInput
        isActive={isActive}
        setIsActive={setIsActive}
        label={label ?? 'Filter by'}
        value={`${selected.min}-${selected.max} ${unitName}`}
        variant="primary"
      />
      {isActive && (
        <FilterRangeSlider
          className={composeClasses(
            'top-10 z-10',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          title={title}
          max={max}
          min={min}
          onApply={handleSubmit}
          onReset={handleClose}
          initMaxValue={initMaxValue || selected.max}
          initMinValue={initMinValue || selected.min}
          textApplyBtn={confirmText}
          textResetBtn={cancelText}
          unitName={unitName}
        />
      )}
    </div>
  )
}

DropdownRangeSlider.displayName = 'DropdownRangeSlider'

export default DropdownRangeSlider
