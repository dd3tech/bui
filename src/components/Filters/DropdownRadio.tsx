import { useCallback, useState } from 'react'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'
import ConfirmDialog from 'components/ConfirmDialog'
import Text from 'components/Typography'
import FilterInput from './FilterInput'

export interface DropdownRadioProps {
  /** Text for the cancel button */
  cancelText: string
  /** Text for the confirm button */
  confirmText: string
  /** Initial selected value */
  initialValue?: string
  /** Options to display in the dropdown */
  options: { label: string; value: string }[]
  /** Function to call when the form is submitted */
  onSubmit: (value: string) => void
  /** Function to call when the dropdown is closed */
  onClose?: () => void
  /** Title of the dropdown */
  title?: string
  /** Alignment of the dropdown */
  align?: 'left' | 'right'
  /** Label for the dropdown trigger */
  label?: string
  /** Additional CSS classes for custom styling */
  className?: string
}

export const DropdownRadio = ({
  cancelText,
  confirmText,
  initialValue,
  options,
  onSubmit,
  onClose,
  title,
  align = 'left',
  label,
  className
}: DropdownRadioProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(
    initialValue || options[0].value
  )
  const [value, setValue] = useState<string>(initialValue || options[0].value)

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  const handleSubmit = useCallback(
    (newValue: string) => {
      onSubmit(newValue)
      setIsActive(false)
      setSelected(newValue)
    },
    [onSubmit]
  )

  const handleClose = useCallback(() => {
    setIsActive(false)
    setValue(selected)
    onClose && onClose()
  }, [onClose, selected])

  return (
    <div
      role="dropdown-radio"
      className={composeClasses('relative', className)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <FilterInput
        isActive={isActive}
        setIsActive={setIsActive}
        label={label ?? 'Filter by'}
        value={selected}
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
          <div onClick={(e) => e.stopPropagation()} role="container-popover">
            {options.map((option) => (
              <Flex
                key={`filter-radio-${option.value}`}
                justifyContent="start"
                alignItems="center"
                onClick={() => handleChange(option.value)}
                className="px-1 min-w-7 h-6 rounded-full cursor-pointer"
              >
                <Text
                  variant="label"
                  size="xs"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    name="popover-radio"
                    type="radio"
                    onChange={() => handleChange(option.value)}
                    className="mr-2 cursor-pointer"
                    checked={value === option.value}
                  />
                  {option.label}
                </Text>
              </Flex>
            ))}
          </div>
        </ConfirmDialog>
      )}
    </div>
  )
}

export default DropdownRadio
