import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'
import Table from './Table'

describe('<Table />', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(
            <Table>
                <Table.Header>
                    <Table.HeaderRow>
                        <Table.HeaderCell data-testid="headercell-sticky" stickyLeft="0px">
                            Header
                        </Table.HeaderCell>
                        <Table.HeaderCell>Header</Table.HeaderCell>
                        <Table.HeaderCell>Header</Table.HeaderCell>
                    </Table.HeaderRow>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell data-testid="cell-sticky" stickyLeft="0px">
                            Cell
                        </Table.Cell>
                        <Table.Cell data-testid="cell-disabled" disabled>
                            Cell
                        </Table.Cell>
                        <Table.Cell data-testid="cell-error" error>
                            Cell
                        </Table.Cell>
                    </Table.Row>
                    <Table.Accordion iconPosition={1}>
                        <Table.Row data-testid="row-accordion">
                            <Table.Cell data-testid="cell-input" inputProps={{}}>
                                data accordion
                            </Table.Cell>
                            <Table.Cell data-testid="cell-icon">data accordion</Table.Cell>
                            <Table.Cell>data accordion</Table.Cell>
                        </Table.Row>
                        <Table.Row data-testid="row-accordion">
                            <Table.Cell>data accordion</Table.Cell>
                            <Table.Cell>data accordion</Table.Cell>
                            <Table.Cell>data accordion</Table.Cell>
                        </Table.Row>
                    </Table.Accordion>
                </Table.Body>
            </Table>
        )
    })

    afterEach(() => cleanup())

    it('should be render', () => {
        const { container } = renderResult
        expect(container).toBeDefined()
    })

    it('should be render a sticky cell', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('headercell-sticky').className).toContain('sticky')
        expect(getByTestId('cell-sticky').className).toContain('sticky')
    })

    it('should be render a disabled cell', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('cell-disabled').className).toContain('text-gray-200')
    })

    it('should be render a cell with error', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('cell-error').className).toContain('bg-red-100')
    })

    it('should be render a cell with input', () => {
        const { getByTestId } = renderResult
        const cell = getByTestId('cell-input')
        expect(cell.children[0].getAttribute('role')).toBe('input-container')
    })

    describe('Accordion with iconPosition=1', () => {
        it('should be render a accordion group with a icon in the second cell', () => {
            const { getByTestId } = renderResult
            const cell = getByTestId('cell-icon')
            expect(cell.innerHTML.includes('svg')).toBe(true)
        })

        it('must fire an onClick event when clicking on the first row', () => {
            const { getByTestId, getAllByTestId } = renderResult
            const cell = getByTestId('cell-icon')

            let accordion = null

            accordion = getAllByTestId('row-accordion')
            expect(accordion.length).toBe(1)

            cell.click()

            accordion = getAllByTestId('row-accordion')
            expect(accordion.length).toBe(2)
        })
    })
})
