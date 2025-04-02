import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagIcon, HomeIcon } from '@heroicons/react/outline'
import Text from '../components/Typography'
import TimelineComp from '../components/Timeline'

const meta: Meta<typeof TimelineComp> = {
  title: 'Components/Timeline',
  component: TimelineComp
}

export default meta
type Story = StoryObj<typeof TimelineComp>

const data = [
  {
    titleContent: 'JUNARY',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    oppositeContent: 'Lorem ipsum dolor sit',
    icon: <TagIcon className="w-5 h-5" />,
    dot: {
      variant: 'outlined',
      color: 'warning'
    }
  },
  {
    titleContent: 'FEBRUARY',
    icon: <TagIcon className="w-5 h-5" />,
    dot: {
      variant: 'outlined',
      color: 'error'
    }
  },
  {
    titleContent: 'MARCH',
    content: 'Lorem ipsum dolor sit amet consectetur',
    titleOppositeContent: '14:10 pm',
    icon: <TagIcon className="w-5 h-5" />,
    dot: {
      variant: 'outlined',
      color: 'success'
    }
  },
  {
    titleContent: 'APRIL',
    content: 'Quisquam, voluptatum.',
    titleOppositeContent: '14:10 pm',
    icon: <HomeIcon className="w-5 h-5 text-white" />
  }
]

export const BasicTimeline: Story = {
  args: {
    position: 'left'
  },
  render: (args) => (
    <TimelineComp {...args}>
      {data.map((data, index) => (
        <TimelineComp.Item key={index}>
          <TimelineComp.OppositeContent>
            <Text size="sm" className="text-gray-500">
              {data.titleOppositeContent}
              <p>{data.oppositeContent}</p>
            </Text>
          </TimelineComp.OppositeContent>

          <TimelineComp.Separator>
            <TimelineComp.Dot />
            <TimelineComp.Connector />
          </TimelineComp.Separator>

          <TimelineComp.Content>
            <Text bold>{data.titleContent}</Text>
            <p>{data.content}</p>
          </TimelineComp.Content>
        </TimelineComp.Item>
      ))}
    </TimelineComp>
  )
}

export const Timeline: Story = {
  args: {
    position: 'alternate'
  },
  render: (args) => (
    <TimelineComp {...args}>
      {data.map((data, index) => (
        <TimelineComp.Item key={index}>
          <TimelineComp.OppositeContent className="m-auto">
            <Text size="sm" className="text-gray-500">
              {data.titleOppositeContent}
              <p>{data.oppositeContent}</p>
            </Text>
          </TimelineComp.OppositeContent>

          <TimelineComp.Separator>
            <TimelineComp.Connector />
            <TimelineComp.Dot
              variant={data.dot?.variant as any}
              color={data.dot?.color as any}
            >
              {data.icon}
            </TimelineComp.Dot>
            <TimelineComp.Connector />
          </TimelineComp.Separator>

          <TimelineComp.Content className="m-auto">
            <Text bold>{data.titleContent}</Text>
            <p>{data.content}</p>
          </TimelineComp.Content>
        </TimelineComp.Item>
      ))}
    </TimelineComp>
  )
}
