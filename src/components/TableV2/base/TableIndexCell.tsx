import { ReactNode } from 'react'
import { PencilIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'

export interface IndexCellProps {
  /**
   * Index of the cell
   */
  indexCell: number
  /**
   * Function to call when cell is edited
   */
  onEdit?: () => void
}

const IndexWrapper = ({
  className,
  children,
  onClick
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={composeClasses('absolute top-0 left-0 w-6 h-full', className)}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick()
      }}
    >
      {children}
    </Flex>
  )
}

const IndexCell = ({ onEdit, indexCell }: IndexCellProps) => {
  return (
    <>
      <IndexWrapper className="bg-gray-200 cursor-default">
        {indexCell}
      </IndexWrapper>
      {onEdit && (
        <IndexWrapper
          className="opacity-0 group-hover:opacity-100 bg-blue-700 text-white transition-all duration-200 ease-linear cursor-pointer"
          onClick={onEdit}
        >
          <PencilIcon className="w-3 h-3" />
        </IndexWrapper>
      )}
    </>
  )
}

export default IndexCell
