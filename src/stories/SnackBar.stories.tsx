import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SnackBar from '../components/SnackBar/SnackBar'

export default {
  title: 'Layout/SnackBar',
  component: SnackBar
} as ComponentMeta<typeof SnackBar>

const Template: ComponentStory<typeof SnackBar> = (args) => (
  <SnackBar {...args} />
)

export const Snack = Template.bind({})
Snack.args = {
  title: {
    label: 'title'
  },
  description: 'Description Testing',
  buttonGhost: {
    label: 'No volver a mostrar'
  }
}
