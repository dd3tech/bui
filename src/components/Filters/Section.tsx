import React from 'react'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child elements to be rendered inside the Section */
  children?: React.ReactNode
  /** Additional class names to apply to the Section */
  className?: string
  /** Whether to display a border on the left side of the Section */
  borderLeft?: boolean
  /** Whether to display a border on the right side of the Section */
  borderRight?: boolean
}

const Section = ({
  children,
  borderLeft,
  borderRight,
  className,
  ...props
}: SectionProps) => {
  return (
    <Flex
      role="filter-bar-section"
      alignItems="center"
      className={composeClasses(
        'h-[full] self-stretch flex-shrink-0',
        borderLeft && 'pl-4 ml-4 border-l-2 border-gray-200',
        borderRight && 'pr-4 mr-4 border-r-2 border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Section
