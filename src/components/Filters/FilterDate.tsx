/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ChangeEvent, useState } from 'react'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import MonthInput from '../Form/Input/MonthInput'
import YearInput from '../Form/Input/YearInput'
import Text from '../Typography/Text'

export interface IFilterDateValue {
  month: string
  year: string
}

export interface FilterDateProps {
  /**
   * Title displayed in the ConfirmDialog
   */
  title?: string
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
   * Texts language
   */
  language?: 'es' | 'en'
  /**
   * Callback fired when the apply button is clicked
   * @param {IFilterDateValue} value
   */
  onApply: (value: IFilterDateValue) => void
  /**
   * Callback fired when the reset button is clicked
   */
  onReset?: () => void
}

const FilterDate = ({
  title,
  textApplyBtn,
  textResetBtn,
  className,
  width,
  language,
  onApply,
  onReset
}: FilterDateProps) => {
  const [date, setDate] = useState({ month: '', year: '' })

  const apply = () => {
    onApply(date)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const reset = () => {
    setDate({ month: '', year: '' })
    onReset && onReset()
  }

  return (
    <ConfirmDialog
      title={title}
      onConfirm={apply}
      onCancel={reset}
      textConfirmBtn={textApplyBtn}
      textCancelBtn={textResetBtn}
      className={className}
      width={width}
    >
      <div>
        <div className="grid pb-2">
          <Text className="mb-1 text-xxs" fontBold="medium">
            {language === 'en' ? 'Month' : 'Mes'}
          </Text>
          <MonthInput
            name="month"
            onChange={handleChange}
            value={date.month}
            padding="1"
            language={language}
          />
        </div>
        <div className="grid pb-2">
          <Text className="mb-1 text-xxs" fontBold="medium">
            {language === 'en' ? 'Year' : 'Año'}
          </Text>
          <YearInput
            name="year"
            onChange={handleChange}
            value={date.year}
            padding="1"
            language={language}
          />
        </div>
      </div>
    </ConfirmDialog>
  )
}

export default FilterDate
