import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BarListComponent from '../components/BarList'

export default {
  title: 'Components/BarList',
  component: BarListComponent
} as ComponentMeta<typeof BarList>

const data = [
  { label: 'Snapchat', value: 0 },
  { label: 'Linkedin', value: 25 },
  { label: 'Twitter', value: 50 },
  { label: 'Facebook', value: 75 },
  { label: 'Instagram', value: 100 }
]

const Template: ComponentStory<typeof BarListComponent> = ({
  listData,
  titleMetrics,
  titleValues,
  className,
  roundedBar
}) => (
  <BarListComponent
    listData={listData}
    titleMetrics={titleMetrics}
    titleValues={titleValues}
    className={className}
    roundedBar={roundedBar}
  />
)

export const BarList = Template.bind({})
BarList.args = {
  listData: data,
  titleMetrics: 'Redes',
  titleValues: 'Usuarios',
  className: 'max-w-lg',
  roundedBar: 'lg'
}
