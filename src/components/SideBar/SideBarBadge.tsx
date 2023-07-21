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
   * Indicates if the element is active
   */
  isActive: boolean
}

const SideBarBadge = ({ value, isActive }: BadgeProps) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    className={composeClasses(
      'rounded-2xl bg-blue-50 w-6 text-white text-xs font-medium',
      isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-gray-700'
    )}
    style={{ height: 22 }}
  >
    {value}
  </Flex>
)

export default SideBarBadge
