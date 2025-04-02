import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CardComponent from '../components/Card'
import { Button } from '../components'
import Text from '../components/Typography'

const meta: Meta<typeof CardComponent> = {
  title: 'Layout/Card',
  component: CardComponent
}

export default meta
type Story = StoryObj<typeof CardComponent>

export const Card: Story = {
  args: {
    padding: 0,
    width: 250,
    children: (
      <>
        <div className="pt-4 px-4">
          <Text variant="h5" className="mb-7" bold>
            Hello World
          </Text>
          <Text className="text-sm">
            Información sobre el resumen de las viviendas y valor del proyecto.
          </Text>
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
}
