import {
  MutableRefObject,
  ReactElement,
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

export interface ISideBarSubItem {
  [key: string]: {
    title: string
    active: boolean
    to: () => void
  }
}

export type TBadge = string | number | ReactElement
export interface ISideBarItem {
  title: string
  active: boolean
  isOpen?: boolean
  to?: () => void
  icon?: JSX.Element
  disabled?: boolean
  hidden?: boolean
  subItems?: ISideBarSubItem
  badge?: TBadge
}

export interface SideBarProps {
  sideBarList?: ISideBarItem[]
  sideBarName: string
  sideBarSubTitle?: string | ReactElement
  defaultExpand?: boolean
  dangerZone?: {
    show: boolean
    text: string
    active: boolean
    callBack?: () => void
  }
  disabledOptionsTag?: string
  top?: number
  left?: number
  flushSync?: <R>(fn: () => R) => R
  isLoadingHeaderInfo?: boolean
  isLoadingSideBarList?: boolean
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
  ...props
}: SideBarProps) => {
  const sidebarRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const isScrolling = useRef<number>()
  const [expand, setExpand] = useState(false)
  const [timer, setTimer] = useState(false)
  const [isOptionClicked, setIsOptionClicked] = useState(false)
  const [menuItems, setMenuItems] = useState<ISideBarItem[] | undefined>(
    sideBarList
  )

  const toggleSubMenu = (menuItemIndex: number) => {
    if (!menuItems) return

    setMenuItems((prevMenuItems) => {
      if (!prevMenuItems) return []
      const updatedMenuItems = [...prevMenuItems]
      updatedMenuItems[menuItemIndex].isOpen =
        !updatedMenuItems[menuItemIndex].isOpen

      return updatedMenuItems
    })
  }

  const shotTimer = () => {
    setTimeout(() => {
      setTimer(!expand)
    }, 300)
  }

  useEffect(() => {
    if (defaultExpand) {
      setExpand(true)
      shotTimer()
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
    (disabled: boolean | undefined, to: () => void) => () => {
      if (disabled) return
      flushSync
        ? flushSync(() => setIsOptionClicked(true))
        : setIsOptionClicked(true)
      to()
    }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`${timer ? 'fixed' : 'hidden'} ${
          expand ? 'fade-in' : 'fade-out'
        } lg:hidden w-full h-screen z-40`}
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.75)',
          top: top ?? 0,
          left: left ?? 0
        }}
      />
      <div
        ref={sidebarRef}
        role="container-sidebar"
        className={composeClasses(
          'bg-gray-50 shadow-lg border-t-0 box-border overflow-hidden h-full fixed z-40',
          'transition-all delay-75 duration-200 ease-in',
          expand ? 'w-60' : 'w-0 lg:w-14'
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
                'fixed ml-2.5 border rounded-full bg-white text-primary cursor-pointer transition-all duration-300 ease-in-out',
                'focus:bg-primary focus:text-white',
                'hover:bg-blue-50',
                expand && 'absolute right-2'
              )}
              onClick={() => {
                setExpand(!expand)
                shotTimer()
              }}
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
                  width={25}
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
            } overflow-y-auto overflow-x-hidden flex-grow`}
          >
            {isLoadingSideBarList ? (
              <SkeletonSideBarList />
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
    </>
  )
}

export default SideBar
