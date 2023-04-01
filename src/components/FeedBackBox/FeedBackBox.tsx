import React from 'react'
import Button from '../Buttons/Button'
import Text from '../Typography'
import {
  ExclamationIcon,
  CheckCircleIcon,
  XIcon
} from '@heroicons/react/outline'

export interface FeedBackBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'error' | 'success'
  title: string
  description?: string
  defaultIsClose?: boolean
  onClose?: () => void
  txtCloseBtn?: string
}

function FeedBackBox({
  type,
  title,
  description,
  defaultIsClose = false,
  onClose,
  txtCloseBtn,
  ...props
}: FeedBackBoxProps) {
  const [isClose, setIsClose] = React.useState<boolean>(defaultIsClose || false)

  const closeBox = React.useCallback(() => {
    setIsClose(true)
    if (onClose) {
      onClose()
    }
  }, [])

  if (isClose) {
    return <></>
  }

  return (
    <div
      role="feedback-box"
      className={`w-max border border-${type}-500 p-4 rounded-lg`}
      {...props}
    >
      <div className="flex mb-2">
        {type === 'error' ? (
          <ExclamationIcon className="w-4 h-4 text-error mr-2" />
        ) : (
          <CheckCircleIcon className="w-4 h-4 text-success mr-2" />
        )}
        <Text variant="span" size="xs" className={`text-${type}-500 font-bold`}>
          {title}
        </Text>
        <Text
          variant="span"
          size="xs"
          className="ml-1 text-gray-600 font-semibold"
        >
          {description}
        </Text>
      </div>
      <div>
        <Button
          role="btn-close"
          onClick={closeBox}
          variant="link"
          className="font-semibold flex items-center text-xs"
          padding="0"
        >
          <Text variant="small" size="xs" className="mr-1">
            {txtCloseBtn}
          </Text>
          <XIcon className="w-3 h-3 -mb-0.5" />
        </Button>
      </div>
    </div>
  )
}

export default FeedBackBox
