import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'
import Table from './Table'
import Header from './base/Header'
import HeaderRow from './base/HeaderRow'
import HeaderCell from './base/HeaderCell'
import Body from './base/Body'
import Row from './base/Row'
import Cell from './base/Cell'
import Accordion from './base/Accordion'

describe('<Table />', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(
      <Table>
        <Header>
          <HeaderRow>
            <HeaderCell data-testid="headercell-sticky" stickyLeft="0px">
              Header
            </HeaderCell>
            <HeaderCell>Header</HeaderCell>
            <HeaderCell>Header</HeaderCell>
          </HeaderRow>
        </Header>
        <Body>
          <Row>
            <Cell data-testid="cell-sticky" stickyLeft="0px">
              Cell
            </Cell>
            <Cell data-testid="cell-disabled" disabled>
              Cell
            </Cell>
            <Cell data-testid="cell-error" error>
              Cell
            </Cell>
          </Row>
          <Accordion iconPosition={1}>
            <Row data-testid="row-accordion">
              <Cell data-testid="cell-input" inputProps={{}}>
                data accordion
              </Cell>
              <Cell data-testid="cell-icon">data accordion</Cell>
              <Cell>data accordion</Cell>
            </Row>
            <Row data-testid="row-accordion">
              <Cell>data accordion</Cell>
              <Cell>data accordion</Cell>
              <Cell>data accordion</Cell>
            </Row>
          </Accordion>
        </Body>
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
