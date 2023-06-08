import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BarListComponent from '../components/BarList'

export default {
  title: 'Components/BarList',
  component: BarListComponent
} as ComponentMeta<typeof BarList>

const data = [
  { title: 'Snapchat', value: 0 },
  { title: 'Linkedin', value: 25 },
  { title: 'Twitter', value: 50 },
  { title: 'Facebook', value: 75 },
  { title: 'Instagram', value: 100 }
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
  titlevalues: 'Usuarios',
  className: 'max-w-lg',
  roundedBar: 'lg'
}
