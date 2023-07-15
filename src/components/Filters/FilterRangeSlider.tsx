import { useCallback, useState } from 'react'
import RangeSlider, { RangeValues } from '../RangeSlider/RangeSlider'
import ConfirmDialog, {
  ConfirmDialogAddonsProps
} from '../ConfirmDialog/ConfirmDialog'
import Text from '../Typography/Text'

export interface FilterRangeSliderProps extends ConfirmDialogAddonsProps {
  /**
   * Title displayed in the ConfirmDialog
   */
  title?: string
  /**
   * Text displayed as unit of ranges
   */
  unitName?: string
  /**
   * Minimum number allowed
   */
  min?: number
  /**
   * Maximum number allowed
   */
  max?: number
  /**
   * Minimum value by default in the input
   */
  initMinValue?: number
  /**
   * Maximum value by default in the input
   */
  initMaxValue?: number
  /**
   * Indicates if the minimum value input is disabled.
   */
  minValDisabled?: boolean
  /**
   * Indicates if the maximum value input is disabled
   */
  maxValDisabled?: boolean
  /**
   * Text displayed on the button to apply
   */
  textApplyBtn?: string
  /**
   * Text displayed on the button to reset
   */
  textResetBtn?: string
  /**
   * The class name to apply to the ConfirmDialog
   */
  className?: string
  /**
   * The width of the ConfirmDialog
   */
  width?: number | string
  /**
   * Callback fired when the apply button is clicked
   * @param {IRange} range
   */
  onApply: (range: RangeValues) => void
  /**
   * Callback fired when the reset button is clicked
   */
  onReset?: () => void
}

const FilterRangeSlider = ({
  title,
  min = 0,
  max = 999999999,
  initMinValue,
  initMaxValue,
  minValDisabled,
  maxValDisabled,
  unitName = 'Km',
  textApplyBtn = 'Apply',
  textResetBtn = 'Reset',
  className,
  width,
  onApply,
  onReset,
  actionContent,
  usePortal
}: FilterRangeSliderProps) => {
  const initValue = { min: initMinValue ?? min, max: initMaxValue ?? max }
  const [range, setRange] = useState<RangeValues>(initValue)
  const [fireReset, setFireReset] = useState<boolean>(false)
  const handleChange = useCallback((value: RangeValues) => setRange(value), [])

  const apply = () => {
    onApply(range)
  }

  const reset = () => {
    setFireReset((prev) => !prev)
    onReset && onReset()
  }

  return (
    <ConfirmDialog
      actionContent={actionContent}
      usePortal={usePortal}
      title={title}
      handleConfirm={apply}
      handleCancel={reset}
      textConfirmBtn={textApplyBtn}
      textCancelBtn={textResetBtn}
      className={className}
      width={width}
      preventCloseHandleCancel
    >
      <div>
        <Text size="base" bold>
          {range.min}
          {unitName} - {range.max}
          {unitName}
        </Text>
        <RangeSlider
          multi
          max={max}
          min={min}
          initMinValue={initValue.min}
          initMaxValue={initValue.max}
          minValDisabled={minValDisabled}
          maxValDisabled={maxValDisabled}
          onChange={handleChange}
          fireReset={fireReset}
          className="pt-2.5 pb-4"
        />
      </div>
    </ConfirmDialog>
  )
}

export default FilterRangeSlider
