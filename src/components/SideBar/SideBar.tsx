/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  CSSProperties,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import ExclamationIcon from '@heroicons/react/outline/ExclamationIcon'
import useResize from 'hooks/useResize'
import { composeClasses } from 'lib/classes'
import Text from '../Typography'
import ToolTipHover from '../ToolTipHover'
import Flex from '../Layout/Flex/Flex'
import SideBarHeader from './SideBarHeader'
import SideBarItem from './SideBarItem'
import SkeletonSideBarList from './SkeletonSideBarList'
import ToggleSideBar from './ToggleSideBar'
import './sideBar.css'

export interface SideBarSubItem {
  [key: string]: {
    title: string
    active: boolean
    goTo: () => void
    childrenSubItem?: any
  }
}

export type TBadge = string | number | ReactElement
export interface SideBarItemProps {
  title: string
  active: boolean
  isOpen?: boolean
  goTo?: () => void
  icon?: any
  disabled?: boolean
  hidden?: boolean
  subItems?: SideBarSubItem
  badge?: TBadge
}

export type SideBarList = SideBarItemProps[]

export interface SideBarProps {
  /**
   * List of sidebar items
   */
  sideBarList?: SideBarList
  /**
   * Sidebar name displayed at the top
   */
  sideBarName: string
  /**
   * Sidebar subtitle displayed at the top
   */
  sideBarSubTitle?: ReactNode
  /**
   * Indicates if the sidebar will be expanded by default
   */
  defaultExpand?: boolean
  dangerZone?: {
    /**
     * Show danger zone
     */
    show: boolean
    /**
     * Danger zone text
     */
    text: string
    /**
     * Active state of the danger zone
     */
    active: boolean
    /**
     * Danger zone callback function
     */
    callBack?: () => void
  }
  /**
   * Label for disabled options
   */
  disabledOptionsTag?: string
  /**
   * Top position of the sidebar
   */
  top?: number
  /**
   * Left sidebar position
   */
  left?: number
  /**
   * Status update synchronization function
   */
  flushSync?: <R>(fn: () => R) => R
  /**
   * Header information loading indicator
   */
  isLoadingHeaderInfo?: boolean
  /**
   * Sidebar list loading indicator
   */
  isLoadingSideBarList?: boolean
  /**
   * Number of items of type skeletons to show when isLoadingSideBarList is true
   */
  numSkeletons?: number
  /**
   * Optional object for the styles of the SideBar
   */
  style?: CSSProperties
}

