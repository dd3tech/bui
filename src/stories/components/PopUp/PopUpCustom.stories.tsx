import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PopUpCustom as PopUpCustomComponent } from '../../../components'

export default {
    title: 'Design System/PopUp/PopUpCustom',
    component: PopUpCustomComponent
} as ComponentMeta<typeof PopUpCustomComponent>

const Template: ComponentStory<typeof PopUpCustomComponent> = (args) => <PopUpCustomComponent {...args} />

export const PopUpCustom = Template.bind({})
PopUpCustom.args = {
    children: (
        <>
            <div className="flex items-center justify-center h-full">
                <div className="pt-10 pl-14 pr-14">Hola este es el PopUpCustom</div>
            </div>
        </>
    ),
    active: true,
    width: '500px',
    height: '500px'
}
