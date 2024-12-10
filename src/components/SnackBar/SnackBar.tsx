import { useEffect, useState } from 'react'
import DynamicHeroIcon from 'common/DynamicHeroIcon'
import { InformationCircleIcon } from '@heroicons/react/solid'
import Button from 'components/Buttons/Button'
import Card from 'components/Card/Card'
import Flex from 'components/Layout/Flex/Flex'
import Text from 'components/Typography'
import Portal from 'common/Portal/Portal'
import { composeClasses } from 'lib/classes'
import './snackBar.css'

interface SnackBarProps {
  show: boolean
  title: {
    label: string
    icon?: keyof typeof DynamicHeroIcon
  }
  description: string
  buttonPrimary?: {
    label: string
    icon?: keyof typeof DynamicHeroIcon
    position: 'right' | 'left'
    onClick: () => void
  }
  buttonGhost: {
    label: string
    icon?: keyof typeof DynamicHeroIcon
    position: 'right' | 'left'
    onClick: () => void
  }
  className?: string
}

const SnackBar = ({
  title,
  description,
  buttonPrimary,
  buttonGhost,
  show,
  className
}: SnackBarProps) => {
  const [isVisible, setIsVisible] = useState(show)

  const SnackBarButton = (icon?: keyof typeof DynamicHeroIcon) => (
    <DynamicHeroIcon
      icon={icon || 'XCircleIcon'}
      className="w-4 h-4 cursor-pointer relative"
    />
  )

  useEffect(() => {
    if (show) {
      setIsVisible(true)
    }
  }, [show])

  if (!isVisible) return null

  return (
    <Portal>
      <div
        className={composeClasses(
          className ??
            'fixed bottom-8 left-60 w-full max-w-4xl 2xl:max-w-6xl px-4',
          show ? 'animate-fadeInUp' : 'animate-fadeOutUp'
        )}
        style={{ zIndex: 10000 }}
      >
        <Card rounded="2xl" className="shadow-xl bg-white">
          <Flex alignItems="center" gap="2">
            {title.icon ? (
              <DynamicHeroIcon
                icon={title.icon || 'InformationCircleIcon'}
                className="w-4 h-4 text-gray-700"
              />
            ) : (
              <InformationCircleIcon className="w-4 h-4" />
            )}

            <Text size="base">{title.label}</Text>
          </Flex>
          <Flex className="mt-2">
            <Text size="sm">{description}</Text>
          </Flex>
          <Flex justifyContent="end" gap="2" className="mt-2">
            {buttonGhost && (
              <Button
                onClick={buttonGhost.onClick}
                variant="ghost"
                className="flex gap-2 items-center px-6"
              >
                {buttonGhost.position === 'left' &&
                  SnackBarButton(buttonGhost.icon)}
                <Text size="xs">{buttonGhost.label}</Text>
                {buttonGhost.position === 'right' &&
                  SnackBarButton(buttonGhost.icon)}
              </Button>
            )}
            {buttonPrimary && (
              <Button
                onClick={buttonPrimary.onClick}
                variant="primary"
                className="flex gap-2 items-center px-6"
              >
                {buttonPrimary.position === 'left' &&
                  SnackBarButton(buttonPrimary.icon)}
                <Text size="xs">{buttonPrimary.label}</Text>
                {buttonPrimary.position === 'right' &&
                  SnackBarButton(buttonPrimary.icon)}
              </Button>
            )}
          </Flex>
        </Card>
      </div>
    </Portal>
  )
}

SnackBar.displayName = 'SnackBar'

export default SnackBar
