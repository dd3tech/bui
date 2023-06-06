import { it, describe, vi } from 'vitest'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ExclamationIcon, HomeIcon } from '@heroicons/react/outline'
import SideBar from './SideBar'

const dangerZoneCallback = vi.fn()
const push = vi.fn()
const flushSync = vi.fn()

const subItems = {
  1: {
    title: 'SubList 1',
    active: true,
    goTo: push
  },
  2: {
    title: 'SubList 2',
    active: false,
    goTo: push
  }
}

const sideBarList = [
  {
    title: 'Project information',
    active: true,
    isOpen: true,
    icon: <HomeIcon />,
    subItems: subItems,
    badge: 4
  },
  {
    title: 'Monthly Flow',
    active: false,
    isOpen: false,
    subItems: subItems,
    badge: 4
  },
  {
    title: 'Documentation',
    active: false,
    isOpen: false,
    disabled: true,
    subItems: subItems,
    badge: <ExclamationIcon className="w-4 h-4 text-yellow-400" />
  },
  {
    title: 'Sales',
    active: false,
    isOpen: false,
    goTo: push,
    badge: 8
  }
]

const props = {
  sideBarName: 'Name Test',
  sideBarSubTitle: 'Subtitle text',
  sideBarList: sideBarList,
  disabledOptionsTag: 'Próximamente',
  dangerZone: {
    show: true,
    text: 'Eliminar proyecto',
    active: false,
    callBack: dangerZoneCallback
  }
}

describe('<SideBar/>', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<SideBar {...props} />)
    vi.useFakeTimers()
  })

  it('should be render correctly', () => {
    expect(renderResult.container.firstChild).toBeDefined()
  })

  it('danger zone option is displayed when the show property is true', () => {
    expect(renderResult.getByRole('danger-zone')).toBeDefined()
  })

  it('danger zone callback is executed correctly when option is clicked', () => {
    const dangerZone = renderResult.getByRole('danger-zone')
      .firstChild as HTMLDivElement

    fireEvent.click(dangerZone)

    expect(dangerZoneCallback).toHaveBeenCalled()
  })

  it('when clicking on the icon to expand the sidebar, it opens correctly', () => {
    const sidebar = renderResult.getByRole(
      'container-sidebar'
    ) as HTMLDivElement

    fireEvent.click(renderResult.getByRole('active-sidebar'))
    vi.advanceTimersByTime(300)

    expect(sidebar.style.width).toBe('240px')
  })

  it('when passing disabled property as true on the second and third object on the sidebarList, they are correctly disabled', () => {
    fireEvent.click(renderResult.getByRole('active-sidebar'))

    vi.advanceTimersByTime(300)

    expect(renderResult.getByRole('option-0').textContent).not.contain(
      'Próximamente'
    )
    expect(renderResult.getByRole('option-1').textContent).not.contain(
      'Próximamente'
    )
    expect(renderResult.getByRole('option-2').textContent).contain(
      'Próximamente'
    )
  })

  it('do not redirect to new path when option is disabled or active', () => {
    const option1 = renderResult.getByRole('option-icon-0') as HTMLDivElement
    const option2 = renderResult.getByRole('option-icon-2') as HTMLDivElement

    fireEvent.click(option1)
    fireEvent.click(option2)

    expect(push).not.toHaveBeenCalled()
  })

  it('when click an option redirect to new path', () => {
    fireEvent.click(renderResult.getByRole('option-3'))

    vi.advanceTimersByTime(300)

    expect(flushSync).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalled()
  })

  it('execute flushSync function when is passed by props and an option was clicked', () => {
    renderResult.rerender(<SideBar {...props} flushSync={flushSync} />)
    const dangerBtn = renderResult.getByRole('danger-zone')
      .firstChild as HTMLDivElement
    const option = renderResult.getByRole('option-3') as HTMLDivElement

    fireEvent.click(option)
    fireEvent.click(dangerBtn)

    expect(flushSync).toHaveBeenCalledTimes(2)
    expect(push).toHaveBeenCalledTimes(2)
  })

  it('subtitle and title are showing correctly', () => {
    renderResult.rerender(<SideBar {...props} defaultExpand={true} />)
    expect(renderResult.getByText('Name Test')).toBeDefined()
    expect(renderResult.getByText('Subtitle text')).toBeDefined()
  })

  it('rotate expand button when it is clicked', () => {
    const btnExpand = renderResult.getByRole('active-sidebar')

    fireEvent.click(btnExpand)
    vi.advanceTimersByTime(300)

    expect(
      (btnExpand.firstChild as HTMLElement).className.includes('rotate-0')
    ).toBeTruthy()
  })

  it('the active element should have the correct styles', () => {
    const adornment = renderResult.getByRole('option-icon-0')
      .firstChild as HTMLDivElement

    const option = renderResult.getByRole('option-icon-0').parentElement
      ?.parentElement?.parentElement?.lastElementChild as HTMLDivElement

    const icon = renderResult.getByRole('option-icon-0').firstChild
      ?.firstChild as HTMLDivElement

    expect(adornment.className.includes('bg-gray-200')).toBeTruthy()
    expect(option.className.includes('bg-gray-200')).toBeTruthy()
    expect(icon.className.includes('text-gray-500')).toBeTruthy()
  })

  it('is showing default icon', () => {
    const icon = renderResult.getByRole('option-icon-1')
      .lastChild as HTMLDivElement

    expect(icon.querySelector('svg')).toBeDefined()
  })

  it('expand sidebar by default is working', () => {
    renderResult.rerender(<SideBar {...props} defaultExpand={true} />)
    const sidebar = renderResult.getByRole(
      'container-sidebar'
    ) as HTMLDivElement

    vi.advanceTimersByTime(300)

    expect(sidebar.style.width).toBe('240px')
  })

  it('hide tooltip when scroll page', () => {
    const icon = renderResult.getByRole('option-icon-1') as HTMLDivElement

    fireEvent.mouseEnter(icon)
    fireEvent.scroll(window, { target: { scrollY: 10 } })

    expect(renderResult.getAllByText('Monthly Flow')[1]).not.toBeDefined()
  })

  it('is able to display tooltip after scrolling', () => {
    const option = renderResult.getByRole('option-icon-1') as HTMLDivElement

    fireEvent.mouseEnter(option)
    fireEvent.scroll(window, { target: { scrollY: 10 } })
    vi.advanceTimersByTime(20)
    fireEvent.mouseEnter(option)

    expect(renderResult.getAllByText('Monthly Flow')[1]).toBeDefined()
  })

  it('display correct styles when danger zone is active', () => {
    renderResult.rerender(
      <SideBar {...props} dangerZone={{ ...props.dangerZone, active: true }} />
    )
    const dangerZoneText = renderResult.getByRole('danger-zone')
      .lastChild as HTMLDivElement

    expect(dangerZoneText.className.includes('text-white')).toBeTruthy()
  })

  it('element should not be displayed when it has the hidden property', () => {
    renderResult.rerender(
      <SideBar {...props} dangerZone={{ ...props.dangerZone, active: true }} />
    )

    expect(renderResult.getByRole('list-options').children).toHaveLength(4)
  })
})
