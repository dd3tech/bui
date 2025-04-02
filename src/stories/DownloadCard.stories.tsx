import type { Meta, StoryObj } from '@storybook/react'
import {
  DownloadCard as DownloadCardComponent,
  IDownloadCardProps
} from '../components/Card'

const cardProps: IDownloadCardProps = {
  cancelText: 'No volver a recordarme',
  downloadText: 'Descargar Template',
  description:
    'Descarga el template de excel, llena los campos necesarios y re-sube el archivo para rellenar la tabla. También puedes llenar la tabla manualmente.'
}

const meta: Meta<typeof DownloadCardComponent> = {
  title: 'Layout/Card',
  component: DownloadCardComponent
}

export default meta
type Story = StoryObj<typeof DownloadCardComponent>

export const DownloadCard: Story = {
  args: cardProps
}
