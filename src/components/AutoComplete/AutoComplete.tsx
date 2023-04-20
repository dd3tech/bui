import { useEffect, useState, ChangeEvent, useRef } from 'react'
import { composeClasses } from 'lib/classes'

import Divider from '../Divider'
import Text from '../Typography'
import Input, { InputProps } from '../Form/Input'

export type AutocompleteItem = {
  name: string
  id: string | number
}

export interface AutoCompleteProps extends InputProps {
  label?: string
  canFindText?: string
  isLoading?: boolean
  items: Array<Partial<AutocompleteItem>>
  loadingText?: string
  onSelectItem?: (item: Partial<AutocompleteItem>) => void
  value?: string
  removeSelectedItem?: () => void
  role?: string
  isCloseOnBlur?: boolean
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function AutoComplete({
  value,
  onSelectItem,
  role,
  className,
  items,
  isLoading,
  loadingText,
  canFindText,
  onChange,
  removeSelectedItem,
  isCloseOnBlur,
  disabled,
  label,
  ...otherProps
}: AutoCompleteProps) {
  const [isActiveAutoComplete, setIsActiveAutoComplete] = useState(false)
  const [itemName, setItemName] = useState(value || '')

  const timer = useRef<null | NodeJS.Timeout>()

  const onBlur = () => {
    if (!isCloseOnBlur) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setIsActiveAutoComplete(false), 300)
  }

  const onFocus = () => {
    if (isCloseOnBlur && value && value.length && items.length) {
      setIsActiveAutoComplete(true)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value)
    onChange && onChange(event)
    if (!isActiveAutoComplete) {
      setIsActiveAutoComplete(true)
    }
  }

  const handleSelectedItem = (item: AutocompleteItem) => {
    onSelectItem && onSelectItem(item)
    setItemName(item.name)
    setIsActiveAutoComplete(false)
  }

  useEffect(() => {
    if (itemName?.length === 0) {
      setIsActiveAutoComplete(false)
      if (removeSelectedItem) {
        removeSelectedItem()
      }
    }
  }, [itemName])

  return (
    <div className="grid">
      <Input
        {...otherProps}
        label={label}
        role={role || 'autocomplete'}
        className={composeClasses(
          disabled && 'opacity-30 bg-gray-100',
          className
        )}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={itemName}
        disabled={disabled}
      />
      <div
        role="panel"
        className={composeClasses(
          'transition duration-500 ease-out relative z-10',
          !isActiveAutoComplete && 'hidden'
        )}
      >
        <div
          data-testid="container"
          style={{ minHeight: '16px', maxHeight: '265px' }}
          className="border w-full rounded-xl shadow-lg mb-2 p-2 mt-0.5 block absolute float py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto h-auto"
        >
          {isLoading && (
            <div
              role="loader"
              className="flex items-center justify-between h-10 p-2 mt-1 cursor-pointer"
            >
              <Text variant="small" className="text-primary" bold>
                {loadingText ?? 'Loading...'}
              </Text>
            </div>
          )}

          {!isLoading && items?.length > 0 && (
            <ul role="list">
              {items.map((item, key) => (
                <li
                  className="block"
                  role="row"
                  onClick={() => handleSelectedItem(item as AutocompleteItem)}
                  key={item.id || key}
                >
                  <div className="flex items-center justify-between h-10 p-2 mt-1 cursor-pointer">
                    <Text variant="p" className="font-semibold">
                      {item?.name}
                    </Text>
                  </div>
                  <Divider />
                </li>
              ))}
            </ul>
          )}

          {!isLoading && items.length === 0 && (
            <div
              role="dialog"
              className="flex items-center justify-between h-10 p-2 mt-1 cursor-pointer"
            >
              <Text variant="small" className="text-red-700" bold>
                {canFindText ?? 'no matches'}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
