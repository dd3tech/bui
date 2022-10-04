import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { DownloadCard, IDownloadCardProps } from '../../src/components'

const cardProps: IDownloadCardProps = {
    cancelText: 'No volver a recordarme',
    downloadText: 'Descargar Template',
    description:
        'Descarga el template de excel, llena los campos necesarios y re-sube el archivo para rellenar la tabla. También puedes llenar la tabla manualmente.'
}

describe('DownloadCard component', () => {
    const setClose = vi.fn()
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<DownloadCard {...cardProps} isActive={false} onClose={setClose} />)
    })

    it('the DownloadCard is closed', () => {
        expect(renderResult.container.firstChild).toBeNull()
    })

    it('the DownloadCard is open', () => {
        renderResult.rerender(<DownloadCard {...cardProps} isActive onClose={setClose} />)
        const card = renderResult.getByRole('downloadCard')
        expect(card.className).toContain('visible')
    })

    it('DownloadCard width prop is working', () => {
        renderResult.rerender(<DownloadCard {...cardProps} isActive width={650} onClose={setClose} />)
        const card = renderResult.getByRole('downloadCard')
        expect(card.style.width).toBe('650px')
    })

    it('close DownloadCard when click the button(x)', () => {
        renderResult.rerender(<DownloadCard {...cardProps} onClose={setClose} />)
        const btnCancel = renderResult.getByRole('btn-close')
        fireEvent.click(btnCancel)
        expect(renderResult.container.firstChild).toBeNull()
    })
})
