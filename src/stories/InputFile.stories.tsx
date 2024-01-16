import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import InputFile, { InputFileProps } from '../components/Form/Input/InputFile'

export default {
  title: 'Form/InputFile',
  component: InputFile
} as ComponentMeta<typeof InputFile>

const Template: Story<InputFileProps> = (args: InputFileProps) => {
  return <InputFile {...args} />
}

export const Default = Template.bind({})
Default.args = {
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
