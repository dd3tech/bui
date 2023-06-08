import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BarListComponent from '../components/BarList'

export default {
  title: 'Components/BarList',
  component: BarListComponent
} as ComponentMeta<typeof BarList>

const data = [
  { label: 'Snapchat', value: 0, href: '/' },
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
  roundedBar,
  heightBar,
  classNameBar,
  fontSizeBar,
  marginYItem,
  defaultBackgroundBarColor,
  defaultTextBarColor
}) => (
  <BarListComponent
    listData={listData}
    titleMetrics={titleMetrics}
    titleValues={titleValues}
    className={className}
    roundedBar={roundedBar}
    heightBar={heightBar}
    classNameBar={classNameBar}
    fontSizeBar={fontSizeBar}
    marginYItem={marginYItem}
    defaultBackgroundBarColor={defaultBackgroundBarColor}
    defaultTextBarColor={defaultTextBarColor}
  />
)

export const BarList = Template.bind({})
BarList.args = {
  listData: data,
  titleMetrics: 'Networks',
  titleValues: 'Users',
  className: 'max-w-lg',
  roundedBar: 'md',
  heightBar: 'full',
  classNameBar: '',
  fontSizeBar: 'base',
  marginYItem: '1',
  defaultBackgroundBarColor: '#b5d4fc',
  defaultTextBarColor: '#1D4ED8'
}
