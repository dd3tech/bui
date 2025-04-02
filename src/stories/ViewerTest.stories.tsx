import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ViewerTestComponent from '../components/FileViewer/ViewerTest'

export default {
  title: 'Modals/ViewerTest',
  component: ViewerTestComponent
} as ComponentMeta<typeof ViewerTestComponent>

const Template: ComponentStory<typeof ViewerTestComponent> = () => (
  <ViewerTestComponent />
)

export const ViewerTest = Template.bind({})
ViewerTest.args = {}
