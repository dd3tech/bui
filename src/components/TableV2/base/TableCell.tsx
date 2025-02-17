import { HTMLAttributes } from 'react'
import { composeClasses } from 'lib/classes'
import Input, { GenericInputProps } from '../../Form/Input/Input'
import CellText from './TableCellText'
import IndexCell from './TableIndexCell'

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
  /**
   *  Cell variants
   * summary: commonly used to display a row of summaries
   * result: commonly used to display a row of subtotals
   * default: apply the base styles
   */
  variant?: 'result' | 'default' | 'summary' | 'highlight'
  /**
   * Show a shadow when cell is sticky
   */
  stickyShadow?: boolean
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
  stickyShadow,
  indexCell,
  onEdit,
  textClassName,
  defaultValue,
  showDefaultValue,
  cellColor,
  variant = 'default',
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

  const isSticky = stickyLeft || stickyTop || stickyRight || stickyBottom

  const getBackgroundColor = () => {
    if (isSticky) {
      if (cellColor) return cellColorStyle[cellColor]

      switch (variant) {
        case 'summary':
          return '#374151'
        case 'result':
          return '#F9FAFB'
        case 'highlight':
          return '#F3F4F6'
        default:
          return '#FFFFFF'
      }
    }

    return cellColor ? cellColorStyle[cellColor] : undefined
  }

  return (
    <td
      {...props}
      className={composeClasses(
        stickyShadow && 'sticky-shadow',
        disabled && 'text-gray-200',
        error && 'error-100',
        inputProps && 'p-0',
        cellColor
          ? cellColor === 'blue'
            ? 'blue-border'
            : 'white-border'
          : '',
        props.className
      )}
      style={{
        position: isSticky && 'sticky',
        left: stickyLeft,
        top: stickyTop,
        right: stickyRight,
        bottom: stickyBottom,
        backgroundColor: getBackgroundColor(),
        zIndex: isSticky && 1,
        paddingRight: '15px',
        paddingLeft: indexCell ? '30px' : '15px',
        ...props.style
      }}
    >
      {indexCell && <IndexCell onEdit={onEdit} indexCell={indexCell} />}
      {inputProps ? (
        <Input
          paddingX="0"
          style={{ height: '30px', paddingBottom: '3px' }}
          className={composeClasses(
            inputProps.className,
            'w-full border-none bg-transparent hover:bg-transparent focus:border-transparent focus:outline-none',
            `text-${align}`
          )}
          {...inputProps}
        />
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
