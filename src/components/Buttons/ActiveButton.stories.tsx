import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ActiveButton as ActiveButtonComponent } from '..'

export default {
    title: 'Design System/Button',
    component: ActiveButtonComponent
} as ComponentMeta<typeof ActiveButtonComponent>

const Template: ComponentStory<typeof ActiveButtonComponent> = (args) => <ActiveButtonComponent {...args} />

export const ActiveButton = Template.bind({})

ActiveButton.args = {
    active: true,
    to: () => alert('Esto puede ser un redirect'),
    children: <>Active Button</>
}
