import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { XCircleIcon } from '@heroicons/react/outline'
import ComboSelectComponent from '../components/Form/ComboSelect'
import { Flex, Text } from '../components'

const meta: Meta<typeof ComboSelectComponent> = {
  title: 'Form/ComboSelect',
  component: ComboSelectComponent
}

export default meta
type Story = StoryObj<typeof ComboSelectComponent>

export const ComboSelect: Story = {
  args: {
    label: 'Call to action',
    submitText: 'Submit',
    clearText: 'Cancel',
    onSubmit: () => alert('Submit'),
    onClear: () => alert('Cancel'),
    children: (
      <Flex
        justifyContent="center"
        alignItems="center"
        className="border-blue-600 border border-dashed text-primary w-full rounded-lg"
        style={{ backgroundColor: '#EFF6FF', height: 150 }}
      >
        <Flex
          className="w-full flex-col"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <XCircleIcon width={20} />
          <Text className="px-2 whitespace-nowrap" size="xs">
            Remplace me with an auto layout local component or global component
          </Text>
        </Flex>
      </Flex>
    )
  }
}
