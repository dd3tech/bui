import { useMemo } from 'react'
import { formatCustomDecimal } from 'dd360-utils'
import { composeClasses } from 'lib/classes'
import Text from 'components/Typography'

export interface CellTextProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   *  Cell content
   */
  children?: React.ReactNode
  /**
   * Type of cell
   */
  type?: 'text' | 'link' | 'currency' | 'percentage'
  /**
   * Text alignment
   */
  align?: 'center' | 'left' | 'right'
  /**
   * Function to call when cell is clicked
   */
  to?: () => void
  /**
   * Default value to show
   */
  defaultValue?: string
  /**
   * Show default value
   */
  showDefaultValue?: boolean
  /**
   * Is accordion
   */
  isAccordion?: boolean
}

const CellText = ({
  type = 'text',
  align = 'left',
  defaultValue,
  showDefaultValue,
  children,
  to,
  isAccordion,
  ...props
}: CellTextProps) => {
  const getTextAlignment = () => {
    if (type === 'percentage' || type === 'currency') return 'text-right'
    if (align === 'center') return 'text-center'
    if (align === 'right') return 'text-right'
    return 'text-left'
  }

  const values = useMemo(() => {
    if (type === 'currency') {
      const num = Number(children)
      return {
        value: `${num < 0 ? '-$' : '$'}${formatCustomDecimal(Math.abs(num))}`
      }
    } else if (type === 'percentage') {
      return {
        value: `${Number(children).toFixed(2)}%`
      }
    } else if (type === 'link') {
      return {
        value: children,
        className: 'text-blue-700 hover:text-blue-500 cursor-pointer'
      }
    } else {
      return {
        value: children
      }
    }
  }, [children, type])

  return (
    <Text
      showDefaultValue={showDefaultValue}
      defaultValue={defaultValue}
      className={composeClasses(
        'block',
        props.className,
        values.className,
        getTextAlignment()
      )}
      onClick={(e) => {
        !isAccordion && e.stopPropagation()
        to?.()
      }}
    >
      {values.value}
    </Text>
  )
}

export default CellText
