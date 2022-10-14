import React from 'react'
import { it, describe, vi } from 'vitest'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import SideBar from '../../src/components/SideBar/SideBar'

describe('Component UI: SideBar', () => {
    let renderResult: RenderResult
    beforeEach(() => {
        renderResult = render(
            <SideBar
                sideBarName={'Name Test'}
                sideBarList={[
                    {
                        title: 'Project information',
                        active: true,
                        to: () => ''
                    },
                    {
                        title: 'Monthly Flow',
                        active: false,
                        to: () => ''
                    },
                    {
                        title: 'Documentation',
                        active: false,
                        to: () => ''
                    }
                ]}
                disabledOptions={[1, 2]}
                disabledOptionsTag="Próximamente"
            />
        )
        vi.useFakeTimers()
    })

    it('SideBar component is working', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('SideBar, when clicking on the icon to expand the sidebar, it opens correctly', () => {
        expect(renderResult.getByRole('container-sidebar').textContent).not.contain('Documentation')

        fireEvent.click(renderResult.getByRole('active-sidebar'))
        vi.advanceTimersByTime(300)
        expect(renderResult.getByRole('container-sidebar').textContent).contain('Documentation')
    })

    it('SideBar, when passing options 1 and 5 as disable props, they are correctly disabled', () => {
        fireEvent.click(renderResult.getByRole('active-sidebar'))

        vi.advanceTimersByTime(300)

        expect(renderResult.getByRole('option-0').textContent).not.contain('Próximamente')
        expect(renderResult.getByRole('option-1').textContent).contain('Próximamente')
        expect(renderResult.getByRole('option-2').textContent).contain('Próximamente')
    })
})
