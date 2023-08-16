/*
 * Copyright (c) DD360 and its affiliates.
 */

import { composeClasses } from 'lib/classes'
import Flex from '../Layout/Flex'

export interface BadgeProps {
  /**
   * Value to be displayed on the badge
   */
  value: string | number
  /**
   * Color of the badge
   * @default 'bg-blue-600'
   */
  badgeColor?: string
  /**
   * Text color of the badge
   * @default 'text-white'
   */
  badgeTextColor?: string
}

const SideBarBadge = ({
  value,
  badgeColor = 'bg-blue-600',
  badgeTextColor = 'text-white'
}: BadgeProps) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    className={composeClasses(
      'rounded-2xl text-xs font-medium px-1',
      badgeColor,
      badgeTextColor
    )}
    style={{ height: 22, minWidth: 22 }}
  >
    {value}
  </Flex>
)

export default SideBarBadge
