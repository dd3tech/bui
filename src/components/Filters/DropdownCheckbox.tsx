import { ChangeEvent, useState } from 'react'
import { composeClasses } from 'lib/classes'
import ConfirmDialog from 'components/ConfirmDialog'
import { Flex } from 'components/Layout'
import FilterInput from './FilterInput'

export interface DropdownCheckboxProps {
  /** Text for the cancel button */
  cancelText: string
  /** Text for the confirm button */
  confirmText: string
  /** Text for the "select all" option */
  allText?: string
  /** Initial selected values */
  initialValue?: string[]
  /** Options to display in the dropdown */
  options: { label: string; value: string }[]
  /** Function to call when the form is submitted */
  onSubmit: (value: string[]) => void
  /** Function to call when the dropdown is closed */
  onClose?: () => void
  /** Title of the dropdown */
  title?: string
  /** Alignment of the dropdown */
  align?: 'left' | 'right'
}

export const DropdownCheckbox = ({
  cancelText,
  confirmText,
  allText,
  initialValue,
  options,
  onSubmit,
  onClose,
  title,
  align = 'left'
}: DropdownCheckboxProps) => {
  const initialState = initialValue || options?.map((item) => item.value)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selected, setSelected] = useState(initialState)
  const [value, setValue] = useState<string[]>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setValue((prev) =>
      name === 'all'
        ? checked
          ? options.map((item) => item.value)
          : []
        : checked
        ? [...prev, name]
        : prev.filter((item) => item !== name)
    )
  }

  const handleSubmit = (newValue: string[]) => {
    onSubmit(newValue)
    setIsActive(false)
    setSelected(newValue)
  }

  const handleClose = () => {
    setIsActive(false)
    setValue(selected)
    onClose && onClose()
  }

  const isAllSelected = value.length === options.length

  return (
    <div
      role="dropdown-checkbox"
      className="relative"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <FilterInput
        isActive={isActive}
        setIsActive={setIsActive}
        label="Filter by"
        value={selected.join(', ')}
        variant="primary"
      />
      {isActive && (
        <ConfirmDialog
          className={composeClasses(
            'top-10 z-10',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          onCancel={handleClose}
          textCancelBtn={cancelText}
          textConfirmBtn={confirmText}
          title={title}
          onConfirm={() => {
            if (value?.length > 0) return handleSubmit(value)
          }}
        >
          <div role="container-popover">
            <Flex
              alignItems="center"
              className="w-full text-right mt-2 mb-2 pb-1.5 border-b-2"
            >
              <input
                role="option-all"
                type="checkbox"
                name="all"
                id="all"
                onChange={(e) => handleChange(e)}
                checked={isAllSelected}
                className="cursor-pointer"
              />
              <label className="mr-4 ml-4 text-xs cursor-pointer" htmlFor="all">
                {allText || 'All'}
              </label>
            </Flex>
            {options?.map((item, index) => (
              <Flex
                key={`${item}-${index}`}
                alignItems="center"
                className="w-full text-right mb-2"
              >
                <input
                  role={`option-${item}`}
                  type="checkbox"
                  name={item.value}
                  id={item.value}
                  onChange={(e) => handleChange(e)}
                  checked={value?.includes(item.value) || isAllSelected}
                  className="cursor-pointer"
                />
                <label
                  role="option-popover"
                  className="mr-4 ml-4 text-xs cursor-pointer"
                  htmlFor={item.value}
                >
                  {item.label}
                </label>
              </Flex>
            ))}
          </div>
        </ConfirmDialog>
      )}
    </div>
  )
}

DropdownCheckbox.displayName = 'DropdownCheckbox'

export default DropdownCheckbox
