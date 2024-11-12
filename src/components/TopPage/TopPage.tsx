import React, { useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import Breadcrumbs from 'components/Breadcrumbs'
import type { BreadcrumbsProps } from 'components/Breadcrumbs'
import Flex from 'components/Layout/Flex'
import Circle from 'components/Circle'
import { Button } from 'components/Buttons'
import { Tab, TabGroup } from 'components/Tabs'
import Divider from 'components/Divider'
import Text from '../Typography'
import { monthLabelsShort } from '../../utils/utils'

interface IActionButton {
  onClick: () => void
  icon: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  label: string
  isDisabled?: boolean
}

interface ITab {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  items: {
    label: string
    disabled?: boolean
  }[]
}

export interface TopPageProps {
  optionsBreadcrumbs?: BreadcrumbsProps['options']
  lastUpdate?: {
    translation: 'es' | 'en'
    date: Date
  }
  title: string
  description?: string
  callToActionsButtons?: IActionButton[]
  actionIcon?: {
    titleIcon?: React.ReactNode
    onClick?: () => void
    isSelected?: boolean
    isDisabled?: boolean
  }
  tabs?: ITab
  classNameHeader?: string
}

const translationLastUpdate = (translation: 'es' | 'en') => {
  if (translation === 'es') return 'Última actualización:'

  return 'Last update:'
}

const formatDate = (date: Date, language: 'en' | 'es') => {
  const day = date?.getDate?.()?.toString()?.padStart(2, '0')

  const month = monthLabelsShort?.[language]?.[date?.getMonth()]
  const year = date?.getFullYear()
  return `${day}-${month}-${year}`
}

const TopPage = ({
  optionsBreadcrumbs,
  title,
  lastUpdate,
  description,
  callToActionsButtons,
  actionIcon,
  tabs,
  classNameHeader
}: TopPageProps) => {
  const styleIcon = useCallback(() => {
    if (actionIcon?.isDisabled) return 'text-gray-300'
    if (actionIcon?.isSelected) return 'text-white'
    return 'text-blue-600'
  }, [actionIcon])

  return (
    <div className="px-5">
      <div
        className={classNameHeader ?? 'sticky top-0 bg-white'}
        style={{ zIndex: 500 }}
      >
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
          {(callToActionsButtons || actionIcon) && (
            <Flex gap="3" alignItems="center">
              {callToActionsButtons &&
                callToActionsButtons.slice(0, 4).map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    onClick={button.onClick}
                    className="flex gap-2 items-center justify-center h-10 p-4"
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
              {actionIcon && (
                <Circle
                  backgroundColor="#ffffff"
                  useBackground={false}
                  className={composeClasses(
                    'border cursor-pointer border-solid border-gray-300 bg-white transition duration-500 ease-out hover:bg-gray-100',
                    actionIcon?.isSelected && 'bg-blue-600',
                    actionIcon?.isDisabled && 'bg-gray-100'
                  )}
                  width="40px"
                  height="40px"
                  onClick={() => {
                    if (actionIcon?.isDisabled) return
                    actionIcon?.onClick?.()
                  }}
                  data-testid="action-icon"
                >
                  <span className={composeClasses('w-5 h-5', styleIcon())}>
                    {actionIcon?.titleIcon}
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
    </div>
  )
}

TopPage.displayName = 'TopPage'

export default TopPage
