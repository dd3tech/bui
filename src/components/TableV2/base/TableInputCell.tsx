import { composeClasses } from 'lib/classes'
import Input, { GenericInputProps } from '../../Form/Input/Input'
import Spinner from 'components/Spinner'
import { Flex } from 'components/Layout'

type unit = `${number}${'px' | 'rem'}`

export interface InputCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
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
  inputProps: GenericInputProps
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
   * Text alignment
   */
  align?: 'center' | 'left' | 'right'
  /**
   * Display a spinner if is loading
   */
  isLoading?: boolean
  /**
   * Applies a blue style to the component.
   */
  isBlue?: boolean
  /**
   * Indicates whether the component is in an error state.
   */
  isError?: boolean
  /**
   * Elements to be rendered inside the component.
   */
  children?: React.ReactNode
}

const InputCell = ({
  disabled = false,
  error = false,
  inputProps,
  stickyLeft,
  stickyTop,
  stickyRight,
  stickyBottom,
  align = 'left',
  isLoading = false,
  isBlue,
  isError,
  children,
  ...props
}: InputCellProps) => {
  const isSticky = stickyLeft || stickyTop || stickyRight || stickyBottom

  return (
    <td
      {...props}
      className={composeClasses(
        disabled && 'text-gray-200 cursor-not-allowed',
        error && 'error-100',
        inputProps && 'p-0',
        props.className,
        isBlue &&
          !isError &&
          !disabled &&
          'bg-blue-100 border-blue-300 border-t border-l border-r',
        isError &&
          !disabled &&
          'bg-red-100 border-red-300 border-t border-l border-r',
        'overflow-hidden'
      )}
      style={{
        position: isSticky && 'sticky',
        left: stickyLeft,
        top: stickyTop,
        right: stickyRight,
        bottom: stickyBottom,
        zIndex: isSticky && 1,
        paddingRight: '15px',
        paddingLeft: '15px',
        ...props.style
      }}
    >
      {isLoading ? (
        <Flex justifyContent="center" className="w-full">
          <Spinner width="16px" height="16px" />
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" className="h-full">
          {children}
          <Input
            isCell
            paddingX="0"
            style={{ maxHeight: '28px', paddingBottom: '3px' }}
            disabled={disabled}
            className={composeClasses(
              'w-full border-none bg-transparent hover:bg-transparent focus:border-transparent focus:outline-none',
              `text-${align}`,
              inputProps.className
            )}
            {...inputProps}
          />
        </Flex>
      )}
    </td>
  )
}

export default InputCell
