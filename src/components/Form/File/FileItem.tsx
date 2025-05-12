import { CSSProperties, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'
import ToolTipHover from 'components/ToolTipHover'
import Text from 'components/Typography'
import FileItemButton from './FileItemButton'
import FileItemDropdown from './FileItemDropdown'

export interface FileItemProps {
  /**
   * Name of the file to display
   */
  name: string
  /**
   * Type/format of the file (e.g., 'application/pdf')
   */
  type: string
  /**
   * Size of the file in KB (optional)
   */
  fileSize?: number
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Custom CSS styles
   */
  style?: CSSProperties
  /**
   * Children components (typically FileItemButton or FileItemDropdown elements)
   */
  children?: ReactNode
}

export const FileItem = ({
  name,
  type,
  fileSize,
  className,
  style,
  children
}: FileItemProps) => {
  return (
    <div
      role="file-item"
      className={composeClasses(
        'w-full h-10 px-4 rounded-lg grid items-center bg-white transition duration-300 ease-out focus:ease-in',
        className
      )}
      style={{
        gridTemplateColumns: '1fr auto',
        ...style
      }}
    >
      <Flex alignItems="center" gap="2" className="mr-auto overflow-hidden">
        <ToolTipHover
          variantPopup="dark"
          complementPosition={{ top: -15, left: 0 }}
          element={
            <Flex alignItems="center" justifyContent="start">
              <div className="truncate">
                <Text role="file-title" size="xs">
                  {name}
                </Text>
              </div>
              {fileSize && (
                <Text role="file-size" className="mt-0.5 ml-0.5" size="xs">
                  {fileSize} KB
                </Text>
              )}
            </Flex>
          }
        >
          <Text
            role="file-name"
            variant="small"
            className="block text-left truncate"
          >
            {name}
          </Text>
          <Text role="file-type" variant="small" className="block text-left">
            {type}
          </Text>
        </ToolTipHover>
      </Flex>
      <div
        role="file-actions"
        className="grid items-center gap-3"
        style={{
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(auto-fit, auto)'
        }}
      >
        {children}
      </div>
    </div>
  )
}

FileItem.Button = FileItemButton
FileItem.Dropdown = FileItemDropdown
FileItem.displayName = 'FileItem'

export default FileItem
