import { ReactNode, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

import { Flex, Text, Transition } from 'components'
import Badge from 'components/Badge'
import Button from './Button'

interface IButtons extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode
}

interface IFilterBarButton {
  valueBadge: number | null
  iconLeft?: ReactNode
  iconRight?: ReactNode
  label: string
  titlePopover?: string
  childrenPopover?: ReactNode
  classNamePopover?: string
  secondaryButton?: IButtons
  primaryButton?: IButtons
  principalButton?: IButtons
}

const FilterBarButton = ({
  valueBadge,
  iconLeft,
  iconRight,
  label,
  classNamePopover,
  titlePopover,
  childrenPopover,
  secondaryButton,
  primaryButton,
  principalButton
}: IFilterBarButton) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowPopover(!showPopover)
    principalButton?.onClick?.(e)
  }

  return (
    <>
      <Button
        data-testid="filter-bar-button"
        {...principalButton}
        onClick={handleClick}
        variant="secondary"
        className={composeClasses(
          'h-10 px-4 whitespace-nowrap hover:border hover:border-primary hover:text-primary',
          showPopover && 'border border-primary text-primary',
          principalButton?.className
        )}
        style={{
          backgroundColor: showPopover ? '#EFF6FF' : 'transparent',
          ...(principalButton?.style || {})
        }}
      >
        <Flex gap="3" alignItems="center" justifyContent="center">
          {iconLeft && <div>{iconLeft}</div>}
          <Text>{label}</Text>
          {iconRight && <div>{iconRight}</div>}
          {valueBadge && <Badge value={valueBadge} variant="default" />}
        </Flex>
      </Button>

      {showPopover && (
        <Transition className="w-full">
          <div
            className={composeClasses(
              classNamePopover,
              'bg-white border mt-1 rounded-xl shadow-md transition-all duration-200 ease-out opacity-100 translate-y-0 z-50'
            )}
            style={{ width: 468 }}
          >
            <Flex
              className="w-full py-5 px-6 border-b"
              justifyContent="between"
            >
              <Text bold>{titlePopover ?? 'Title'}</Text>
              <XIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => setShowPopover(false)}
              />
            </Flex>
            {childrenPopover}
            <Flex
              className="bg-gray-50 px-6 py-6 border-t rounded-b-2xl"
              justifyContent="end"
              gap="4"
            >
              <Button
                {...secondaryButton}
                className="w-full"
                variant="secondary"
              >
                {secondaryButton?.label ?? 'Button 1'}
              </Button>
              <Button {...primaryButton} className="w-full">
                {primaryButton?.label ?? 'Button 2'}
              </Button>
            </Flex>
          </div>
        </Transition>
      )}
    </>
  )
}

export default FilterBarButton