const SideBar = ({
  sideBarList,
  sideBarName,
  sideBarSubTitle,
  defaultExpand,
  disabledOptionsTag,
  top,
  left,
  flushSync,
  isLoadingHeaderInfo,
  isLoadingSideBarList,
  numSkeletons = 5,
  style,
  dangerZone
}: SideBarProps) => {
  const sidebarRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const isScrolling = useRef<number>()
  const [expand, setExpand] = useState(false)
  const [isOptionClicked, setIsOptionClicked] = useState(false)
  const [menuItems, setMenuItems] = useState<SideBarList | undefined>(
    sideBarList
  )
  const containerHeaderRef = useRef<HTMLDivElement>(null)
  const { isMobile, isMdScreen } = useResize()

  const toggleSubMenu = (menuItemIndex: number) => {
    if (!menuItems?.length) return
    const updatedMenuItems = [...menuItems]
    updatedMenuItems[menuItemIndex].isOpen =
      !updatedMenuItems[menuItemIndex].isOpen

    setMenuItems(updatedMenuItems)
  }

  useEffect(() => {
    if (defaultExpand) {
      setExpand(true)
    }
    return () => {
      setExpand(false)
    }
  }, [defaultExpand])

  const handleScroll = () => {
    if (isOptionClicked) return
    setIsOptionClicked(true)
    window.clearTimeout(isScrolling.current)
    isScrolling.current = window.setTimeout(() => {
      setIsOptionClicked(false)
    }, 20)
  }
  const [openChildrenItems, setOpenChildrenItems] = useState<number[]>([])

  const toggleChildrenSubMenu = (index: number) => {
    if (openChildrenItems.includes(index))
      return setOpenChildrenItems(
        openChildrenItems.filter((item) => item !== index)
      )
    return setOpenChildrenItems([...openChildrenItems, index])
  }

  const handleClickOption =
    (disabled: boolean | undefined, goTo: () => void) => () => {
      if (disabled) return
      flushSync
        ? flushSync(() => setIsOptionClicked(true))
        : setIsOptionClicked(true)
      goTo()
    }

  useEffect(() => {
    setMenuItems(sideBarList)
  }, [sideBarList])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {isMobile && (
        <div
          className={composeClasses(
            'lg:hidden absolute z-40 transition-all duration-200 ease-in',
            expand ? 'fade-in w-full h-full opacity-90' : 'fade-out opacity-0'
          )}
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.75)',
            top: top ?? 0,
            left: left ?? 0
          }}
        />
      )}

      {!expand && isMdScreen && (
        <ToggleSideBar
          expand={expand}
          className="block lg:hidden mt-3"
          setExpand={setExpand}
        />
      )}

      <div
        ref={sidebarRef}
        role="container-sidebar"
        className={composeClasses(
          'border-t-0 box-border overflow-hidden h-full border relative z-50',
          'transition-all delay-75 duration-200 ease-in',
          expand ? 'w-60 min-w-full' : 'w-0 lg:w-14.5 lg:min-w-14.5',
          isMobile ? 'absolute z-50' : 'relative'
        )}
        style={{
          maxHeight: `calc(100vh - ${sidebarRef.current?.offsetTop}px)`,
          top: top ?? 0,
          left: left ?? 0,
          ...style
        }}
      >
        <Flex
          className="h-full flex-col transition-all delay-300 ease-out bg-gray-50"
          style={{
            maxWidth: 240
          }}
        >
          <Flex
            role="container-header"
            justifyContent="between"
            alignItems="center"
            className={composeClasses('w-full h-16 mb-1', expand && 'relative')}
            ref={containerHeaderRef}
          >
            {(!isMdScreen || expand) && (
              <ToggleSideBar expand={expand} setExpand={setExpand} />
            )}
            {expand && (
              <Flex
                justifyContent="center"
                gap="1"
                className="flex-col col-span-2 p-3 w-full"
              >
                <SideBarHeader
                  sideBarName={sideBarName}
                  sideBarSubTitle={sideBarSubTitle}
                  isLoadingHeaderInfo={isLoadingHeaderInfo}
                />
              </Flex>
            )}
          </Flex>
          <div
            role="list-options"
            className={`${
              !expand ? 'hide-scroll' : ''
            } overflow-y-auto overflow-x-hidden flex-grow mx-2`}
          >
            {isLoadingSideBarList ? (
              <SkeletonSideBarList childs={numSkeletons} />
            ) : (
              menuItems?.map(
                (item, index: number) =>
                  !item.hidden && (
                    <SideBarItem
                      key={`${item.title}-${index.toString()}`}
                      index={index}
                      disabledOptionsTag={disabledOptionsTag}
                      isOptionClicked={isOptionClicked}
                      isExpand={expand}
                      handleClickOption={handleClickOption}
                      toggleSubMenu={toggleSubMenu}
                      toggleChildrenSubMenu={toggleChildrenSubMenu}
                      openChildrenItems={openChildrenItems}
                      {...item}
                    />
                  )
              )
            )}
          </div>
          {dangerZone?.show && (
            <Flex
              role="danger-zone"
              alignItems="center"
              className="w-full cursor-pointer group mb-4 mt-8 relative"
              onClick={() => {
                if (dangerZone?.callBack) {
                  flushSync
                    ? flushSync(() => setIsOptionClicked(true))
                    : setIsOptionClicked(true)
                  dangerZone?.callBack()
                }
              }}
            >
              <ToolTipHover
                variantPopup="dark"
                disabled={expand || isOptionClicked}
                complementPosition={{ top: 30, left: 85 }}
                element={
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    className="w-14"
                  >
                    <ExclamationIcon
                      role="danger-zone-icon"
                      width={25}
                      className={composeClasses(
                        dangerZone?.active ? 'text-white' : 'text-error'
                      )}
                    />
                  </Flex>
                }
              >
                {dangerZone?.text}
              </ToolTipHover>
              <Text
                size="sm"
                className={composeClasses(
                  'min-w-max',
                  dangerZone?.active ? 'text-white' : 'text-info'
                )}
              >
                {dangerZone?.text}
              </Text>
            </Flex>
          )}
        </Flex>
      </div>
    </>
  )
}

export default SideBar
