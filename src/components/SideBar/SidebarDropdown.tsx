import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { OfficeBuildingIcon, PlusIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { composeClasses } from 'lib/classes'
import {
  Button,
  Circle,
  Divider,
  Flex,
  Overflow,
  SidebarDropdownListItem,
  Skeleton,
  Text,
  Transition
} from '..'

interface SidebarDropdownProps {
  /**
   * Indicates if the sidebar is expanded
   */
  expand: boolean
  /**
   * Sidebar name displayed at the top
   */
  sideBarName: string
  /**
   * Sidebar subtitle displayed at the top
   */
  sideBarSubTitle?: ReactNode
  /**
   * Header information loading indicator
   */
  isLoadingHeaderInfo?: boolean
  /**
   * List of dropdown items
   */
  dropdownList?: SidebarDropdownListItem[]
  /**
   * Text for the dropdown button
   */
  dropdownButtonText?: string
  /**
   * Icon for the dropdown button
   */
  dropdownIcon?: ReactNode
  /**
   * Callback for the dropdown button
   */
  dropdownButtonCallback?: () => void
  /**
   * Function to set the expand state
   */
  setExpand: Dispatch<SetStateAction<boolean>>
}

const SidebarDropdown = ({
  expand,
  sideBarName,
  sideBarSubTitle,
  isLoadingHeaderInfo,
  dropdownList,
  dropdownButtonText,
  dropdownIcon,
  dropdownButtonCallback,
  setExpand
}: SidebarDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isEmtpyList = !dropdownList?.length

  const handleToggleDropdown = () => {
    if (isLoadingHeaderInfo) return
    if (!expand) setExpand(true)
    setIsOpen(!isOpen)
  }

  const handleButtonCallback = () => {
    if (!dropdownButtonCallback) return
    dropdownButtonCallback()
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && !expand) setIsOpen(false)
  }, [expand])

  useEffect(() => {
    const handleClick = () => {
      if (!isOpen) return
      setIsOpen(false)
    }
    window.addEventListener('mousedown', handleClick)
    return () => {
      window.removeEventListener('mousedown', handleClick)
    }
  }, [isOpen])

  return (
    <div role="sidebar-dropdown" className="relative">
      <div className="p-2">
        <Flex
          role="sidebar-dropdown-header"
          alignItems="center"
          className={composeClasses(
            expand
              ? 'px-2 border rounded-lg bg-white'
              : 'px-1 border-none bg-transparent',
            'w-full py-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50'
          )}
          style={{ height: '60px' }}
          gap={expand ? '2' : '4'}
          onClick={handleToggleDropdown}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Circle
            className="p-1 text-blue-700 bg-blue-50 flex-shrink-0"
            width="32px"
            height="32px"
          >
            {dropdownIcon ? (
              dropdownIcon
            ) : (
              <OfficeBuildingIcon className="w-5 h-5 text-blue-700" />
            )}
          </Circle>
          <Flex className="flex-col w-32">
            {isLoadingHeaderInfo ? (
              <>
                <Skeleton rounded="full" className="h-3 w-24 mb-1" />
                <Skeleton rounded="full" className="h-4 w-32" />
              </>
            ) : (
              <>
                <Text
                  size="xs"
                  textMuted500
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                >
                  {sideBarSubTitle}
                </Text>
                <Text
                  size="sm"
                  className="text-blue-700 whitespace-nowrap overflow-hidden overflow-ellipsis"
                >
                  {sideBarName}
                </Text>
              </>
            )}
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            className="flex-col"
          >
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              ></path>
            </svg>
          </Flex>
        </Flex>
      </div>
      <Transition show={isOpen} className="absolute top-16 w-full p-2 z-20">
        <Flex
          role="sidebar-dropdown-list"
          className="bg-white h-auto w-full flex-col p-2 border rounded-lg z-50 shadow-lg"
          style={{ maxHeight: '224px' }}
        >
          <Overflow className="flex-grow">
            {dropdownList?.map((item, index) => (
              <Flex
                key={`sidebar-dropdown-item-${item.name}-${index}`}
                role={`sidebar-dropdown-item-${index}`}
                justifyContent="between"
                alignItems="center"
                gap="2"
                className="w-full h-9 p-2 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => {
                  if (!item.goTo) return
                  item.goTo()
                  setIsOpen(false)
                }}
              >
                <Text
                  size="sm"
                  className="text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis"
                >
                  {item.name}
                </Text>
                <div className="w-4 flex-shrink-0">
                  {item.isActive && (
                    <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              </Flex>
            ))}
          </Overflow>
          <Flex justifyContent="center" className="flex-col">
            {!isEmtpyList && <Divider light />}
            <Button
              role="sidebar-dropdown-button"
              variant="ghost"
              className="flex justify-center items-center gap-2 h-8 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={handleButtonCallback}
            >
              <Text size="xs" className="underline underline-space">
                {dropdownButtonText}
              </Text>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </Flex>
        </Flex>
      </Transition>
    </div>
  )
}

export default SidebarDropdown
