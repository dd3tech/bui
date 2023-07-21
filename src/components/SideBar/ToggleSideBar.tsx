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
   * Function to set the expand state
   */
  setExpand: Dispatch<React.SetStateAction<boolean>>
}

const ToggleSideBar = ({
  expand,
  className,
  setExpand
}: ToggleSideBarProps) => {
  return (
    <div
      role="active-sidebar"
      className={composeClasses(
        'absolute mx-2 border rounded-full bg-white text-primary cursor-pointer transition-all duration-300 ease-in-out',
        'focus:bg-primary focus:text-white',
        'hover:bg-blue-50',
        expand && 'right-2',
        className
      )}
      onClick={() => setExpand((prev) => !prev)}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        className={composeClasses(
          'w-9 h-9 transform transition-all duration-200 ease-in-out',
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
