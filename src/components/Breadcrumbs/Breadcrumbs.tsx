/*
 * Copyright (c) DD360 and its affiliates.
 */

import React, { forwardRef, ReactNode, FC } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Skeleton from 'components/Skeleton/Skeleton'

export interface BreadcrumbsProps extends React.HTMLProps<HTMLDivElement> {
  options: Array<{ name?: string; icon?: () => ReactNode; to?: () => void }>
  separator?: any
  isLoading?: boolean
}

export type InsertSeparatorsProps = {
  separator: BreadcrumbsProps['separator']
}

const InsertSeparators: FC<InsertSeparatorsProps> = ({
  separator
}: InsertSeparatorsProps) => {
  if (separator) {
    return <>{separator}</>
  }

  return (
    <ChevronRightIcon
      data-icon="ChevronRightIcon"
      className="text-info bold"
      width={15}
    />
  )
}

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  (
    { options, separator, className, isLoading, ...props }: BreadcrumbsProps,
    ref
  ) => {
    const isActiveLink = React.useCallback(
      (indexOfKey: number) => {
        return options.length - 1 === indexOfKey
      },
      [options]
    )

    if (isLoading) {
      return <Skeleton className="w-52 h-6 pt-1 bg-gray-300 rounded-lg" />
    }

    return (
      <div
        className={composeClasses(
          'flex gap-4 items-center absolute',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map(({ name, icon, to }, indexKey) => (
          <React.Fragment key={`${name}-${to}-${indexKey}`}>
            {icon && icon()}
            <p
              onClick={() => {
                if (!to) return
                to()
              }}
              className={composeClasses(
                'cursor-pointer text-sm',
                isActiveLink(indexKey)
                  ? 'text-primary font-bold'
                  : 'text-info font-medium'
              )}
            >
              {name && name.charAt(0).toLocaleUpperCase() + name.slice(1)}
            </p>
            {!isActiveLink(indexKey) && (
              <InsertSeparators separator={separator} />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
