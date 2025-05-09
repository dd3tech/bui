import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  ReactNode,
  useState
} from 'react'
import { Flex } from 'components/Layout'
import Text from 'components/Typography'
import BaseInput from '../Input/BaseInput'
import TextArea from '../TextArea'
import FileItem from './FileItem'

export interface FileImageItemProps {
  /**
   * Source URL for the image preview
   */
  src: string
  /**
   * Title of the file
   */
  title: string
  /**
   * Description of the file
   */
  description: string
  /**
   * Placeholder text for the title input
   */
  titlePlaceholder?: string
  /**
   * Placeholder text for the description input
   */
  descriptionPlaceholder?: string
  /**
   * Label for the title input
   */
  titleLabel?: string
  /**
   * Label for the description input
   */
  descriptionLabel?: string
  /**
   * Maximum length for the description text
   */
  descriptionMaxLength?: number
  /**
   * Name of the file to display
   */
  name: string
  /**
   * Type/format of the file
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
   * Children components (typically action buttons)
   */
  children?: ReactNode
  /**
   * Handler for title changes
   */
  onChangeTitle: ChangeEventHandler<HTMLInputElement>
  /**
   * Handler for description changes
   */
  onChangeDescription: ChangeEventHandler<HTMLTextAreaElement>
}

interface stateType {
  title: string
  description: string
}

export const FileImageItem = ({
  name,
  type,
  fileSize,
  src,
  title,
  description,
  titlePlaceholder,
  descriptionPlaceholder,
  titleLabel,
  descriptionLabel,
  descriptionMaxLength = 100,
  className,
  style,
  children,
  onChangeTitle,
  onChangeDescription
}: FileImageItemProps) => {
  const [state, setState] = useState<stateType>({
    title: title || '',
    description: description || ''
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    e.target.name === 'title' &&
      onChangeTitle(e as ChangeEvent<HTMLInputElement>)
    e.target.name === 'description' &&
      onChangeDescription(e as ChangeEvent<HTMLTextAreaElement>)
  }

  return (
    <Flex
      role="file-item-image"
      className="flex-col bg-white rounded-lg pb-2"
      gap="2"
    >
      <FileItem
        name={name}
        type={type}
        fileSize={fileSize}
        className={className}
        style={style}
      >
        {children}
      </FileItem>
      <div
        className="px-4 w-full h-full max-h-[164px] grid gap-4"
        style={{
          gridTemplateColumns: '350px 1fr'
        }}
      >
        <figure
          className="w-full border border-gray-100 rounded-lg overflow-hidden"
          style={{ maxWidth: '350px', height: '164px' }}
        >
          <img
            role="file-image"
            src={src}
            alt="File"
            className="w-full h-full object-cover"
          />
        </figure>
        <Flex className="flex-col" gap="4">
          <BaseInput
            name="title"
            style={{ marginTop: 0 }}
            label={titleLabel}
            placeholder={titlePlaceholder}
            value={state.title}
            onChange={handleChange}
          />
          <Flex className="flex-col gap-2">
            <TextArea
              name="description"
              maxLength={descriptionMaxLength}
              label={descriptionLabel}
              placeholder={descriptionPlaceholder}
              value={state.description}
              onChange={handleChange}
            />
            <Text
              role="file-description-length"
              size="xs"
              textMuted500
              className="text-right"
            >
              {state.description?.length || 0}/{descriptionMaxLength}
            </Text>
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}

export default FileImageItem
