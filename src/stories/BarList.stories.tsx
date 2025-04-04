import type { Meta, StoryObj } from '@storybook/react'
import BarListComponent from '../components/BarList'

const data = [
  { label: 'Snapchat', value: 0, href: '/' },
  { label: 'Linkedin', value: 25 },
  { label: 'Twitter', value: 50 },
  { label: 'Facebook', value: 75 },
  { label: 'Instagram', value: 100 }
]

const meta: Meta<typeof BarListComponent> = {
  title: 'Components/BarList',
  component: BarListComponent
}

export default meta
type Story = StoryObj<typeof BarListComponent>

export const BarList: Story = {
  args: {
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
    defaultTextBarColor: '#1D4ED8',
    valuePrefix: '',
    valueSuffix: ''
  }
}
