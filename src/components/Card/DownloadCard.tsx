import React from 'react'
import {
  InformationCircleIcon,
  DownloadIcon,
  XIcon
} from '@heroicons/react/outline'

import Card from './Card'
import Text from '../Typography'
import { Anchor } from '../Navigation'

export interface IDownloadCardProps {
  onClose?: () => void
  onDownload?: () => void
  downloadURL?: string
  description: string
  downloadText: string
  cancelText: string
  LinkComponent?: React.ComponentType<any>
  isActive?: boolean
  width?: number
}

const DownloadCard = ({
  onClose,
  onDownload,
  downloadURL,
  description,
  downloadText,
  cancelText,
  LinkComponent,
  isActive = true,
  width
}: IDownloadCardProps) => {
  const [show, setShow] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setShow(false)
    onClose && onClose()
  }, [])

  React.useLayoutEffect(() => {
    setShow(isActive)
  }, [isActive])

  if (!show) {
    return <></>
  }

  return (
    <Card role="downloadCard" width={width} className="text-xs mb-6">
      <div className="flex gap-2">
        <div className="mt-0.5">
          <InformationCircleIcon className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <Text className="text-gray-500" variant="span">
            {description}
          </Text>
          <div className="flex gap-7 mt-3">
            {onDownload && (
              <button onClick={onDownload} role="btn-download">
                <Text
                  className="text-blue-600 underline flex gap-2 items-center cursor-pointer"
                  bold
                >
                  {downloadText}
                  <DownloadIcon className="w-3.5 h-3.5" />
                </Text>
              </button>
            )}
            {!onDownload && (
              <Anchor
                LinkComponent={LinkComponent}
                to={downloadURL}
                target="_blank"
                download
                role="anchor-download"
              >
                <Text
                  className="text-blue-700 underline flex gap-2 items-center cursor-pointer"
                  bold
                >
                  {downloadText}
                  <DownloadIcon className="w-3.5 h-3.5" />
                </Text>
              </Anchor>
            )}
            <button role="btn-close" onClick={handleClose}>
              <Text
                className="underline flex gap-2 items-center cursor-pointer"
                bold
              >
                {cancelText} <XIcon className="w-3.5 h-3.5" />
              </Text>
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

DownloadCard.displayName = 'DownloadCard'

export default DownloadCard
