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
    hintText: 'Subir en formato XML - PDF',
    progressIndicator: 0,
    boxMessage: 'PDF Peso máximo por archivo 20 MB',
    dragMessage: 'Suelta aquí',
    id: 'upload',
    disabled: false,
    label: 'Drag & drop your files or',
    labelAction: 'browse from your device',
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
