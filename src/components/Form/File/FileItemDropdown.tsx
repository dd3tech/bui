import { ReactNode } from 'react'
import Dropdown from 'components/Dropdown'
import Circle from 'components/Circle'

export interface FileItemDropdownProps {
  /**
   * Content to display in the dropdown menu
   */
  children: ReactNode
  /**
   * Icon to display in the dropdown trigger
   */
  icon: ReactNode
  /**
   * Additional CSS class names
   */
  className?: string
}

const FileItemDropdown = ({
  className,
  icon,
  children
}: FileItemDropdownProps) => {
  const Icon = icon

  return (
    <Dropdown className={className}>
      <Dropdown.Trigger>
        <Circle
          role="trigger-button"
          width="24px"
          height="24px"
          useBackground={false}
          className="text-blue-500 border border-gray-500 hover:border-blue-500 hover:text-white hover:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-linear cursor-pointer"
        >
          {Icon}
        </Circle>
      </Dropdown.Trigger>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  )
}

export default FileItemDropdown
