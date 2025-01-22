import { useCallback, useEffect, useState } from 'react'
import { composeClasses } from 'lib/classes'
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline'
import { Flex } from 'components/Layout'

type unit = `${number}${'px' | 'rem'}`
type SortType = 'ASC' | 'DESC'

export interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   *  Cell content
   */
  children?: React.ReactNode
  /**
   * Set the left sticky distance of the cell
   */
  stickyLeft?: unit
  /**
   * Set the top sticky distance of the cell
   */
  stickyTop?: unit
  /**
   * Set the right sticky distance of the cell
   */
  stickyRight?: unit
  /**
   * Set the bottom sticky distance of the cell
   */
  stickyBottom?: unit
  /**
   * Show sort icon
   */
  showSortIcon?: boolean
  /**
   * Sort event
   */
  onSort?: (sort: SortType) => void
  /**
   * Sort value
   */
  sortValue?: SortType
}

const HeaderCell = ({
  stickyLeft,
  stickyTop,
  stickyRight,
  stickyBottom,
  showSortIcon,
  onSort,
  sortValue,
  ...props
}: HeaderCellProps) => {
  const [sort, setSort] = useState<SortType>(sortValue ? sortValue : 'DESC')

  const handleSort = useCallback(() => {
    const newSort = sort === 'ASC' ? 'DESC' : 'ASC'
    setSort(newSort)
    onSort && onSort(newSort)
  }, [sort, onSort])

  const isSticky = stickyLeft || stickyTop || stickyRight || stickyBottom

  useEffect(() => {
    if (sortValue) {
      setSort(sortValue)
    }
  }, [sortValue])

  return (
    <th
      {...props}
      className={composeClasses(
        props.className,
        'h-8 px-2 text-[10px] text-gray-700 font-semibold text-left'
      )}
      style={{
        position: isSticky && 'sticky',
        left: stickyLeft,
        top: stickyTop,
        right: stickyRight,
        bottom: stickyBottom,
        backgroundColor: isSticky && '#f9fafb',
        zIndex: isSticky && 1,
        ...props.style
      }}
    >
      {showSortIcon ? (
        <Flex alignItems="center" justifyContent="between" gap="1">
          {props.children}
          <button role="sort-button" onClick={handleSort}>
            {sort === 'ASC' ? (
              <SortAscendingIcon className="w-4 h-4" />
            ) : (
              <SortDescendingIcon className="w-4 h-4" />
            )}
          </button>
        </Flex>
      ) : (
        props.children
      )}
    </th>
  )
}

export default HeaderCell
