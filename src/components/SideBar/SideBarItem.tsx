import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Text from '../Typography'
import ToolTipHover from '../ToolTipHover'
import Flex from '../Layout/Flex'
import { SideBarSubItem, TBadge } from './SideBar'
import SideBarBadge from './SideBarBadge'

export interface SideBarItemProps {
  /**
   * Index of the SideBarItem
   */
  index: number
  /**
   * Indicates if the SideBarItem is disabled
   */
  disabled?: boolean
  /**
   * Indicates if the SideBarItem is active
   */
  active: boolean
  /**
   * Icon element to be displayed
   */
  icon?: JSX.Element
  /**
   * Object with subitems of the SideBarItem
   */
  subItems?: SideBarSubItem
  /**
   * Title of the SideBarItem
   */
  title: string
  /**
   * Indicates if the SideBarItem is expanded
   */
  isExpand: boolean
  /**
   * Badge value to be displayed
   */
  badge?: TBadge
  /**
   * Indicates if the SideBarItem's submenu is open
   */
  isOpen?: boolean
  /**
   * Indicates if the SideBarItem's option is clicked
   */
  isOptionClicked: boolean
  /**
   * Tag to be displayed for disabled options
   */
  disabledOptionsTag?: string
  /**
   * This function will be called only if the main item has no sub items
   */
  goTo?: () => void
  /**
   * Function to handle the click event on the SideBarItem
   */
  handleClickOption: (disabled: boolean | undefined, goTo: any) => () => void
  /**
   * Function to toggle the submenu of the SideBarItem
   */
  toggleSubMenu: (menuItemIndex: number) => void
}

interface ListSubItemsProps {
  subItemsArray: [
    string,
    {
      title: string
      active: boolean
      goTo: () => void
    }
  ][]
  isOpen?: boolean
}

const ListSubItems = ({ subItemsArray, isOpen }: ListSubItemsProps) => (
  <Flex
    className={composeClasses(
      'flex-col ml-7 pl-4 border-l border-gray-300 duration-300 ease-in',
      isOpen ? 'max-h-96 overflow-auto mt-1' : 'max-h-0 overflow-hidden'
    )}
  >
    {subItemsArray?.map(([key, subItem]) => (
      <Text
        key={key}
        size="sm"
        className={composeClasses(
          'text-blue-600 py-2 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis',
          subItem.active && 'font-semibold'
        )}
        onClick={subItem.goTo}
      >
        {subItem.title}
      </Text>
    ))}
  </Flex>
)

const SideBarItem = ({
  index,
  disabled,
  active,
  disabledOptionsTag,
  isOptionClicked,
  subItems,
  isOpen,
  badge,
  isExpand,
  title,
  icon,
  goTo,
  handleClickOption,
  toggleSubMenu
}: SideBarItemProps) => {
  const subItemsArray = subItems ? Object.entries(subItems) : []

  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="start"
        gap="1"
        className={composeClasses(
          'transition-all duration-300 ease-out letter-spacing-negative',
          'hover:text-error',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        )}
        onClick={handleClickOption(
          disabled,
          subItemsArray?.length ? () => toggleSubMenu(index) : goTo
        )}
      >
        <ToolTipHover
          element={
            <Flex
              role={`option-icon-${index}`}
              justifyContent="center"
              alignItems="center"
              className="flex"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                className={composeClasses('w-10 h-8 ', active && 'bg-gray-200')}
                style={{ borderRadius: 6 }}
              >
                <Flex
                  alignItems="center"
                  className={composeClasses(
                    'w-5 h-5',
                    disabled ? 'text-gray-300' : 'text-gray-500'
                  )}
                >
                  {icon || <ExclamationCircleIcon />}
                </Flex>
              </Flex>
            </Flex>
          }
          variantPopup="dark"
          disabled={isExpand || isOptionClicked}
          complementPosition={{ top: 55, left: 85 }}
        >
          {!disabled ? (
            title
          ) : (
            <Flex alignItems="center" gap="1">
              <ClockIcon width={15} />
              {title}
            </Flex>
          )}
        </ToolTipHover>
        <Flex
          alignItems="center"
          justifyContent="between"
          className={composeClasses(
            'w-full rounded-r-md h-8 duration-300 ease-in',
            active ? 'bg-gray-200 text-gray-900' : 'text-gray-500',
            isExpand && '-ml-2 pl-1'
          )}
          style={{ maxWidth: 188 }}
        >
          <Text
            role={`option-${index}`}
            variant="span"
            size="sm"
            className={composeClasses(
              'whitespace-nowrap overflow-hidden overflow-ellipsis',
              disabled && 'text-gray-300'
            )}
          >
            {disabled && (
              <Flex
                alignItems="center"
                gap="1"
                className="italic"
                style={{ fontSize: '10px' }}
              >
                <ClockIcon width={15} />
                {disabledOptionsTag}
              </Flex>
            )}
            {title}
          </Text>

          {(!!badge || !!subItemsArray.length) && (
            <Flex alignItems="center">
              {badge && typeof badge !== 'object' ? (
                <SideBarBadge value={badge} isActive={active} />
              ) : (
                badge
              )}

              <div
                className={composeClasses(
                  'w-4 h-4 ml-2 mr-2.5',
                  !disabled && subItemsArray.length ? 'visible' : 'invisible'
                )}
              >
                {isOpen ? (
                  <ChevronUpIcon className="w-full" />
                ) : (
                  <ChevronDownIcon className="w-full" />
                )}
              </div>
            </Flex>
          )}
        </Flex>
      </Flex>
      {isExpand && (
        <ListSubItems subItemsArray={subItemsArray} isOpen={isOpen} />
      )}
    </div>
  )
}
export default SideBarItem
