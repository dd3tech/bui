import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { DownloadCard, IDownloadCardProps } from '../../src/components'

const cardProps: IDownloadCardProps = {
    cancelText: 'No volver a recordarme',
    downloadText: 'Descargar Template',
    description:
        'Descarga el template de excel, llena los campos necesarios y re-sube el archivo para rellenar la tabla. También puedes llenar la tabla manualmente.',
    onClose: vi.fn()
}

describe('<DownloadCard/>', () => {
    it('should be render', () => {
        const { container } = render(<DownloadCard {...cardProps} />)
        expect(container.firstChild).toBeDefined()
    })

    it('if active is false it should not render anything', () => {
        const { container } = render(<DownloadCard {...cardProps} isActive={false} />)
        expect(container.firstChild).toBeNull()
    })

    it('close DownloadCard when click the button(x)', () => {
        const { getByRole, container } = render(<DownloadCard {...cardProps} />)

        const btnCancel = getByRole('btn-close')
        fireEvent.click(btnCancel)

        expect(container.firstChild).toBeNull()
        expect(cardProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('onDownload is passed it should render as botton', () => {
        const { getByRole } = render(<DownloadCard {...cardProps} onDownload={vi.fn()} />)
        expect(getByRole('btn-download').tagName).toBe('BUTTON')
    })

    it('when onDownload is not passed it should render as anchor', () => {
        const { getByRole } = render(<DownloadCard {...cardProps} onDownload={undefined} />)
        expect(getByRole('anchor-download').tagName).toBe('A')
    })
})
