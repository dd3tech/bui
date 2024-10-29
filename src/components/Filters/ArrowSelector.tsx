import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Circle from 'components/Circle'
import { Flex } from 'components/Layout'
import Text from 'components/Typography'

export interface ArrowSelectorProps {
  /** Label to display between the arrows */
  label: string
  /** Function to call when the left arrow is clicked */
  onClickLeft: () => void
  /** Function to call when the right arrow is clicked */
  onClickRight: () => void
}

export const ArrowSelector = ({
  label,
  onClickLeft,
  onClickRight
}: ArrowSelectorProps) => {
  return (
    <Flex
      role="arrow-selector"
      alignItems="center"
      gap="2"
      className="ml-0 md:ml-7 md:mb-0"
    >
      <Circle
        role="arrow-selector-left"
        className="border w-4 cursor-pointer"
        style={{ background: 'white', height: 24, width: 24 }}
        onClick={onClickLeft}
      >
        <ChevronLeftIcon width={10} className="text-blue-700" />
      </Circle>
      <Text
        role="arrow-selector-label"
        size="xs"
        className="font-normal min-w-max text-gray-700"
      >
        {label}
      </Text>
      <Circle
        role="arrow-selector-right"
        className="border w-4 cursor-pointer"
        style={{ background: 'white', height: 24, width: 24 }}
        onClick={onClickRight}
      >
        <ChevronRightIcon width={10} className="text-blue-700" />
      </Circle>
    </Flex>
  )
}

ArrowSelector.displayName = 'ArrowSelector'

export default ArrowSelector
