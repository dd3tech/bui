import React from 'react'
import { it, describe, vi } from 'vitest'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { SideBar } from '../../src/components'
import { HomeIcon } from '@heroicons/react/outline'

const dangerZoneCallback = vi.fn()
const push = vi.fn()
const flushSync = vi.fn()

const props = {
    sideBarName: 'Name Test',
    sideBarSubTitle: 'Subtitle text',
    sideBarList: [
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
    ],
    disabledOptionsTag: 'Próximamente',
    dangerZone: { show: true, text: 'Eliminar proyecto', active: false, callBack: dangerZoneCallback }
}

describe('Component UI: SideBar', () => {
    let renderResult: RenderResult
    beforeEach(() => {
        renderResult = render(<SideBar {...props} />)
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

    it('SideBar, do not redirect to new path when option is disabled or active', () => {
        const option1 = renderResult.getByRole('option-icon-0') as HTMLDivElement
        const option2 = renderResult.getByRole('option-icon-2') as HTMLDivElement

        fireEvent.click(option1)
        fireEvent.click(option2)

        expect(push).not.toHaveBeenCalled()
    })

    it('SideBar, when click an option redirect to new path', () => {
        fireEvent.click(renderResult.getByRole('option-1'))

        vi.advanceTimersByTime(300)

        expect(flushSync).not.toHaveBeenCalled()
        expect(push).toHaveBeenCalled()
    })

    it('SideBar, execute flushSync function when is passed by props and an option was clicked', () => {
        renderResult.rerender(<SideBar {...props} flushSync={flushSync} />)
        const dangerBtn = renderResult.getByRole('danger-zone').firstChild as HTMLDivElement
        const option = renderResult.getByRole('option-1') as HTMLDivElement

        fireEvent.click(option)
        fireEvent.click(dangerBtn)

        expect(flushSync).toHaveBeenCalledTimes(2)
        expect(push).toHaveBeenCalledTimes(2)
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

    it('SideBar, expand sidebar by default is working', () => {
        renderResult.rerender(<SideBar {...props} defaultExpand={true} />)
        const sidebar = renderResult.getByRole('container-sidebar') as HTMLDivElement

        vi.advanceTimersByTime(300)

        expect(sidebar.className.includes('w-72')).toBeTruthy()
    })

    it('SideBar, hide tooltip when scroll page', () => {
        const icon = renderResult.getByRole('option-icon-1') as HTMLDivElement

        fireEvent.mouseEnter(icon)
        fireEvent.scroll(window, { target: { scrollY: 10 } })

        expect(renderResult.getAllByText('Monthly Flow')[1]).not.toBeDefined()
    })

    it('SideBar, is able to display tooltip after scrolling', () => {
        const option = renderResult.getByRole('option-icon-1') as HTMLDivElement

        fireEvent.mouseEnter(option)
        fireEvent.scroll(window, { target: { scrollY: 10 } })
        vi.advanceTimersByTime(20)
        fireEvent.mouseEnter(option)

        expect(renderResult.getAllByText('Monthly Flow')[1]).toBeDefined()
    })

    it('SideBar, display correct styles when danger zone is active', () => {
        renderResult.rerender(<SideBar {...props} dangerZone={{ ...props.dangerZone, active: true }} />)
        const dangerZone = renderResult.getByRole('danger-zone') as HTMLDivElement
        const dangerZoneText = renderResult.getByRole('danger-zone').firstChild?.lastChild as HTMLDivElement

        expect(dangerZone.className.includes('bg-red-600')).toBeTruthy()
        expect(dangerZoneText.className.includes('text-white')).toBeTruthy()
    })
})
