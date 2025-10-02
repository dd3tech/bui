/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ChangeEvent, ReactNode, useCallback, useState } from 'react'
import {
  UploadIcon,
  PaperClipIcon,
  TrashIcon,
  DownloadIcon,
  EyeIcon
} from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { composeClasses } from 'lib/classes'
import { Flex } from 'components/Layout'
import Tooltip from 'components/Tooltip'
import { Button } from 'components/Buttons'
import Skeleton from 'components/Skeleton'
import Spinner from 'components/Spinner'
import ProgressBar from '../../ProgressBar/ProgressBar'
import Text from '../../Typography/Text'

export interface InputFileProps extends React.HTMLProps<HTMLInputElement> {
  progressIndicator?: number
  dragMessage?: ReactNode
  title?: string
  subtitle?: string
  error?: { show?: boolean; message?: ReactNode }
  roleContainer?: string
  singleFile?: boolean
  tooltipText?: string
  uploadText?: string
  onView?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDownload?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void
  fileName?: string
  isLoading?: boolean
  isLoadingDelete?: boolean
  isLoadingDownload?: boolean
  isLoadingView?: boolean
}

export function InputFile({
  /**
   * This property works to provide a value to the progress bar when uploading a file
   */
  progressIndicator = 0,
  /**
   * works to put a custom message to the message when doing dragAnDrop
   */
  dragMessage = 'Release here',
  /**
   * is a callback to listen for input changes from outside the component.
   */
  onChange,
  /**
   * the id works so that the label is able to reference the input
   */
  id = 'upload',
  /**
   * It is a text message that goes on top of the box
   */
  title = 'Drag & drop your files',
  /**
   * is the message that goes below the title
   */
  subtitle = 'browse from your device',
  /**
   * works to reference the role of the entire component container, which is not an Input, just a container
   */
  roleContainer,
  /**
   * is an object that can receive 2 props: { show: is a boolean to detect if an error exists, message: is the error message }
   */
  error = {
    show: false,
    message: 'File type not allowed or exceeds the maximum weight'
  },
  /**
   * is a boolean that works to indicate if the input selects a single file or multiple files
   */
  singleFile = false,
  /**
   * is a string that works to indicate the tooltip text
   */
  tooltipText,
  /**
   * is a string that works to indicate the action of the label
   */
  uploadText = 'Upload',
  /**
   * is a function that works to view the file
   */
  onView,
  /**
   * is a function that works to download the file
   */
  onDownload,
  /**
   * is a function that works to delete the file
   */
  onDelete,
  /**
   * is a file that works to set the value of the file
   */
  fileName,
  /**
   * is a boolean that works to indicate if the file is loading
   */
  isLoading,
  /**
   * is a boolean that works to indicate if the file is loading
   */
  isLoadingDelete,
  /**
   * is a boolean that works to indicate if the file is loading
   */
  isLoadingDownload,
  /**
   * is a boolean that works to indicate if the file is loading
   */
  isLoadingView,
  ...otherProps
}: InputFileProps) {
  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [fileList, setFileList] = useState<FileList | null>(null)

  const disabled = otherProps.disabled || false

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      setIsDrag(false)
      setFileList(event.target.files)
      onChange && onChange(event)
    },
    [isDrag, onChange]
  )

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFileList(null)
      onDelete && onDelete(e)
    },
    [onDelete]
  )

  return (
    <label
      role={roleContainer}
      htmlFor={id}
      className={composeClasses(
        'relative w-full p-4 flex flex-col gap-1 border border-dashed bg-white border-gray-400 rounded-xl hover:bg-blue-50',
        isDrag && 'bg-gray-50',
        error?.show && 'border-error',
        disabled && 'cursor-not-allowed'
      )}
    >
      <Flex justifyContent="between" alignItems="center">
        <Flex alignItems="center" gap="2">
          <Text>{title}</Text>
          {tooltipText && (
            <Tooltip content={tooltipText} position="right">
              <InformationCircleIcon className="w-4 h-4 text-gray-900 z-10" />
            </Tooltip>
          )}
        </Flex>
        {!(singleFile && fileList?.length) && (
          <Flex alignItems="center" gap="2">
            <UploadIcon className="w-4 h-4 text-blue-700" />
            <Text variant="small" className="text-blue-700">
              {uploadText}
            </Text>
          </Flex>
        )}
      </Flex>
      <Text textMuted500 style={{ fontSize: '10px' }}>
        {subtitle}
      </Text>
      <div
        className={composeClasses(
          'flex gap-3 items-center',
          error?.show && 'text-error'
        )}
      >
        <input
          {...otherProps}
          type="file"
          id={id}
          onChange={handleChange}
          onDragEnd={() => setIsDrag(false)}
          onDragLeave={() => setIsDrag(false)}
          onDragOver={() => {
            if (disabled) return
            setIsDrag(true)
          }}
          multiple={!singleFile}
          disabled={progressIndicator >= 1 || disabled}
          className={composeClasses(
            'opacity-0 absolute top-0 left-0 bottom-0 right-0',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        />
        {isDrag && !error?.show && (
          <Text className="whitespace-nowrap" style={{ fontSize: '10px' }}>
            {dragMessage}
          </Text>
        )}
        {error?.show && (
          <Text className="whitespace-nowrap" style={{ fontSize: '10px' }}>
            {error.message}
          </Text>
        )}
        {!error?.show && !isDrag && progressIndicator !== 0 && (
          <Flex alignItems="center" gap="2" className="w-full">
            <UploadIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <Flex className="w-full flex-col" gap="1">
              <Text textMuted500 style={{ fontSize: '10px' }}>
                {fileList?.item(0)?.name}
              </Text>
              <ProgressBar
                value={progressIndicator}
                backgroundColor="var(--primary)"
                height="6px"
                bgColorContainer="#EFF6FF"
              />
            </Flex>
          </Flex>
        )}
        {isLoading && <Skeleton className="w-full h-5 rounded-full" />}
        {singleFile &&
          fileName &&
          !error?.show &&
          !isLoading &&
          !progressIndicator && (
            <Flex
              justifyContent="between"
              alignItems="center"
              gap="2"
              className="w-full z-10"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Flex alignItems="center" gap="2">
                <PaperClipIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <Text size="xs" className="whitespace-nowrap">
                  {fileName}
                </Text>
              </Flex>
              <Flex alignItems="center" gap="2">
                {onView && (
                  <Button
                    variant="ghost"
                    padding="0.5"
                    className="rounded-full"
                    onClick={onView}
                  >
                    {isLoadingView ? (
                      <Spinner width="18px" height="18px" color="#1D4ED8" />
                    ) : (
                      <EyeIcon className="w-4 h-4 text-gray-400 flex-shrink-0 cursor-pointer" />
                    )}
                  </Button>
                )}
                {onDownload && (
                  <Button
                    variant="ghost"
                    padding="0.5"
                    className="rounded-full"
                    onClick={onDownload}
                  >
                    {isLoadingDownload ? (
                      <Spinner width="18px" height="18px" color="#1D4ED8" />
                    ) : (
                      <DownloadIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    padding="0.5"
                    className="rounded-full"
                    onClick={handleDelete}
                  >
                    {isLoadingDelete ? (
                      <Spinner width="18px" height="18px" color="#DC2626" />
                    ) : (
                      <TrashIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                  </Button>
                )}
              </Flex>
            </Flex>
          )}
      </div>
    </label>
  )
}

InputFile.displayValue = 'InputFile'

export default InputFile
