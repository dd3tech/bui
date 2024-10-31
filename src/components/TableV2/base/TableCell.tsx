import { formatCustomDecimal } from 'dd360-utils'
import Input, { GenericInputProps } from '../../Form/Input/Input'
import { composeClasses } from 'lib/classes'
import Text from 'components/Typography'

type unit = `${number}${'px' | 'rem'}`

export interface CellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   *  Cell content
   */
  children?: React.ReactNode
  /**
   * Mark cell as disabled
   */
  disabled?: boolean
  /**
   * Mark cell with error
   */
  error?: boolean
  /**
   * Props for the input component
   */
  inputProps?: GenericInputProps
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
   * Type of cell
   */
  type?: 'text' | 'link' | 'currency' | 'percentage'
  /**
   * Function to call when cell is clicked
   */
  to?: () => void
}

const Cell = ({
  disabled = false,
  error = false,
  inputProps,
  stickyLeft,
  stickyTop,
  stickyRight,
  stickyBottom,
  type = 'text',
  to,
  ...props
}: CellProps) => {
  //format if child is text
  const format = (child: React.ReactNode) => {
    if (typeof child === 'string') {
      switch (type) {
        case 'currency':
          return (
            <Text className="block text-right">{`$${formatCustomDecimal(
              Number(child)
            )}`}</Text>
          )
        case 'percentage':
          return (
            <Text className="block text-right">{`${Number(child).toFixed(
              2
            )}%`}</Text>
          )
        case 'link':
          return (
            <Text
              className="text-blue-700 cursor-pointer"
              onClick={() => to && to()}
            >
              {child}
            </Text>
          )
        default:
          return child
      }
    } else {
      return child
    }
  }

  return (
    <td
      {...props}
      className={composeClasses(
        (stickyLeft || stickyTop || stickyRight || stickyBottom) && 'sticky',
        disabled && 'text-gray-200',
        error && 'error-100',
        inputProps && 'pt-0 pb-0',
        (type === 'percentage' || type === 'currency') && 'text-right',
        props.className
      )}
      style={{
        left: stickyLeft,
        top: stickyTop,
        right: stickyRight,
        bottom: stickyBottom,
        ...props.style
      }}
    >
      {inputProps ? <Input {...inputProps}></Input> : format(props.children)}
    </td>
  )
}

export default Cell
