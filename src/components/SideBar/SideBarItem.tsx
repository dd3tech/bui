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
import type { SideBarItemPropsBase, TBadge } from './SideBar'
import SideBarBadge from './SideBarBadge'

export interface SideBarItemProps extends SideBarItemPropsBase {
  /**
   * Index of the SideBarItem
   */
  index: number
  /**
   * Indicates if the SideBarItem is expanded
   */
  isExpand: boolean
  /**
   * Indicates if the SideBarItem's option is clicked
   */
  isOptionClicked: boolean
  /**
   * Tag to be displayed for disabled options
   */
  disabledOptionsTag?: string
  /**
   * Function to handle the click event on the SideBarItem
   */
  handleClickOption: (disabled: boolean | undefined, goTo: any) => () => void
  /**
   * Function to toggle the submenu of the SideBarItem
   */
  toggleSubMenu: (menuItemIndex: number, subItemIndex?: number) => void
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
}

interface ListSubItemsProps {
  subItemsArray?: SideBarItemPropsBase[]
  toggleSubMenu?: SideBarItemProps['toggleSubMenu']
  isOpen?: SideBarItemProps['isOpen']
  indexItem: number
  isSubSubItem?: boolean
  badge?: TBadge
}

const ListSubItems = ({
  subItemsArray,
  toggleSubMenu,
  indexItem,
  isOpen,
  isSubSubItem
}: ListSubItemsProps) => {
  const onToggleMenu = (
    subItem: SideBarItemPropsBase,
    indexSubItem: number
  ) => {
    const { subItems, goTo } = subItem

    if (!subItems?.length) {
      goTo?.()
      return
    }

    toggleSubMenu?.(indexItem, indexSubItem)
  }

  return (
    <div>
      <Flex
        className={composeClasses(
          'flex-col transition-all duration-300 ease-out',
          isOpen ? 'mt-1' : 'max-h-0 overflow-hidden',
          !isSubSubItem && 'pl-10 ml-4'
        )}
      >
        {subItemsArray?.map(
          (subItem, index: number) =>
            !subItem.hidden && (
              <div key={`sub-item-${subItem.title}-${index}`}>
                <Flex
                  alignItems="center"
                  gap="2"
                  className={composeClasses(
                    subItem.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                    !subItem.subItems &&
                      'border-l border-gray-300 text-gray-500 -ml-4 pl-3 hover:opacity-75'
                  )}
                  onClick={() => onToggleMenu(subItem, index)}
                >
                  {subItem?.subItems && (
                    <div className="w-4 h-4 -ml-6 text-gray-500">
                      {subItem.isOpen ? (
                        <ChevronUpIcon className="w-full" />
                      ) : (
                        <ChevronDownIcon className="w-full" />
                      )}
                    </div>
                  )}
                  <Text
                    size="sm"
                    className={composeClasses(
                      'whitespace-nowrap overflow-hidden overflow-ellipsis my-2',
                      subItem.disabled ? 'text-gray-300' : 'text-gray-500',
                      subItem.active &&
                        !subItem.subItems &&
                        'font-semibold text-blue-600'
                    )}
                  >
                    {subItem.title}
                  </Text>
                  {subItem?.badge && subItem?.badge}
                </Flex>
                {subItem.subItems && (
                  <ListSubItems
                    indexItem={indexItem}
                    isOpen={subItem.isOpen}
                    subItemsArray={subItem.subItems}
                    toggleSubMenu={toggleSubMenu}
                    isSubSubItem
                  />
                )}
              </div>
            )
        )}
      </Flex>
    </div>
  )
}

const SideBarItem = ({
  index,
  disabled,
  active,
  disabledOptionsTag,
  isOptionClicked,
  subItems = [],
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
  bgActive,
  colorActive
}: SideBarItemProps) => {
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
          subItems?.length && isExpand ? () => toggleSubMenu(index) : goTo
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
                  'w-10 h-8 relative mb-2',
                  active && (bgActive ?? 'bg-gray-200')
                )}
                style={{ borderRadius: 6 }}
              >
                <Flex
                  alignItems="center"
                  className={composeClasses(
                    'w-5 h-5',
                    disabled
                      ? 'text-gray-300'
                      : `${colorActive ?? 'text-gray-500'}`
                  )}
                >
                  <div className="w-6 h-6">
                    {icon || <ExclamationCircleIcon />}
                  </div>
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
          complementPosition={{ top: 40, left: 85 }}
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
            'w-full rounded-r-md h-8 duration-300 ease-in mb-2',
            active
              ? `${bgActive ?? 'bg-gray-200'} ${colorActive ?? 'text-gray-900'}`
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
          {(!!badge || !!subItems.length) && (
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
                  !disabled && subItems.length ? 'visible' : 'invisible'
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
          toggleSubMenu={toggleSubMenu}
          subItemsArray={subItems}
          isOpen={isOpen && !!subItems.length}
          indexItem={index}
        />
      )}
    </div>
  )
}
export default SideBarItem
