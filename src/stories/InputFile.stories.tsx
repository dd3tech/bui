import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import InputFile from '../components/Form/Input/InputFile'

const meta: Meta<typeof InputFile> = {
  title: 'Form/InputFile',
  component: InputFile
}

export default meta
type Story = StoryObj<typeof InputFile>

export const Default: Story = {
  args: {
    progressIndicator: 0,
    dragMessage: 'Suelta aquí',
    id: 'upload',
    disabled: false,
    title: 'Drag & drop your files or',
    subtitle: 'browse from your device',
    singleFile: false,
    onView: () => {
      console.log('onView')
    },
    onDownload: () => {
      console.log('onDownload')
    },
    onDelete: () => {
      console.log('onDelete')
    },
    error: {
      show: false,
      message: (
        <>
          <span>Tipo de archivo no permitido o excede el peso máximo</span>
          <br />
          <span>Intentalo nuevamente</span>
        </>
      )
    }
  }
}
