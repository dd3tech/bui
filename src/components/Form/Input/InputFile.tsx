import { ChangeEvent, ReactNode, useCallback, useState } from 'react'
import UploadIcon from '@heroicons/react/outline/UploadIcon'
import ProgressBar from '../../ProgressBar/ProgressBar'
import { composeClasses } from 'lib/classes'
import Text from '../../Typography/Text'

export interface InputFileProps extends React.HTMLProps<HTMLInputElement> {
  progressIndicator?: number
  hintText?: string
  boxMessage?: string
  dragMessage: ReactNode
  label?: string
  labelAction?: string
  error?: { show?: boolean; message?: ReactNode }
  roleContainer?: string
}

function InputFile({
  /**
   * This property works to provide a value to the progress bar when uploading a file
   */
  progressIndicator = 0,
  /**
   * works to put a text as a suffix of the Input box
   */
  hintText,
  /**
   * works to put a custom message to the message when doing dragAnDrop
   */
  dragMessage,
  /**
   * Indicates the message that goes in the middle of the box where the files are dropped.
   */
  boxMessage,
  /**
   * is a callback to listen for input changes from outside the component.
   */
  onChange,
  /**
   * the id works so that the label is able to reference the input
   */
  id,
  /**
   * It is a text message that goes on top of the box
   */
  label,
  /**
   * is the message that works to call the Input and with this upload files from a text button
   */
  labelAction,
  /**
   * works to reference the role of the entire component container, which is not an Input, just a container
   */
  roleContainer,
  /**
   * is an object that can receive 2 props: { show: is a boolean to detect if an error exists, message: is the error message }
   */
  error,
  ...otherProps
}: InputFileProps) {
  const [isDrag, setIsDrag] = useState(false)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsDrag(false)
      onChange && onChange(event)
    },
    [isDrag, onChange]
  )

  const getBannerMessage = useCallback((): ReactNode => {
    if (error?.show && error.message) return error?.message
    if (isDrag) return dragMessage
    return boxMessage
  }, [error?.message, isDrag, dragMessage, boxMessage])

  return (
    <div role={roleContainer}>
      <Text variant="p" className="mb-2 text-xs text-gray-400">
        {label}{' '}
        <label
          htmlFor={id}
          className="text-primary underline underline-offset-1 cursor-pointer leading-6"
        >
          {labelAction}
        </label>
      </Text>
      <label
        role="border"
        htmlFor={id}
        className={composeClasses(
          'border relative h-20 border-gray-400 rounded-xl w-full flex items-center justify-center text-gray-400 gap-3 mb-2 hover:bg-gray-50',
          !isDrag && 'border-dotted',
          isDrag && 'border-dashed bg-gray-50'
        )}
      >
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
            onDragOver={() => setIsDrag(true)}
            disabled={progressIndicator >= 1}
            className="opacity-0 absolute top-0 left-0 bottom-0 right-0 cursor-pointer"
          />
          <UploadIcon className="w-5 h-5" />
          <div className="flex flex-col gap-1">
            <Text variant="small" className="text-center">
              {getBannerMessage()}
            </Text>
            {!error?.show && !isDrag && progressIndicator !== 0 && (
              <ProgressBar
                value={progressIndicator}
                backgroundColor="var(--primary)"
                height="6px"
                bgColorContainer="#EFF6FF"
              />
            )}
          </div>
        </div>
      </label>
      {hintText && (
        <Text
          style={{ fontSize: '10px' }}
          variant="p"
          className="italic text-info font-semibold"
        >
          {hintText}
        </Text>
      )}
    </div>
  )
}

InputFile.displayValue = 'InputFile'

InputFile.defaultProps = {
  hintText: 'Subir en formato PDF y firmado por todas las partes (si aplica).',
  progressIndicator: 0,
  boxMessage: 'PDF Peso máximo por archivo 20 MB',
  dragMessage: 'Suelta aquí',
  id: 'upload',
  label: 'Drag & drop your files or',
  labelAction: 'browse from your device',
  error: {
    show: false,
    message: 'Tipo de archivo no permitido o excede el peso máximo'
  }
}

export default InputFile
