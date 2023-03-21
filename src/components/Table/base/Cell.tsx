import Input, { GenericInputProps } from '../../Form/Input/Input'
import { composeClasses } from 'lib/classes'

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
}

const Cell = ({
  disabled = false,
  error = false,
  inputProps,
  stickyLeft,
  stickyTop,
  stickyRight,
  stickyBottom,
  ...props
}: CellProps) => {
  return (
    <td
      {...props}
      className={composeClasses(
        (stickyLeft || stickyTop || stickyRight || stickyBottom) && 'sticky',
        disabled && 'text-gray-200',
        error && 'bg-red-100',
        inputProps && 'pt-0 pb-0',
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
      {inputProps ? <Input {...inputProps}></Input> : props.children}
    </td>
  )
}

export default Cell
