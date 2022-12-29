import { useState } from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { beforeEach, describe, it } from 'vitest'
import { TabGroup, Tab, TabPanel, ITabGroupProps } from './index'

const defaultProps: ITabGroupProps = {
    childClassName: '',
    className: '',
    orientation: 'vertical',
    disabledText: 'Próximamente',
    indicatorColor: 'rgb(59, 130, 246)',
    variant: 'secondary',
    textColor: 'rgb(59, 130, 246)',
    wideLine: 3.2
}

const initialValue = 2

const BasicTabs = (props: ITabGroupProps) => {
    const [value, setValue] = useState(initialValue)

    return (
        <div data-testid="container">
            <TabGroup {...props} role="tablist" data-testid="tab-group" aria-label="basic tabs example" value={value} onChange={setValue}>
                <Tab label="Precio y absorción" />
                <Tab data-testid="disabled" label="Competencia" disabled />
                <Tab label="Insights de mercado históricos" />
            </TabGroup>
            <TabPanel value={value} index={0}>
                <p>Item one</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <p>Item Two</p>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <p>Item Three</p>
            </TabPanel>
        </div>
    )
}

describe('<TabGroup /> variant="primary ', () => {
    it('Indication bar is renderer: orientation="horizontal"', () => {
        const props: ITabGroupProps = { ...defaultProps, orientation: 'horizontal', variant: 'primary', wideLine: 3.5 }
        const result = render(<BasicTabs {...props} />)
        const indicationBar = result.getByRole('indication-bar')

        expect(indicationBar).toBeDefined()
        expect(indicationBar.style.height).toBe('3.5px')
        expect(indicationBar.style.backgroundColor).toBe(defaultProps.indicatorColor)
    })

    it('Indication bar orientation="vertical"', () => {
        const props: ITabGroupProps = { ...defaultProps, variant: 'primary', indicatorColor: 'bg-purple-500', wideLine: 3.5 }
        const result = render(<BasicTabs {...props} />)
        const indicationBar = result.getByRole('indication-bar')

        expect(indicationBar).toBeDefined()
        expect(indicationBar.style.right).toBe('0px')
        expect(indicationBar.style.width).toBe('3.5px')
        expect(indicationBar.className).toContain('bg-purple-500')
    })

    it('<Tab /> was renderer: orientation="vertical"', () => {
        const props: ITabGroupProps = { ...defaultProps, variant: 'primary', orientation: 'horizontal', textColor: 'rgb(89, 22, 201)' }
        const result = render(<BasicTabs {...props} />)
        const currentTab = result.getAllByRole('tab')[initialValue]

        expect(currentTab.style.color).toEqual('rgb(89, 22, 201)')
        expect(currentTab.className).toContain('font-bold')
        expect(currentTab.getAttribute('disabled')).toEqual(null)
        expect(result.getByRole('contentinfo')).toBeDefined()
        expect(result.getByRole('contentinfo').textContent).toEqual(defaultProps.disabledText)
    })
})

describe('<TabGroup /> variant="secondary"', () => {
    it('<TabGroup /> validation className and props', () => {
        const props: ITabGroupProps = { ...defaultProps }
        const result = render(<BasicTabs {...props} />)
        const tabContainer = result.getByRole('tablist')

        expect(tabContainer).toBeDefined()
        expect(tabContainer.className).toContain('gap-4')
        expect(tabContainer.className).toContain('flex-col')
        expect(tabContainer.className).not.toContain('border')
    })

    it('<Tab /> validation className and props', () => {
        const result = render(<BasicTabs {...defaultProps} />)
        const currentTab = result.getAllByRole('tab')[initialValue]
        const disabledTab = result.getByTestId('disabled')

        expect(currentTab.className).toContain('rounded')
        expect(currentTab.className).toContain('border-blue-500')
        expect(currentTab.className).toContain('text-blue-500')
        expect(disabledTab.className).toContain('text-gray-300')
        expect(disabledTab.className).toContain('font-semibold')
    })
})

describe('<TabGroup /> navigation between elements', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<BasicTabs />)
    })

    afterEach(() => {
        cleanup()
    })

    it('navigates to the component that was clicked', () => {
        const tabs = renderResult.getAllByRole('tab')
        expect(tabs[0].className).toContain('font-semibold')
        expect(tabs[0].className).toContain('text-gray-500')
        fireEvent.click(tabs[0])
        expect(tabs[0].className).not.toContain('text-gray-500')
        expect(tabs[0].className).toContain('font-bold')
    })

    it('validation container was render data', () => {
        expect(renderResult.getByTestId('container').children.length).toEqual(2)
        expect(renderResult.getByText('Item Three')).toBeDefined()

        const tabs = renderResult.getAllByRole('tab')
        fireEvent.click(tabs[1])

        expect(renderResult.getByTestId('container').children.length).toEqual(2)
        expect(renderResult.getByText('Item Three')).toBeDefined()

        fireEvent.click(tabs[0])
        expect(renderResult.getByTestId('container').children.length).toEqual(2)
        expect(renderResult.getByText('Item one')).toBeDefined()
    })
})
