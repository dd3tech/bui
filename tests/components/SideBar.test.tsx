import React from 'react'
import { it, describe, vi } from 'vitest'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import SideBar from '../../src/components/SideBar/SideBar'
import { HomeIcon } from '@heroicons/react/outline'

const dangerZoneCallback = vi.fn()
const push = vi.fn()
const flushSync = vi.fn()

describe('Component UI: SideBar', () => {
    let renderResult: RenderResult
    beforeEach(() => {
        renderResult = render(
            <SideBar
                sideBarName={'Name Test'}
                sideBarSubTitle={'Subtitle text'}
                sideBarList={[
                    {
                        title: 'Project information',
                        active: true,
                        to: push,
                        icon: <HomeIcon id="home-icon" />
                    },
                    {
                        title: 'Monthly Flow',
                        active: false,
                        to: push
                    },
                    {
                        title: 'Documentation',
                        active: false,
                        to: push,
                        disabled: true
                    }
                ]}
                flushSync={flushSync}
                disabledOptionsTag="Próximamente"
                dangerZone={{ show: true, text: 'Eliminar proyecto', active: true, callBack: dangerZoneCallback }}
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
        expect(renderResult.getByRole('option-1').textContent).not.contain('Próximamente')
        expect(renderResult.getByRole('option-2').textContent).contain('Próximamente')
    })

    it('SideBar, when click an option redirect to new path', () => {
        fireEvent.click(renderResult.getByRole('option-1'))

        vi.advanceTimersByTime(300)

        expect(push).toHaveBeenCalled()
    })

    it('SideBar, subtitle and title are showing correctly', () => {
        expect(renderResult.getByText('Name Test')).toBeDefined()
        expect(renderResult.getByText('Subtitle text')).toBeDefined()
    })

    it('SideBar, rotate expand button when it is clicked', () => {
        const btnExpand = renderResult.getByRole('active-sidebar')

        fireEvent.click(btnExpand)
        vi.advanceTimersByTime(300)

        expect((btnExpand.firstChild as HTMLElement).className.includes('rotate-0')).toBeTruthy()
    })

    it('SideBar, option is blue when is selected', () => {
        const adornment = renderResult.getByRole('option-icon-0').firstChild as HTMLDivElement
        const icon = renderResult.getByRole('option-icon-0').lastChild as HTMLDivElement
        const option = renderResult.getByRole('option-icon-0').parentElement?.parentElement as HTMLDivElement

        expect(adornment.style.backgroundColor).toBe('rgb(29, 78, 216)')
        expect(icon.className.includes('text-blue-700')).toBeTruthy()
        expect(option.className.includes('bg-blue-50')).toBeTruthy()
    })

    it('SideBar, is showing icon correctly when is passed by props', () => {
        const icon = renderResult.getByRole('option-icon-0').lastChild as HTMLDivElement

        expect(icon.querySelector('svg')?.id).toBe('home-icon')
    })

    it('SideBar, is showing default icon', () => {
        const icon = renderResult.getByRole('option-icon-1').lastChild as HTMLDivElement

        expect(icon.querySelector('svg')).toBeDefined()
    })
})
