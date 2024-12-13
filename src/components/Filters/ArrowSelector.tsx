import { useCallback } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Circle from 'components/Circle'
import { Flex } from 'components/Layout'
import Text from 'components/Typography'
import { composeClasses } from 'lib/classes'
import './arrowSelector.css'

export interface ArrowSelectorProps {
  /** Label to display between the arrows */
  label: string
  /** Function to call when the left arrow is clicked */
  onClickLeft: () => void
  /** Function to call when the right arrow is clicked */
  onClickRight: () => void
  /** Toggle options configuration */
  toggleOptions?: {
    /** Text to display for the first toggle option */
    firstOption: string
    /** Text to display for the second toggle option */
    secondOption: string
    /** Callback function triggered when the user selects an option */
    onOptionChange?: (option: string) => void
    /** Currently selected option to control the toggle state externally */
    optionSelected?: string
  }
}

export const ArrowSelector = ({
  label,
  onClickLeft,
  onClickRight,
  toggleOptions
}: ArrowSelectorProps) => {
  const handleOptionClick = useCallback(
    (option: string) => {
      if (!toggleOptions?.onOptionChange) return
      toggleOptions?.onOptionChange(option)
    },
    [toggleOptions]
  )

  return (
    <Flex
      role="arrow-selector"
      alignItems="center"
      gap="2"
      className="ml-0 md:ml-7 md:mb-0"
    >
      <Circle
        role="arrow-selector-left"
        className="border w-4 bg-white hover:bg-blue-50 cursor-pointer transition duration-300 ease-linear"
        style={{ height: 24, width: 24 }}
        onClick={onClickLeft}
      >
        <ChevronLeftIcon width={10} className="text-blue-700" />
      </Circle>
      <Flex alignItems="center" gap="2">
        <Text
          role="arrow-selector-label"
          size="xs"
          className="font-normal min-w-max text-gray-700"
        >
          {label}
        </Text>
        {toggleOptions && (
          <Flex
            alignItems="center"
            gap="2"
            className="relative bg-white border rounded-full"
            style={{ position: 'relative', padding: '2px' }}
          >
            <div
              className="absolute bg-blue-600 rounded-full transition-all"
              style={{
                width: '50%',
                height: '100%',
                top: 0,
                left:
                  toggleOptions.optionSelected === toggleOptions.firstOption
                    ? '0%'
                    : '50%',
                transform: 'translateX(0)'
              }}
            ></div>
            <div
              className={composeClasses(
                toggleOptions.optionSelected === toggleOptions.firstOption
                  ? 'text-white'
                  : 'text-gray-500',
                'relative rounded-full px-2 cursor-pointer'
              )}
              onClick={() => handleOptionClick(toggleOptions.firstOption)}
            >
              <Text size="xs">{toggleOptions.firstOption}</Text>
            </div>
            <div
              className={composeClasses(
                toggleOptions.optionSelected === toggleOptions.secondOption
                  ? 'text-white'
                  : 'text-gray-500',
                'relative rounded-full px-2 cursor-pointer'
              )}
              onClick={() => handleOptionClick(toggleOptions.secondOption)}
            >
              <Text size="xs">{toggleOptions.secondOption}</Text>
            </div>
          </Flex>
        )}
      </Flex>
      <Circle
        role="arrow-selector-right"
        className="border w-4 bg-white hover:bg-blue-50 cursor-pointer transition duration-300 ease-linear"
        style={{ height: 24, width: 24 }}
        onClick={onClickRight}
      >
        <ChevronRightIcon width={10} className="text-blue-700" />
      </Circle>
    </Flex>
  )
}

ArrowSelector.displayName = 'ArrowSelector'

export default ArrowSelector
