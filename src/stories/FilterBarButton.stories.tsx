import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { XCircleIcon } from '@heroicons/react/outline'
import FilterBarButton from '../components/Buttons/FilterBarButton'
import { Flex, Text } from '../components'

const meta: Meta<typeof FilterBarButton> = {
  title: 'Buttons/FilterBarButton',
  component: FilterBarButton
}

export default meta
type Story = StoryObj<typeof FilterBarButton>

export const Default: Story = {
  args: {
    label: 'Call to action',
    valueBadge: 5,
    iconLeft: <XCircleIcon width={20} />,
    iconRight: <XCircleIcon width={20} />,
    titlePopover: 'More Filter',
    secondaryButton: {
      label: 'Cancel',
      onClick: () => alert('Cancel')
    },
    primaryButton: {
      label: 'Submit',
      onClick: () => alert('Submit')
    },
    childrenPopover: (
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
