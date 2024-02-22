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

export type TBadge = string | number | ReactElement

export interface SideBarItemPropsBase {
  title: string
  active: boolean
  isOpen?: boolean
  bgActive?: string
  colorActive?: string
  goTo?: () => void
  icon?: JSX.Element
  disabled?: boolean
  hidden?: boolean
  subItems?: SideBarItemPropsBase[]
  badge?: TBadge
  badgeColor?: string
  badgeTextColor?: string
}

export type SideBarList = SideBarItemPropsBase[]

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
  /**
   * Custom element above the danger zone
   */
  renderBottomCmp?: (isExpanded: boolean) => ReactNode
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
  renderBottomCmp,
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

  const toggleSubMenu = (menuItemIndex: number, subItemIndex?: number) => {
    if (!menuItems?.length) return
    const updatedMenuItems = [...menuItems]

    // If the subItemIndex is defined, it means that the submenu is a sub-submenu
    if (typeof subItemIndex === 'number') {
      const subMenuItems = updatedMenuItems[menuItemIndex].subItems || []
      subMenuItems[subItemIndex].isOpen = !subMenuItems[subItemIndex].isOpen
      setMenuItems(updatedMenuItems)
      return
    }

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

  const handleClickOption =
    (disabled: boolean | undefined, goTo: () => void) => () => {
      if (disabled) return
      flushSync
        ? flushSync(() => setIsOptionClicked(true))
        : setIsOptionClicked(true)
      goTo?.()
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
          'border-t-0 box-border overflow-hidden h-full border z-50',
          'transition-all delay-75 duration-200 ease-in',
          expand ? 'w-60 min-w-full' : 'w-0 lg:w-14.5 lg:min-w-14.5',
          isMobile ? 'absolute' : 'relative'
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
            className="hide-scroll overflow-y-auto overflow-x-hidden flex-grow mx-2"
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
                      {...item}
                    />
                  )
              )
            )}
          </div>
          {renderBottomCmp && (
            <Flex
              role="bottom-element"
              alignItems="center"
              className="w-full mb-4 mt-8 relative"
            >
              {renderBottomCmp(expand)}
            </Flex>
          )}
          {dangerZone?.show && (
            <Flex
              role="danger-zone"
              alignItems="center"
              className={composeClasses(
                'w-full cursor-pointer group mb-4 relative',
                !renderBottomCmp && 'mt-8'
              )}
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
