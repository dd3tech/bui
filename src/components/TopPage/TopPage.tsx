import React, { useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import Breadcrumbs from 'components/Breadcrumbs'
import type { BreadcrumbsProps } from 'components/Breadcrumbs'
import Flex from 'components/Layout/Flex'
import Circle from 'components/Circle'
import { Button } from 'components/Buttons'
import Skeleton from 'components/Skeleton/Skeleton'
import { Tab, TabGroup } from 'components/Tabs'
import Divider from 'components/Divider'
import Text from '../Typography'
import { monthLabelsShort } from '../../utils/utils'

export interface ActionButtonProps {
  onClick: () => void
  icon?: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  label: string
  isDisabled?: boolean
  isLoading?: boolean
  role?: string
}

export interface TabTopPageProps {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  items: {
    label: string
    disabled?: boolean
    hidden?: boolean
  }[]
}

export interface ActionIconProps {
  titleIcon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isSelected?: boolean
  isDisabled?: boolean
}
export interface BreadcrumbsTopPageProps {
  options: BreadcrumbsProps['options']
  separator?: BreadcrumbsProps['separator']
  isLoading?: BreadcrumbsProps['isLoading']
}

export interface TopPageProps {
  optionsBreadcrumbs?: BreadcrumbsTopPageProps
  lastUpdate?: {
    translation: 'es' | 'en'
    date: Date
  }
  title: {
    label: string
    isLoading?: boolean
  }
  description?: string
  callToActionsButtons?: ActionButtonProps[]
  actionIcon?: ActionIconProps
  tabs?: TabTopPageProps
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
    <div className={classNameHeader ?? 'sticky top-0 bg-white z-40 px-5'}>
      {(optionsBreadcrumbs || lastUpdate) && (
        <Flex className="pt-3 h-8" justifyContent="between">
          <div>
            {optionsBreadcrumbs && (
              <div>
                <Breadcrumbs {...optionsBreadcrumbs} />
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
          {title.isLoading ? (
            <Skeleton className="w-48 h-9 rounded-full" />
          ) : (
            <Text bold size="2xl">
              {title.label}
            </Text>
          )}
          {description && <Text size="sm">{description}</Text>}
        </Flex>
        {(callToActionsButtons || actionIcon) && (
          <Flex gap="3" alignItems="center">
            {callToActionsButtons &&
              callToActionsButtons.slice(0, 4).map((button, index) => (
                <Button
                  padding="0"
                  paddingX="8"
                  key={index}
                  variant={button.variant}
                  onClick={button.onClick}
                  className="flex gap-2 items-center justify-center h-9"
                  disabled={button?.isDisabled}
                  isLoading={button?.isLoading}
                  role={button?.role}
                >
                  {button.label}
                  {button.icon && (
                    <span className="w-4 h-4 flex-shrink-0">{button.icon}</span>
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
                onClick={(e) => {
                  if (actionIcon?.isDisabled) return
                  actionIcon?.onClick?.(e)
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
              <Tab
                key={index}
                label={tab.label}
                disabled={tab.disabled}
                hidden={tab.hidden}
              />
            ))}
          </TabGroup>
        ) : (
          <Divider className="mt-3" light />
        )}
      </div>
    </div>
  )
}

TopPage.displayName = 'TopPage'

export default TopPage
