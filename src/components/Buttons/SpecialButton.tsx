import { ReactNode, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

import { Flex, Text, Transition } from 'components'
import Badge from 'components/Badge'
import Button from './Button'

interface IIconSpecialButton {
  icon: ReactNode
  onClick: () => void
}

interface IButtons extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode
}

interface ISpecialButton {
  valueBadge: number | null
  iconLeft?: IIconSpecialButton
  iconRight?: IIconSpecialButton
  label: string
  titlePopover?: string
  childrenPopover?: ReactNode
  classNamePopover?: string
  secondaryButton?: IButtons
  primaryButton?: IButtons
  principalButton?: IButtons
}

const SpecialButton = ({
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
}: ISpecialButton) => {
  const [isPressed, setIsPressed] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(!isPressed)
    setShowPopover(!showPopover)
    principalButton?.onClick?.(e)
  }

  return (
    <>
      <Button
        data-testid="special-button"
        {...principalButton}
        onClick={handleClick}
        variant="secondary"
        className={composeClasses(
          'h-10 px-4 whitespace-nowrap hover:border hover:border-primary hover:text-primary',
          isPressed && 'border border-primary text-primary',
          principalButton?.className
        )}
        style={{
          backgroundColor: isPressed ? '#EFF6FF' : 'transparent',
          ...(principalButton?.style || {})
        }}
      >
        <Flex gap="3" alignItems="center" justifyContent="center">
          {iconLeft && (
            <div
              onClick={(e) => {
                e.stopPropagation()
                iconLeft.onClick()
              }}
            >
              {iconLeft.icon}
            </div>
          )}
          <Text>{label}</Text>
          {iconRight && (
            <div
              onClick={(e) => {
                e.stopPropagation()
                iconRight.onClick()
              }}
            >
              {iconRight.icon}
            </div>
          )}
          {valueBadge && <Badge value={valueBadge} variant="default" />}
        </Flex>
      </Button>

      {showPopover && (
        <Transition className="w-full">
          <div
            className={composeClasses(
              classNamePopover,
              'bg-white border mt-1 rounded-lg shadow-md p-4 transition-all duration-200 ease-out opacity-100 translate-y-0 z-50'
            )}
            style={{ width: 468 }}
          >
            <Flex className="w-full" justifyContent="between">
              <Text bold>{titlePopover ?? 'Title'}</Text>
              <XIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => setShowPopover(false)}
              />
            </Flex>
            {childrenPopover}
            <Flex justifyContent="between" className="mt-4" gap="4">
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

export default SpecialButton
