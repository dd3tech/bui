import { CSSProperties, Dispatch, SetStateAction, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Input from 'components/Form'
import { Flex } from 'components/Layout'
import Transition from 'components/Transition'
import Text from 'components/Typography'

const inputStyle = {
  container: {
    primary:
      'relative w-full md:w-56 xl:w-44 2xl:w-56 h-10 bg-white rounded-lg cursor-pointer',
    secondary:
      'relative w-full md:w-36 h-7 bg-white rounded-full border cursor-pointer'
  },
  input: {
    primary: 'w-full pr-6 text-sm text-gray-900 z-10',
    secondary:
      'w-full pr-6 border-none text-sm text-gray-900 z-10 pointer-events-none'
  }
}

export interface FilterInputProps {
  /** Label to display for the input */
  label: string
  /** Secondary label to display for the input */
  secondaryLabel?: string
  /** Value of the input */
  value: string
  /** Variant of the input, either 'primary' or 'secondary' */
  variant?: 'primary' | 'secondary'
  /** Whether the input is disabled */
  disabled?: boolean
  /** Width of the input */
  width?: string
  /** Additional styles to apply to the input */
  style?: CSSProperties
  /** Whether the input is active */
  isActive: boolean
  /** Function to set the active state of the input */
  setIsActive: Dispatch<SetStateAction<boolean>>
}

export const FilterInput = ({
  label,
  secondaryLabel,
  value,
  variant = 'primary',
  disabled,
  style,
  width = 'auto',
  isActive,
  setIsActive
}: FilterInputProps) => {
  const handleClick = () => {
    if (disabled) return
    setIsActive(!isActive)
  }

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[role="filter-input"]')) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', closeDropdown)

    return () => {
      document.removeEventListener('mousedown', closeDropdown)
    }
  }, [])

  return (
    <Flex
      role="filter-input"
      justifyContent="between"
      alignItems="center"
      className={composeClasses(
        disabled && 'bg-gray-100',
        inputStyle.container[variant]
      )}
      style={{ ...style, minWidth: width }}
      onClick={() => {
        !disabled && handleClick()
      }}
    >
      <Input
        role="filter-input-value"
        label={variant === 'primary' ? label : ''}
        value={variant === 'primary' ? value : label}
        readOnly
        style={{
          height: '40px',
          marginTop: '0px',
          backgroundColor: 'transparent',
          minWidth: width
        }}
        className={composeClasses(
          inputStyle.input[variant],
          isActive && 'border-blue-500'
        )}
        disabled={disabled}
      />
      <Flex
        role="filter-input-icon"
        alignItems="center"
        justifyContent="center"
        className="px-2 h-full absolute right-0 top-0"
      >
        {variant === 'secondary' && secondaryLabel && (
          <Flex
            alignItems="center"
            justifyContent="center"
            className="w-4 h-4 rounded-full bg-blue-700 text-white"
          >
            <Text style={{ fontSize: '10px' }}>{secondaryLabel}</Text>
          </Flex>
        )}
        <Transition
          show={isActive}
          animationStart="rotateRight"
          animationEnd="rotateRightBack"
          duration={150}
          alwaysRender
        >
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </Transition>
      </Flex>
    </Flex>
  )
}

export default FilterInput
