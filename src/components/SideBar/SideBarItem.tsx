/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Text from '../Typography'
import Flex from '../Layout/Flex'
import ToolTipHover from '../ToolTipHover'
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
  /**
   * Function to toggle the children submenu of the SideBarItem
   */
  toggleChildrenSubMenu: (e: number) => void
  /**
   * Array that holds the indices of open child items in the submenu.
   */
  openChildrenItems: number[]
  /**
   * Badge color
   * @default 'bg-blue-500'
   */
  badgeColor?: string
  /**
   * Badge text color
   * @default 'text-white'
   */
  badgeTextColor?: string
  /**
   * background item active
   * @default 'bg-gray-200'
   */
  backgroundItemActive?: string
  /**
   * color text item active
   * @default 'text-gray-200'
   */
  colorTextItemActive?: string
}

interface ListChildrenSubItemsProps {
  childrenSubItem: {
    title: string
    goTo: () => void
    active: boolean
    hidden?: boolean
  }[]
}

interface ListSubItemsProps {
  subItemsArray: [
    string,
    {
      title: string
      active: boolean
      goTo: () => void
      childrenSubItem?: ListChildrenSubItemsProps
      isOpen?: boolean
    }
  ][]
  isOpen?: boolean
  openChildrenItems: number[]
  toggleChildrenSubMenu: (e: number) => void
}

const ListSubItems = ({
  subItemsArray,
  isOpen,
  openChildrenItems,
  toggleChildrenSubMenu
}: ListSubItemsProps) => {
  return (
    <div>
      <Flex
        className={composeClasses(
          'flex-col ml-7 pl-4 duration-150 ease-in',
          isOpen ? 'mt-1' : 'max-h-0 overflow-hidden'
        )}
      >
        {subItemsArray?.map(([key, subItem], index: number) => (
          <div key={key}>
            <Flex
              alignItems="center"
              gap="2"
              className={composeClasses(
                'cursor-pointer',
                !subItem?.childrenSubItem &&
                  'border-l border-gray-300 text-gray-500 -ml-4 pl-3 hover:bg-gray-100'
              )}
              onClick={() => {
                subItem.childrenSubItem
                  ? toggleChildrenSubMenu(index)
                  : subItem.goTo()
              }}
            >
              {subItem?.childrenSubItem && (
                <div className={composeClasses('w-4 h-4 -ml-6 text-gray-500')}>
                  {openChildrenItems.includes(index) ? (
                    <ChevronUpIcon className="w-full" />
                  ) : (
                    <ChevronDownIcon className="w-full" />
                  )}
                </div>
              )}
              <Text
                size="sm"
                className={composeClasses(
                  'cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis',
                  subItem.active && !subItem.childrenSubItem
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-500 py-2'
                )}
              >
                {subItem.title}
              </Text>
            </Flex>
            {subItem.childrenSubItem &&
              (openChildrenItems.includes(index) || subItem.isOpen) && (
                <ListChildrenSubItems
                  childrenSubItem={Object.values(subItem?.childrenSubItem)}
                />
              )}
          </div>
        ))}
      </Flex>
    </div>
  )
}

const ListChildrenSubItems = ({
  childrenSubItem
}: ListChildrenSubItemsProps) => {
  return (
    <Flex
      className={composeClasses(
        'flex-col pl-4 -ml-4 border-l border-gray-300 cursor-pointer'
      )}
    >
      {childrenSubItem.map((children) => (
        <Flex className="flex-col" onClick={children.goTo} key={children.title}>
          <Text
            className={composeClasses(
              'py-1 cursor-pointer whitespace-nowrap overflow-hidden -ml-4 px-4 overflow-ellipsis hover:bg-gray-100',
              children.active ? 'text-blue-600' : 'text-gray-500',
              children.hidden && 'hidden'
            )}
            size="sm"
          >
            {children.title}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}

const SideBarItem = ({
  index,
  disabled,
  active,
  disabledOptionsTag,
  isOptionClicked,
  subItems,
  isOpen,
  badge,
  badgeColor = 'bg-blue-600',
  badgeTextColor = 'text-white',
  isExpand,
  title,
  icon,
  goTo,
  handleClickOption,
  toggleSubMenu,
  toggleChildrenSubMenu,
  openChildrenItems,
  backgroundItemActive,
  colorTextItemActive
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
          subItemsArray?.length && isExpand ? () => toggleSubMenu(index) : goTo
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
                className={composeClasses(
                  'w-10 h-8 relative',
                  active && (backgroundItemActive ?? 'bg-gray-200')
                )}
                style={{ borderRadius: 6 }}
              >
                <Flex
                  alignItems="center"
                  className={composeClasses(
                    'w-5 h-5',
                    disabled
                      ? 'text-gray-300'
                      : `${colorTextItemActive ?? 'text-gray-500'}`
                  )}
                >
                  {icon || <ExclamationCircleIcon />}
                </Flex>
                {!!badge && !isExpand && (
                  <div
                    className={composeClasses(
                      badgeColor,
                      'absolute w-2.5 h-2.5 top-1 right-1 rounded-full'
                    )}
                  />
                )}
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
            active
              ? `${backgroundItemActive ?? 'bg-gray-200'} ${
                  colorTextItemActive ?? 'text-gray-900'
                }`
              : 'text-gray-500',
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
                className="italic mt-2"
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
                <SideBarBadge
                  value={badge}
                  badgeColor={badgeColor}
                  badgeTextColor={badgeTextColor}
                />
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
        <ListSubItems
          toggleChildrenSubMenu={toggleChildrenSubMenu}
          openChildrenItems={openChildrenItems}
          subItemsArray={subItemsArray}
          isOpen={isOpen}
        />
      )}
    </div>
  )
}
export default SideBarItem
