import { ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Button, IButtonProps } from 'components/Buttons'

export interface FileItemButtonProps {
  /**
   * Content to display inside the button
   */
  children: ReactNode
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Function to call when the button is clicked
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean
  /**
   * Button variant style
   */
  variant?: IButtonProps['variant']
  /**
   * Whether the button represents a dangerous action
   */
  isDanger?: boolean
}

const BUTTON_VARIANTS = {
  primary:
    'border-gray-500 text-gray-500 hover:border-blue-500 hover:text-white hover:bg-blue-500',
  secondary:
    'border-gray-500 text-red-500 hover:border-red-500 hover:text-white hover:bg-red-500'
}

const FileItemButton = ({
  children,
  className,
  onClick,
  isLoading,
  variant = 'secondary',
  isDanger,
  ...props
}: FileItemButtonProps) => {
  return (
    <Button
      {...props}
      role="button-file-item"
      className={composeClasses(
        'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-linear',
        BUTTON_VARIANTS[isDanger ? 'secondary' : 'primary'],
        className
      )}
      style={{
        padding: 2
      }}
      onClick={onClick}
      isLoading={isLoading}
      variant={variant}
    >
      {children}
    </Button>
  )
}

export default FileItemButton
