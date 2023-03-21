import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  DownloadCard as DownloadCardComponent,
  IDownloadCardProps
} from '../components/Card'

export default {
  title: 'Layout/Card',
  component: DownloadCardComponent
} as ComponentMeta<typeof DownloadCardComponent>

const Template: ComponentStory<typeof DownloadCardComponent> = (args) => (
  <DownloadCardComponent {...args} />
)

const cardProps: IDownloadCardProps = {
  cancelText: 'No volver a recordarme',
  downloadText: 'Descargar Template',
  description:
    'Descarga el template de excel, llena los campos necesarios y re-sube el archivo para rellenar la tabla. También puedes llenar la tabla manualmente.'
}

export const DownloadCard = Template.bind({})
DownloadCard.args = cardProps
