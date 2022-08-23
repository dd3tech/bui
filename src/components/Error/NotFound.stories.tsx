import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import NotFoundPage from './NotFound'

export default {
    title: 'Design System/Error'
} as ComponentMeta<typeof NotFoundPage>

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />

export const notfound = Template.bind({})

notfound.args = {
    subTitle: 'Page not found',
    returnMessage: "Let's go back to home",
    redirectTo: () => location.reload()
}
