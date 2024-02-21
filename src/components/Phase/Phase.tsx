/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ElementType } from 'react'
import {
  CheckCircleIcon,
  SearchCircleIcon,
  ExclamationIcon
} from '@heroicons/react/solid'
import { composeClasses } from 'lib/classes'
import Divider from '../Divider'
import Flex from '../Layout/Flex'
import Tag from '../Tag'
import Text from '../Typography'

type Status = 'default' | 'active' | 'success' | 'selected' | 'completed'
type Variants = 'phases' | 'status' | 'quarters'
type TagVariants = 'primary' | 'secondary' | 'success' | 'warning'
type IconStatus = keyof typeof ICON_STATUS

export interface IListItem {
  label: string
  status: IconStatus
}

export interface IPhaseProps extends React.HTMLProps<HTMLDivElement> {
  title?: string
  subtitle?: string
  textTag?: string
  listData?: IListItem[]
  className?: string
  numberPhase?: number
  variant: Variants
  icon?: ElementType
  status: Status
}

interface IClassPhase {
  container: string
  icon?: string
  tagVariant?: TagVariants
  tagFill?: boolean
}

interface IClassStyles {
  [Variants: string]: { [Status: string]: IClassPhase } | undefined
}

const phaseStyles: IClassStyles = {
  phases: {
    default: {
      container: 'p-2 bg-gray-50 ring-2 ring-gray-300 text-gray-700',
      icon: 'flex h-9 w-9 rounded-full items-center justify-center bg-white ring-2 ring-white text-gray-400',
      tagVariant: 'primary',
      tagFill: false
    },
    active: {
      container: 'p-2 bg-blue-500 ring-2 ring-blue-300 text-blue-100 ',
      icon: 'flex h-9 w-9 rounded-full items-center justify-center bg-white text-blue-500 ring-2 ring-blue-200',
      tagVariant: 'primary',
      tagFill: true
    },
    completed: {
      container: 'p-2 bg-green-50 ring-2 ring-green-300 text-gray-700',
      icon: 'flex h-9 w-9 rounded-full items-center justify-center bg-green-500 ring-2 ring-green-500 text-white',
      tagVariant: 'success',
      tagFill: true
    }
  },
  status: {
    active: {
      container: 'p-3 bg-gray-50 ring-2 ring-gray-300 text-gray-700',
      tagVariant: 'secondary',
      icon: 'text-gray-500',
      tagFill: true
    },
    selected: {
      container: 'p-3 bg-gray-50 ring-2 ring-blue-400 text-gray-700 ',
      tagVariant: 'primary',
      icon: 'text-gray-500',
      tagFill: true
    },
    success: {
      container: 'p-3 bg-green-50 ring-2 ring-green-300 text-gray-700',
      tagVariant: 'success',
      icon: 'text-gray-500',
      tagFill: true
    }
  },
  quarters: {
    active: {
      container: 'p-3 bg-gray-50 ring-2 ring-gray-300 text-gray-700',
      icon: 'text-gray-500'
    },
    selected: {
      container: 'p-3 bg-gray-50 ring-2 ring-blue-400 text-gray-700 ',
      icon: 'text-gray-500'
    }
  }
}

const ICON_STATUS = {
  completed: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
  onValidation: <SearchCircleIcon className="w-4 h-4 text-blue-500" />,
  missingInformation: <ExclamationIcon className="w-4 h-4 text-yellow-500" />
}

const Phase = ({
  title,
  subtitle,
  numberPhase,
  icon: Icon,
  variant,
  status,
  textTag,
  className,
  listData,
  ...props
}: IPhaseProps) => {
  const isQuartersVariant = variant === 'quarters'
  const classVariant =
    phaseStyles[variant]?.[status] ||
    (variant === 'phases' && phaseStyles['phases']?.default) ||
    phaseStyles[variant]?.active

  return (
    <div
      className={composeClasses(
        'rounded-2xl flex justify-between flex-col gap-2',
        classVariant?.container,
        className
      )}
      {...props}
      role="container-phase"
    >
      <div>
        <Flex
          gap="2"
          className={isQuartersVariant ? 'flex-rows items-center' : 'flex-col'}
        >
          {variant !== 'status' && Icon && (
            <div className={composeClasses(classVariant?.icon)}>
              <Icon
                className={isQuartersVariant ? 'h4 w-4' : 'h5 w-5'}
                aria-hidden="true"
                data-testid="badge-icon"
              />
            </div>
          )}

          <Flex gap="2">
            {numberPhase != null && numberPhase > 0 && variant === 'phases' && (
              <Text variant="h4" size="sm" bold>
                {numberPhase}.
              </Text>
            )}
            <Text variant="h4" size="sm" bold>
              {title}
            </Text>
          </Flex>
        </Flex>
        {subtitle && (
          <Text variant="p" size="sm">
            {subtitle}
          </Text>
        )}
      </div>
      {!isQuartersVariant && (
        <div>
          <Tag
            text={textTag}
            variant={classVariant?.tagVariant}
            fill={classVariant?.tagFill}
            rounded={variant === 'phases' ? 'xl' : 'md'}
            className="font-semibold"
          />
        </div>
      )}

      {isQuartersVariant && (
        <>
          <Divider light size="small" variant="middle" />
          {listData?.length && (
            <Flex gap="2" className="flex-col">
              {listData.map((item, index) => (
                <Flex
                  key={index}
                  gap="2"
                  className="flex-row items-center justify-between"
                >
                  <Text variant="p" size="sm" fontBold="medium">
                    {item.label}
                  </Text>
                  {ICON_STATUS[item.status]}
                </Flex>
              ))}
            </Flex>
          )}
        </>
      )}
    </div>
  )
}

Phase.displayName = 'Phase'
Phase.defaultProps = {
  title: 'Title',
  variant: 'phases',
  textTag: 'Pending',
  status: 'default'
}
export default Phase
