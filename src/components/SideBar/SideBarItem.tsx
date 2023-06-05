import { composeClasses } from 'lib/classes'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import Text from '../Typography'
import ToolTipHover from '../ToolTipHover'
import Flex from '../Layout/Flex'
import { ISideBarSubItem, TBadge } from './SideBar'
import SideBarBadge from './SideBarBadge'

export interface SideBarItemProps {
  index: number
  disabled?: boolean
  active: boolean
  icon?: JSX.Element
  subItems?: ISideBarSubItem
  title: string
  isExpand: boolean
  badge?: TBadge
  isOpen?: boolean
  isOptionClicked: boolean
  disabledOptionsTag?: string
  to?: () => void
  handleClickOption: (disabled: boolean | undefined, to: any) => () => void
  toggleSubMenu: (menuItemIndex: number) => void
}

interface IListSubItems {
  subItemsArray: [
    string,
    {
      title: string
      active: boolean
      to: () => void
    }
  ][]
  isOpen?: boolean
}

const ListSubItems = ({ subItemsArray, isOpen }: IListSubItems) => (
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
          'text-blue-600 py-2 min-w-max cursor-pointer',
          subItem.active && 'font-semibold'
        )}
        onClick={subItem.to}
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
  to,
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
          subItemsArray?.length ? () => toggleSubMenu(index) : to
        )}
      >
        <ToolTipHover
          element={
            <Flex
              role={`option-icon-${index}`}
              justifyContent="center"
              alignItems="center"
              className="w-14 flex"
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
                  {icon ? icon : <ExclamationCircleIcon />}
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
            'w-full rounded-r-md h-8 mr-2 duration-300 ease-in',
            active ? 'bg-gray-200 text-gray-900' : 'text-gray-500',
            isExpand && '-ml-4 pl-4'
          )}
        >
          <Text
            role={`option-${index}`}
            variant="span"
            size="sm"
            className={composeClasses(
              'whitespace-nowrap',
              disabled && 'text-gray-300'
            )}
          >
            {disabled && (
              <Flex
                alignItems="center"
                gap="1"
                className=" italic"
                style={{ fontSize: '10px' }}
              >
                <ClockIcon width={15} />
                {disabledOptionsTag}
              </Flex>
            )}
            {title}
          </Text>

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
        </Flex>
      </Flex>
      {isExpand && (
        <ListSubItems subItemsArray={subItemsArray} isOpen={isOpen} />
      )}
    </div>
  )
}
export default SideBarItem
