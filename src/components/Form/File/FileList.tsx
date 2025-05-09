import React, { ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'
import InputFile, { InputFileProps } from '../Input/InputFile'

export interface FileListProps {
  /**
   * Props for the InputFile component at the top of the list
   */
  inputFileProps?: InputFileProps
  /**
   * Optional header element to display above the file list
   */
  header?: ReactNode
  /**
   * Children components (FileItem or FileImageItem elements)
   */
  children?: ReactNode
  /**
   * Additional CSS class names
   */
  className?: string
}

export const FileList: React.FC<FileListProps> = ({
  inputFileProps,
  header,
  children,
  className
}) => {
  return (
    <Flex
      role="file-list"
      gap="2"
      className={composeClasses(
        'w-full p-2 flex-col bg-gray-50 rounded-lg',
        className
      )}
    >
      {inputFileProps && <InputFile className="bg-white" {...inputFileProps} />}
      {header && (
        <div role="file-list-header" className="w-full mt-2">
          {header}
        </div>
      )}
      {children && (
        <Flex role="file-list-content" gap="2" className="w-full flex-col">
          {children}
        </Flex>
      )}
    </Flex>
  )
}

export default FileList
