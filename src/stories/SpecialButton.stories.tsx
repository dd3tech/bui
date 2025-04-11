import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { XCircleIcon } from '@heroicons/react/outline'
import SpecialButton from '../components/Buttons/SpecialButton'
import { Flex, Text } from '../components'

const meta: Meta<typeof SpecialButton> = {
  title: 'Buttons/SpecialButton',
  component: SpecialButton
}

export default meta
type Story = StoryObj<typeof SpecialButton>

export const Default: Story = {
  args: {
    label: 'Click me',
    valueBadge: 5,
    iconLeft: {
      icon: <XCircleIcon width={20} />,
      onClick: () => alert('Left icon clicked')
    },
    iconRight: {
      icon: <XCircleIcon width={20} />,
      onClick: () => alert('Right icon clicked')
    },
    titlePopover: 'Filters',
    childrenPopover: (
      <Flex
        justifyContent="center"
        alignItems="center"
        className="border-blue-600 border border-dashed text-primary w-full"
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
