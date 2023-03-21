import { useCallback, useState } from 'react'
import MultiRangeSlider, {
  IRangeSlider
} from '../MultiRangeSlider/MultiRangeSlider'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import Text from '../Typography/Text'

export interface FilterRangeSliderProps {
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
   * The position in which the ConfirmDialog will be displayed
   */
  position?: { show: boolean; left: number; top: number }
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
  onApply: (range: IRangeSlider) => void
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
  position = { show: false, left: 0, top: 0 },
  className,
  width,
  onApply,
  onReset
}: FilterRangeSliderProps) => {
  const initValue = { min: initMinValue ?? min, max: initMaxValue ?? max }
  const [range, setRange] = useState<IRangeSlider>(initValue)
  const [fireReset, setFireReset] = useState<boolean>(false)
  const handleChange = useCallback((value: IRangeSlider) => setRange(value), [])

  const apply = () => {
    onApply(range)
  }

  const reset = () => {
    setFireReset((prev) => !prev)
    onReset && onReset()
  }

  return (
    <ConfirmDialog
      title={title}
      onConfirm={apply}
      onCancel={reset}
      textConfirmBtn={textApplyBtn}
      textCancelBtn={textResetBtn}
      position={position}
      className={className}
      width={width}
    >
      <div>
        <Text size="base" bold>
          {range.min}
          {unitName} - {range.max}
          {unitName}
        </Text>
        <MultiRangeSlider
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
