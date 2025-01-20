import { HTMLAttributes } from 'react'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'
import Input, { GenericInputProps } from '../../Form/Input/Input'
import CellText from './TableCellText'

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
   * Text alignment
   */
  align?: 'center' | 'left' | 'right'
  /**
   * Function to call when cell is clicked
   */
  to?: () => void
  /**
   * Index of the cell
   */
  indexCell?: number
  /**
   * Function to call when cell is edited
   */
  onEdit?: () => void
  /**
   * Class name for the text
   */
  textClassName?: HTMLAttributes<HTMLSpanElement>['className']
  /**
   * Default value to show
   */
  defaultValue?: string
  /**
   * Show default value
   */
  showDefaultValue?: boolean
  /**
   * Cell color
   */
  cellColor?: 'red' | 'green' | 'yellow' | 'blue'
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
  align = 'left',
  indexCell,
  onEdit,
  textClassName,
  defaultValue,
  showDefaultValue,
  cellColor,
  children,
  to,
  ...props
}: CellProps) => {
  const isSimpleChildren =
    typeof children === 'string' ||
    typeof children === 'number' ||
    typeof children === 'undefined'

  const cellColorStyle = {
    red: '#FEE2E2',
    green: '#ECFDF5',
    yellow: '#FFFBEB',
    blue: '#EFF6FF'
  }

  return (
    <td
      {...props}
      className={composeClasses(
        (stickyLeft || stickyTop || stickyRight || stickyBottom) && 'sticky',
        disabled && 'text-gray-200',
        error && 'error-100',
        inputProps && 'pt-0 pb-0',
        cellColor
          ? cellColor === 'blue'
            ? 'blue-border'
            : 'white-border'
          : '',
        props.className
      )}
      style={{
        left: stickyLeft,
        top: stickyTop,
        right: stickyRight,
        bottom: stickyBottom,
        paddingRight: '15px',
        paddingLeft: indexCell ? '30px' : '15px',
        backgroundColor: cellColor ? cellColorStyle[cellColor] : undefined,
        ...props.style
      }}
    >
      {indexCell && (
        <Flex
          alignItems="center"
          justifyContent="center"
          className={composeClasses(
            onEdit && 'hover:bg-blue-300 cursor-pointer',
            'absolute top-0 left-0 w-6 h-full bg-gray-200 transition-all duration-300 ease-linear'
          )}
          onClick={onEdit}
        >
          {indexCell}
        </Flex>
      )}
      {inputProps ? (
        <Input {...inputProps}></Input>
      ) : isSimpleChildren ? (
        <CellText
          type={type}
          align={align}
          defaultValue={defaultValue}
          showDefaultValue={showDefaultValue}
          className={textClassName}
          to={to}
        >
          {children}
        </CellText>
      ) : (
        children
      )}
    </td>
  )
}

export default Cell
