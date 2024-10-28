import React, { useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import Breadcrumbs, { BreadcrumbsProps } from 'components/Breadcrumbs'
import Flex from 'components/Layout/Flex'
import Circle from 'components/Circle'
import { Button } from 'components/Buttons'
import { Tab, TabGroup } from 'components/Tabs'
import Divider from 'components/Divider'
import Text from '../Typography'

interface IActionButton {
  onClick: () => void
  icon: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  label: string
  isDisabled?: boolean
}

interface ITab {
  value: number
  setValue: (value: number) => void
  items: {
    label: string
    disabled?: boolean
  }[]
}

interface ITopPage {
  optionsBreadcrumbs?: BreadcrumbsProps['options']
  lastUpdate?: {
    translation: 'es' | 'en'
    date: Date
  }
  title: string
  description?: string
  callToActionsButtons?: IActionButton[]
  children: React.ReactNode
  callToActionIcon?: {
    titleIcon?: React.ReactNode
    onClick?: () => void
    isSelected?: boolean
    isDisabled?: boolean
  }
  tabs?: ITab
}

const translationLastUpdate = (translation: 'es' | 'en') => {
  if (translation === 'es') return 'Última actualización:'

  return 'Last update:'
}

const formatDate = (date: Date, language: 'en' | 'es') => {
  const day = date?.getDate?.()?.toString()?.padStart(2, '0')

  const monthNames = {
    en: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    es: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ]
  }
  const month = monthNames?.[language]?.[date?.getMonth()]
  const year = date?.getFullYear()
  return `${day}-${month}-${year}`
}

const TopPage = ({
  children,
  optionsBreadcrumbs,
  title,
  lastUpdate,
  description,
  callToActionsButtons,
  callToActionIcon,
  tabs
}: ITopPage) => {
  const styleIcon = useCallback(() => {
    if (callToActionIcon?.isDisabled) return 'text-gray-300'
    if (callToActionIcon?.isSelected) return 'text-white'
    return 'text-blue-600'
  }, [callToActionIcon])

  return (
    <div className="mx-5">
      <div>
        {(optionsBreadcrumbs || lastUpdate) && (
          <Flex className="pt-3 h-8" justifyContent="between">
            <div>
              {optionsBreadcrumbs && (
                <div>
                  <Breadcrumbs options={optionsBreadcrumbs} />
                </div>
              )}
            </div>
            {lastUpdate && (
              <Text size="sm" className="flex gap-1">
                {translationLastUpdate(lastUpdate.translation)}
                <span className="font-bold">
                  {formatDate(lastUpdate.date, lastUpdate.translation)}
                </span>
              </Text>
            )}
          </Flex>
        )}
        <Flex
          className={composeClasses(
            !optionsBreadcrumbs && !lastUpdate && 'mt-4',
            'mt-1'
          )}
          alignItems="center"
          justifyContent="between"
          style={{
            height: '52px'
          }}
        >
          <Flex className="flex-col">
            {title && (
              <Text bold size="2xl">
                {title}
              </Text>
            )}
            {description && <Text size="sm">{description}</Text>}
          </Flex>
          {(callToActionsButtons || callToActionIcon) && (
            <Flex gap="3" alignItems="center">
              {callToActionsButtons &&
                callToActionsButtons.slice(0, 4).map((button, index) => (
                  <Button
                    paddingX="4"
                    key={index}
                    variant={button.variant}
                    onClick={button.onClick}
                    className="flex gap-2 items-center justify-center h-10"
                    disabled={button?.isDisabled}
                  >
                    {button.label}
                    {button.icon && (
                      <span className="w-4 h-4 flex-shrink-0">
                        {button.icon}
                      </span>
                    )}
                  </Button>
                ))}
              {callToActionIcon && (
                <Circle
                  backgroundColor="#ffffff"
                  useBackground={false}
                  className={composeClasses(
                    'border cursor-pointer border-solid border-gray-300 bg-white transition duration-500 ease-out hover:bg-gray-100',
                    callToActionIcon?.isSelected && 'bg-blue-600',
                    callToActionIcon?.isDisabled && 'bg-gray-100'
                  )}
                  width="40px"
                  height="40px"
                  onClick={() => {
                    if (callToActionIcon?.isDisabled) return
                    callToActionIcon?.onClick?.()
                  }}
                  data-testid="action-icon"
                >
                  <span className={composeClasses('w-5 h-5', styleIcon())}>
                    {callToActionIcon?.titleIcon}
                  </span>
                </Circle>
              )}
            </Flex>
          )}
        </Flex>
        <div className="-mx-5 mt-1">
          {tabs ? (
            <TabGroup value={tabs.value} onChange={tabs.setValue}>
              {tabs.items.map((tab, index) => (
                <Tab key={index} label={tab.label} disabled={tab.disabled} />
              ))}
            </TabGroup>
          ) : (
            <Divider className="mt-3" light />
          )}
        </div>
      </div>
      <div className="my-6">{children}</div>
    </div>
  )
}

export default TopPage
