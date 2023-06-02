import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ListComponent from '../components/List'

export default {
  title: 'components/List',
  component: ListComponent
} as ComponentMeta<typeof ListComponent>

const Template: ComponentStory<typeof ListComponent> = ({
  ordered,
  gap,
  gapItem,
  icon,
  iconColor,
  iconSize,
  iconLineHeight,
  prefixLabel,
  suffixLabel
}) => (
  <ListComponent
    ordered={ordered}
    gap={gap}
    gapItem={gapItem}
    icon={icon}
    iconColor={iconColor}
    iconSize={iconSize}
    iconLineHeight={iconLineHeight}
    prefixLabel={prefixLabel}
    suffixLabel={suffixLabel}
  >
    <ListComponent.Item>Hey!</ListComponent.Item>
    <ListComponent.Item>Hey!</ListComponent.Item>
    <ListComponent.Item>Hey!</ListComponent.Item>
  </ListComponent>
)

export const List = Template.bind({})
List.args = {
  ordered: false,
  gap: 5,
  gapItem: 0,
  icon: '•',
  iconColor: '#000',
  iconSize: 15,
  iconLineHeight: 25,
  prefixLabel: '',
  suffixLabel: '.'
}
