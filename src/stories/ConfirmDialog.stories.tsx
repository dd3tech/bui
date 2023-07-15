import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ConfirmDialogComponent from '../components/ConfirmDialog'

export default {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialogComponent
} as ComponentMeta<typeof ConfirmDialogComponent>

const Template: ComponentStory<typeof ConfirmDialogComponent> = (args) => (
  <ConfirmDialogComponent {...args} />
)

export const ConfirmDialog = Template.bind({})
ConfirmDialog.args = {
  actionContent: (
    <button className="w-52 bg-blue-700 text-white rounded-lg text-center p-2 curosr-pointer">
      Button activator confirm dialog
    </button>
  ),
  children: (
    <div>
      <h1>Hi, im the popover</h1>
    </div>
  ),
  handleConfirm: () => console.log('Confirmed'),
  handleCancel: () => console.log('Canceled')
}
