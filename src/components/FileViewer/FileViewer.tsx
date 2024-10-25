/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  HTMLProps,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { composeClasses } from 'lib/classes'
import { composeStyles } from 'lib/styles'
import { Portal } from 'common/Portal'

import { DownloadIcon } from '@heroicons/react/outline'
import Button, { IButtonProps } from '../Buttons/Button'
import Text from '../Typography/Text'
import Spinner from '../Spinner'

/** Interfaces */
export interface FileViewerProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode
}

export interface ActionsProps {
  fileName?: string
  status?: ReactNode
  children?: any
  className?: string
  role?: string
  classNameContainer?: string
}

export interface BtnActionProps extends IButtonProps {
  icon?: ReactNode
  classNameIcon?: string
}

export interface FileContentProps {
  url?: string
  fileType: string
  className?: string
  role?: string
}

const IMG_TYPE_LIST = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'gif',
  'bmp',
  'tiff',
  'webp',
  'raw'
]

export function FileViewer({
  children,
  className,
  ...otherProps
}: FileViewerProps) {
  const hasBgColor = useMemo(() => className?.includes('bg-'), [className])
  return (
    <Portal>
      <div className="relative" {...otherProps}>
        <div
          role="viewer-modal"
          className={composeClasses(
            'fixed inset-0 w-full h-screen px-16 py-6 flex flex-col',
            className
          )}
          style={composeStyles([
            {
              backgroundColor: !hasBgColor && 'rgba(17, 24, 39, 0.75)',
              zIndex: '51'
            }
          ])}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

function BtnAction({
  onClick,
  className,
  children,
  icon,
  classNameIcon,
  variant = 'ghost',
  ...otherProps
}: BtnActionProps) {
  return (
    <Button
      {...otherProps}
      className={composeClasses(
        className,
        'w-8 h-8 border border-white hover:bg-white rounded-full flex justify-center items-center text-white hover:text-black'
      )}
      onClick={onClick}
      variant={variant}
    >
      {children && children}
      {!children && icon && icon}
      {!children && !icon && (
        <DownloadIcon
          id="DownloadIcon"
          className={classNameIcon || 'w-5 h-5'}
        />
      )}
    </Button>
  )
}

function ViewerActions({
  children,
  fileName,
  status,
  role,
  classNameContainer,
  className
}: ActionsProps) {
  return (
    <div
      role={role}
      onClick={(e) => e.stopPropagation()}
      className={composeClasses(
        classNameContainer,
        'mb-6 flex justify-between items-center'
      )}
    >
      <div className="flex items-center gap-6">
        <Text size="sm" className="text-white font-medium">
          {fileName}
        </Text>
        {status}
      </div>
      <div
        className={composeClasses(
          className,
          'flex justify-between items-center gap-4'
        )}
      >
        {children}
      </div>
    </div>
  )
}

const FileContent = ({
  url,
  fileType,
  className,
  role = 'viewer-file-container'
}: FileContentProps) => {
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)
  const [attempts, setAttempts] = useState(0)
  const [encodedUrl, setEncodedUrl] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setEncodedUrl(encodeURIComponent(url || ''))
  }, [url])

  useEffect(() => {
    const retry = () => {
      if (attempts >= 5 || isLoaded) {
        timer.current && clearInterval(timer.current)
        return
      }
      setAttempts((prev) => prev + 1)
      setEncodedUrl('')
      setEncodedUrl(encodeURIComponent(url || ''))
    }

    timer.current && clearInterval(timer.current)
    timer.current = setInterval(retry, 2000)
    return () => {
      timer.current && clearInterval(timer.current)
    }
  }, [attempts, isLoaded, url])

  return (
    <>
      {encodedUrl && encodedUrl !== '' ? (
        <div
          role={role}
          className={composeClasses(
            className,
            'w-full h-full flex justify-center items-center rounded-lg overflow-hidden z-50'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {fileType && IMG_TYPE_LIST.includes(fileType) ? (
            <div className="w-full h-full md:w-3/4 md:h-3/4">
              <img
                role="viewer-image"
                src={url}
                alt="file preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <iframe
              onLoad={() => {
                setIsLoaded(true)
              }}
              role="viewer-file"
              className="w-full h-full"
              src={`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`}
            />
          )}
        </div>
      ) : (
        <div
          role="viewer-spinner"
          className="w-full h-full flex justify-center items-center"
        >
          <Spinner pageLoader className="bg-white" />
        </div>
      )}
    </>
  )
}

FileViewer.displayName = 'FileViewer'
FileViewer.FileContent = FileContent
FileViewer.ViewerActions = ViewerActions
FileViewer.BtnAction = BtnAction

export default FileViewer
