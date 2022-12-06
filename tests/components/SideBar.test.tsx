import React from 'react'
import { it, describe, vi } from 'vitest'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import SideBar from '../../src/components/SideBar/SideBar'

const dangerZoneCallback = vi.fn()
const push = vi.fn()

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
                        to: push
                    },
                    {
                        title: 'Monthly Flow',
                        active: false,
                        to: () => '',
                        disabled: true
                    },
                    {
                        title: 'Documentation',
                        active: false,
                        to: () => '',
                        disabled: true
                    }
                ]}
                disabledOptionsTag="Próximamente"
                dangerZone={{ show: true, text: 'Eliminar proyecto', callBack: dangerZoneCallback }}
            />
        )
        vi.useFakeTimers()
    })

    it('SideBar component is working', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('SideBar, danger zone option is displayed when the show property is true', () => {
        expect(renderResult.getByRole('danger-zone')).toBeDefined()
    })

    it('SideBar, danger zone callback is executed correctly when option is clicked', () => {
        const dangerZone = renderResult.getByRole('danger-zone').firstChild as HTMLDivElement

        fireEvent.click(dangerZone)

        expect(dangerZoneCallback).toHaveBeenCalled()
    })

    it('SideBar, when clicking on the icon to expand the sidebar, it opens correctly', () => {
        const sidebar = renderResult.getByRole('container-sidebar') as HTMLDivElement

        fireEvent.click(renderResult.getByRole('active-sidebar'))
        vi.advanceTimersByTime(300)

        expect(sidebar.className.includes('w-72')).toBeTruthy()
    })

    it('SideBar, when passing disabled property as true on the second and third object on the sidebarList, they are correctly disabled', () => {
        fireEvent.click(renderResult.getByRole('active-sidebar'))

        vi.advanceTimersByTime(300)

        expect(renderResult.getByRole('option-0').textContent).not.contain('Próximamente')
        expect(renderResult.getByRole('option-1').textContent).contain('Próximamente')
        expect(renderResult.getByRole('option-2').textContent).contain('Próximamente')
    })

    it('SideBar, when click an option redirect to new path', () => {
        fireEvent.click(renderResult.getByRole('option-0'))

        vi.advanceTimersByTime(300)

        expect(push).toHaveBeenCalled()
    })
})
