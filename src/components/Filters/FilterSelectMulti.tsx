import { ChangeEvent, useState } from 'react'
import Checkbox from 'components/Checkbox/Checkbox'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import FormControlLabel from 'components/FormControl/FormControlLabel'

export interface ICheckBoxItems {
  [key: string]: {
    label?: string
    checked?: boolean
    disabled?: boolean
  }
}

export interface FilterSelectMultiProps {
  /**
   * Title displayed in the ConfirmDialog
   */
  title?: string
  /**
   * Object with the available checkboxes elements to select
   */
  initialItemList: ICheckBoxItems
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
   * @param {string[]} value
   */
  onApply: (value: string[]) => void
  /**
   * Callback fired when the reset button is clicked
   */
  onReset?: () => void
}

const FilterSelectMulti = ({
  title,
  initialItemList,
  textApplyBtn = 'Apply',
  textResetBtn = 'Reset',
  position = { show: false, left: 0, top: 0 },
  className,
  width,
  onApply,
  onReset
}: FilterSelectMultiProps) => {
  const [itemList, setItemList] = useState<ICheckBoxItems>(initialItemList)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setItemList({
      ...itemList,
      [name]: {
        ...itemList[name],
        checked
      }
    })
  }

  const apply = () => {
    const results = Object.keys(itemList).filter((key) => itemList[key].checked)
    onApply(results)
  }

  const reset = () => {
    setItemList(initialItemList)
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
      <div role="checkbox-group" className="flex flex-col">
        {Object.entries(itemList).map(([key, { label, checked, disabled }]) => (
          <FormControlLabel
            key={key}
            label={label || key}
            labelPlacement="end"
            disabled={!!disabled}
            control={
              <Checkbox
                name={key}
                onChange={handleChange}
                checked={!!checked}
                padding="p-0 pr-3.5"
              />
            }
            className="m-0 mb-4"
          />
        ))}
      </div>
    </ConfirmDialog>
  )
}

export default FilterSelectMulti
