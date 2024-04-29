/*
 * Copyright (c) DD360 and its affiliates.
 */

import { Dispatch } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Flex from '../Layout/Flex/Flex'

interface ToggleSideBarProps {
  /**
   * Indicates if the sidebar is expanded
   */
  expand: boolean
  /**
   * Class to be applied to the component
   */
  className?: string
  /**
   * Indicates if the sidebar  is always visible
   */
  alwaysVisible: boolean
  /**
   * Function to set the expand state
   */
  setExpand: Dispatch<React.SetStateAction<boolean>>
}

const ToggleSideBar = ({
  expand,
  className,
  alwaysVisible,
  setExpand
}: ToggleSideBarProps) => {
  return (
    <div
      role="active-sidebar"
      className={composeClasses(
        'absolute mx-2 border rounded-full bg-white text-primary cursor-pointer transition-all duration-300 ease-in-out z-50',
        'focus:bg-primary focus:text-white',
        'hover:bg-blue-50',
        'top-1/2 transform -translate-y-1/2',
        alwaysVisible
          ? expand
            ? '-right-5'
            : '-right-10'
          : '-right-5 opacity-0 group-hover:opacity-100',
        className
      )}
      onClick={() => setExpand((prev) => !prev)}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        className={composeClasses(
          'w-6 h-6 transform transition-all duration-200 ease-in-out',
          expand ? 'rotate-0' : 'rotate-180'
        )}
      >
        <ChevronLeftIcon
          className="transition-all duration-200 ease-in-out"
          width={18}
        />
      </Flex>
    </div>
  )
}

export default ToggleSideBar
