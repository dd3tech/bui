import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FileItemComponent from '../components/Form/File/FileItem'
import Text from '../components/Typography/Text'

const meta: Meta<typeof FileItemComponent> = {
  title: 'Form/File/FileItem',
  component: FileItemComponent
}

export default meta
type Story = StoryObj<typeof FileItemComponent>

export const FileItem: Story = {
  args: {
    name: 'Document.pdf'
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <FileItemComponent {...args}>
        <Text size="xs" textMuted500>
          Your Documents
        </Text>
        <FileItemComponent.Button>a</FileItemComponent.Button>
        <FileItemComponent.Button>b</FileItemComponent.Button>
        <FileItemComponent.Button>c</FileItemComponent.Button>
        <FileItemComponent.Dropdown icon="x">a</FileItemComponent.Dropdown>
      </FileItemComponent>
    </div>
  )
}
