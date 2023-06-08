import {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import { ExclamationIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Text from '../Typography'
import ToolTipHover from '../ToolTipHover'
import Flex from '../Layout/Flex/Flex'
import SideBarHeader from './SideBarHeader'
import SideBarItem from './SideBarItem'
import SkeletonSideBarList from './SkeletonSideBarList'
import './sideBar.css'

export interface SideBarSubItem {
  [key: string]: {
    title: string
    active: boolean
    goTo: () => void
  }
}

export type TBadge = string | number | ReactElement
export interface SideBarItemProps {
  title: string
  active: boolean
  isOpen?: boolean
  goTo?: () => void
  icon?: JSX.Element
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
  ...props
}: SideBarProps) => {
  const sidebarRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const isScrolling = useRef<number>()
  const [expand, setExpand] = useState(false)
  const [isOptionClicked, setIsOptionClicked] = useState(false)
  const [menuItems, setMenuItems] = useState<SideBarList | undefined>(
    sideBarList
  )

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
    <div
      ref={sidebarRef}
      role="container-sidebar"
      className={composeClasses(
        'bg-gray-50 border-t-0 box-border overflow-hidden h-full relative border',
        'transition-all delay-75 duration-200 ease-in',
        expand ? 'w-60 min-w-full' : 'w-0 lg:w-14.5 lg:min-w-14.5'
      )}
      style={{
        maxHeight: `calc(100vh - ${sidebarRef.current?.offsetTop}px)`,
        top: top ?? 0,
        left: left ?? 0
      }}
    >
      <Flex className="h-full flex-col transition-all delay-300 ease-out">
        <Flex
          justifyContent="between"
          alignItems="center"
          className={composeClasses('w-full h-16 mb-1', expand && 'relative')}
        >
          <div
            role="active-sidebar"
            className={composeClasses(
              'fixed mx-2 border rounded-full bg-white text-primary cursor-pointer transition-all duration-300 ease-in-out',
              'focus:bg-primary focus:text-white',
              'hover:bg-blue-50',
              expand && 'absolute right-2'
            )}
            onClick={() => setExpand(!expand)}
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
                    {...item}
                  />
                )
            )
          )}
        </div>
        {props.dangerZone?.show && (
          <Flex
            role="danger-zone"
            alignItems="center"
            className="w-full cursor-pointer group mb-4"
            onClick={() => {
              if (props.dangerZone?.callBack) {
                flushSync
                  ? flushSync(() => setIsOptionClicked(true))
                  : setIsOptionClicked(true)
                props.dangerZone?.callBack()
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
                      props.dangerZone?.active ? 'text-white' : 'text-error'
                    )}
                  />
                </Flex>
              }
            >
              {props?.dangerZone?.text}
            </ToolTipHover>
            <Text
              size="sm"
              className={composeClasses(
                'min-w-max',
                props.dangerZone?.active ? 'text-white' : 'text-info'
              )}
            >
              {props?.dangerZone?.text}
            </Text>
          </Flex>
        )}
      </Flex>
    </div>
  )
}

export default SideBar
