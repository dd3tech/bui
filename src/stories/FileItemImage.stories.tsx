import { ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FileImageItemComponent from '../components/Form/File/FileImageItem'

const meta: Meta<typeof FileImageItemComponent> = {
  title: 'Form/File/FileImageItem',
  component: FileImageItemComponent
}

export default meta
type Story = StoryObj<typeof FileImageItemComponent>

export const FileImageItem: Story = {
  args: {
    name: 'Document.pdf',
    type: 'application/pdf',
    fileSize: 123,
    src: 'https://picsum.photos/400/600',
    title: 'Title',
    description: 'Description',
    titlePlaceholder: 'Title Placeholder',
    descriptionPlaceholder: 'Description Placeholder',
    titleLabel: 'Title Label',
    descriptionLabel: 'Description Label',
    descriptionMaxLength: 100,
    onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => {
      console.log(e.target.value)
    },
    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value)
    }
  }
}
