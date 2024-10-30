import { useCallback, useState } from 'react'
import { composeClasses } from 'lib/classes'
import FilterInput from './FilterInput'
import { FilterRange } from 'components/Filters'

export interface DropdownRangeProps {
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
}

type RangeValues = { maxVal: number; minVal: number }

export const DropdownRange = ({
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
  align = 'left'
}: DropdownRangeProps) => {
  const initialState = {
    maxVal: initMaxValue || max,
    minVal: initMinValue || min
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
      role="dropdown-range"
      className="relative"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <FilterInput
        isActive={isActive}
        setIsActive={setIsActive}
        label="Filter by"
        value={`${selected.minVal}-${selected.maxVal} ${unitName}`}
        variant="primary"
      />
      {isActive && (
        <FilterRange
          className={composeClasses(
            'top-10 z-10',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          title={title}
          max={max}
          min={min}
          defaultMax={initMaxValue || selected.maxVal}
          defaultMin={initMinValue || selected.minVal}
          onApply={handleSubmit}
          onReset={handleClose}
          textApplyBtn={confirmText}
          textResetBtn={cancelText}
        />
      )}
    </div>
  )
}

DropdownRange.displayName = 'DropdownRange'

export default DropdownRange
