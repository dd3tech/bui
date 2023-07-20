import { ChangeEvent, useState } from 'react'
import ConfirmDialog, {
  ConfirmDialogAddonsProps
} from 'components/ConfirmDialog/ConfirmDialog'
import Radio from 'components/Radio/Radio'
import RadioGroup from 'components/Radio/RadioGroup'

export interface IRadioItems {
  [key: string]: {
    label?: string
    disabled?: boolean
  }
}

export interface IFilterSelect extends ConfirmDialogAddonsProps {
  /**
   * Title displayed in the ConfirmDialog
   */
  title?: string
  /**
   * Object with the available radio elements to select
   */
  listItems: IRadioItems
  /**
   * The value selected by default
   */
  selectedValue?: string
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
   * @param {string} value
   */
  onApply: (value: string) => void
  /**
   * Callback fired when the reset button is clicked
   */
  onReset?: () => void
}

const FilterSelect = ({
  title,
  listItems,
  selectedValue: defaultValue = '',
  textApplyBtn = 'Apply',
  textResetBtn = 'Reset',
  className,
  width,
  onApply,
  onReset,
  actionContent,
  usePortal
}: IFilterSelect) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const apply = () => onApply(selectedValue)

  const reset = () => {
    setSelectedValue(defaultValue)
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
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {Object.entries(listItems).map(([key, { label, disabled }]) => (
          <Radio
            key={key}
            label={label || key}
            value={key}
            disabled={disabled}
            className="mr-0"
            style={{ marginBottom: '16px', fontWeight: 400, fontSize: 16 }}
          />
        ))}
      </RadioGroup>
    </ConfirmDialog>
  )
}

export default FilterSelect
