/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ChangeEvent, useState } from 'react'
import Input from 'components/Form/Input'
import { Flex } from 'components/Layout'
import ComboSelect from 'components/Form/ComboSelect'

export interface IRange {
  minVal?: number
  maxVal?: number
}

export interface FilterRangeProps {
  /**
   * Title displayed in the ConfirmDialog
   */
  title?: string
  /**
   * Text displayed as unit of ranges
   */
  labelInput?: string
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
  defaultMin?: number
  /**
   * Maximum value by default in the input
   */
  defaultMax?: number
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
  onApply: (range: IRange) => void
  /**
   * Callback fired when the reset button is clicked
   */
  onReset?: () => void
}

const FilterRange = ({
  title,
  min = 0,
  max = 999999999,
  labelInput = 'MXN',
  defaultMin,
  defaultMax,
  textApplyBtn = 'Apply',
  textResetBtn = 'Reset',
  className,
  width,
  onApply,
  onReset
}: FilterRangeProps) => {
  const [range, setRange] = useState<IRange>({
    minVal: defaultMin,
    maxVal: defaultMax
  })

  const [inputMinVariant, setInputMinVariant] = useState<'active' | 'error'>(
    'active'
  )
  const [inputMaxVariant, setInputMaxVariant] = useState<'active' | 'error'>(
    'active'
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRange({
      ...range,
      [event.target.name]: Number(event.target.value)
    })
  }

  const apply = () => {
    setInputMinVariant('active')
    setInputMaxVariant('active')

    if (!range.minVal || (min && range.minVal && range.minVal < min)) {
      setInputMinVariant('error')
      return
    }
    if (!range.maxVal || (max && range.maxVal && range.maxVal > max)) {
      setInputMaxVariant('error')
      return
    }
    if (range.maxVal && range.minVal && range.maxVal < range.minVal) {
      setInputMinVariant('error')
      setInputMaxVariant('error')
      return
    }
    onApply(range)
  }

  const reset = () => {
    setRange({ minVal: defaultMin, maxVal: defaultMax })
    onReset && onReset()
  }

  return (
    <ComboSelect
      label={title || ''}
      className={className}
      submitText={textApplyBtn}
      clearText={textResetBtn}
      hideDivider
      onSubmit={apply}
      onClear={reset}
      style={{ width }}
    >
      <Flex className="mb-3 w-full" justifyContent="center" alignItems="center">
        <div className="grid">
          <Input
            data-testid="minVal"
            name="minVal"
            type="number"
            placeholder={min?.toString()}
            className="h-7 w-32 pl-4 text-xs bg-white"
            style={{ height: 40 }}
            min={min}
            value={range.minVal || ''}
            onChange={handleChange}
            variant={inputMinVariant}
            endAdornment={
              inputMinVariant !== 'error' && (
                <Flex
                  alignItems="center"
                  className="h-10 pl-4 border-l border-solid border-gray-300 text-gray-500"
                >
                  {labelInput}
                </Flex>
              )
            }
          />
        </div>
        <hr
          className="w-2.5 mx-3.5 border-gray-900"
          style={{ minWidth: 12, borderTopWidth: 1.2 }}
        />
        <div className="grid">
          <Input
            data-testid="maxVal"
            name="maxVal"
            type="number"
            placeholder={max?.toString()}
            className="h-7 w-32 text-xs bg-white"
            style={{ height: 40 }}
            max={max}
            value={range.maxVal || ''}
            onChange={handleChange}
            variant={inputMaxVariant}
            endAdornment={
              inputMaxVariant !== 'error' && (
                <Flex
                  alignItems="center"
                  className="h-10 pl-4 border-l border-solid border-gray-300 text-gray-500"
                >
                  {labelInput}
                </Flex>
              )
            }
          />
        </div>
      </Flex>
    </ComboSelect>
  )
}

export default FilterRange
