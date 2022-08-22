import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ImageIcon as ImageIconComponent } from './ImageIcon'

export default {
    title: 'Design System/imageIcon'
} as ComponentMeta<typeof ImageIconComponent>

const Template: ComponentStory<typeof ImageIconComponent> = (args) => <ImageIconComponent {...args} />

export const Example = () => {
    return (
        <>
            <div className="flex">
                <div className="mr-5">
                    <h2>Image Icon</h2>
                    <ImageIconComponent src="https://picsum.photos/200/300?grayscale" />
                </div>
                <div className="mr-5">
                    <h2>Button Image Icon</h2>
                    <ImageIconComponent src="https://picsum.photos/200/300?grayscale" button buttonOnClick={() => alert('Button')} />
                </div>
            </div>
        </>
    )
}

export const ImageIcon = Template.bind({})
ImageIcon.args = {
    src: 'https://picsum.photos/200/300?grayscale'
}

export const ButtonImageIcon = Template.bind({})
ButtonImageIcon.args = {
    src: 'https://picsum.photos/200/300?grayscale',
    button: true,
    buttonOnClick: () => alert('Button')
}
