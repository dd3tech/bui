import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FileList from '../components/Form/File/FileList'
import FileItem from '../components/Form/File/FileItem'
import FileImageItem from '../components/Form/File/FileImageItem'
import Text from '../components/Typography/Text'
import { Flex } from '../components/Layout'

const meta: Meta<typeof FileList> = {
  title: 'Form/File/FileList',
  component: FileList
}

export default meta
type Story = StoryObj<typeof FileList>

export const Default: Story = {
  args: {
    inputFileProps: {
      title: 'Upload your files',
      subtitle: 'Drag & drop or browse from your device'
    },
    header: (
      <Flex justifyContent="between" alignItems="center" className="px-4 mt-2">
        <Text size="xs" textMuted500>
          Your Documents
        </Text>
        <Text size="xs" textMuted500>
          Actions
        </Text>
      </Flex>
    ),
    children: (
      <>
        <FileItem
          name="presentation.pptx"
          type="application/vnd.ms-powerpoint"
          fileSize={1024}
        >
          <FileItem.Button>A</FileItem.Button>
          <FileItem.Button>B</FileItem.Button>
          <FileItem.Button>C</FileItem.Button>
        </FileItem>
      </>
    )
  }
}

export const WithImageFiles: Story = {
  args: {
    inputFileProps: {
      title: 'Upload your images',
      subtitle: 'Drag & drop or browse from your device'
    },
    header: (
      <Flex justifyContent="between" alignItems="center" className="px-4 mt-2">
        <Text size="xs" textMuted500>
          Your Documents
        </Text>
        <Text size="xs" textMuted500>
          Actions
        </Text>
      </Flex>
    ),
    children: (
      <>
        <FileImageItem
          name="photo1.jpg"
          type="image/jpeg"
          fileSize={1250}
          src="https://picsum.photos/400/600"
          title="Vacation Photo"
          description="Photo from our last vacation"
          onChangeTitle={(e) => console.log('Title changed:', e.target.value)}
          onChangeDescription={(e) =>
            console.log('Description changed:', e.target.value)
          }
        />
        <FileImageItem
          name="photo2.jpg"
          type="image/jpeg"
          fileSize={980}
          src="https://picsum.photos/401/600"
          title="Office Meeting"
          description="Team building activity"
          onChangeTitle={(e) => console.log('Title changed:', e.target.value)}
          onChangeDescription={(e) =>
            console.log('Description changed:', e.target.value)
          }
        />
      </>
    )
  }
}
