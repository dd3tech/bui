import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CardComponent from '../components/Card'
import { Button } from '../components'
import Text from '../components/Typography'

export default {
    title: 'Layout/Card'
} as ComponentMeta<typeof CardComponent>

const Template: ComponentStory<typeof CardComponent> = (args) => <CardComponent {...args} />

export const Card = Template.bind({})
Card.args = {
    padding: 0,
    width: 250,
    children: (
        <>
            <div className="pt-4 px-4">
                <Text variant="h5" className="mb-7" bold>
                    Hello World
                </Text>
                <Text className="text-sm">Información sobre el resumen de las viviendas y valor del proyecto.</Text>
            </div>
            <div className="w-full border-t my-6" />
            <div className="px-4 pb-4">
                <Button variant="secondary" className="text-xs font-bold w-full">
                    Ver detalle
                </Button>
            </div>
        </>
    )
}
