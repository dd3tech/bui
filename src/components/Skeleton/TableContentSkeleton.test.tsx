import { render } from '@testing-library/react'
import TableContentSkeleton from './TableContentSkeleton'
import { UnitCSS } from 'interfaces'

describe('<TableContentSkeleton />', () => {
  it('should render the correct number of rows and columns', () => {
    const rows = 3
    const columns = 2
    const { queryAllByTestId } = render(
      <table>
        <tbody>
          <TableContentSkeleton rows={rows} columns={columns} />
        </tbody>
      </table>
    )

    const skeletons = queryAllByTestId('skeleton')
    expect(skeletons.length).toBe(rows * columns)
  })

  it('should render cells with the correct width when setting an array of size units', () => {
    const rows = 1
    const columns = 3
    const widths = ['50%', '100%'] as UnitCSS[]
    const columnWidths = ['50%', '100%'] as UnitCSS[]
    const { queryAllByTestId } = render(
      <table>
        <tbody>
          <TableContentSkeleton
            rows={rows}
            columns={columns}
            columnWidth={columnWidths}
            skeletonWidth={widths}
          />
        </tbody>
      </table>
    )
    const skeletons = queryAllByTestId('skeleton')
    const cells = queryAllByTestId('skeleton-cell')

    expect(skeletons[0]).toHaveStyle('width: 50%')
    expect(skeletons[1]).toHaveStyle('width: 100%')
    expect(skeletons[2]).toHaveStyle('width: 100%')
    expect(cells.length).toBe(columns)
  })

  it('should render cells with the correct width when configuring only one unit od size', () => {
    const rows = 1
    const columns = 3
    const skeletonWidth = '100%'
    const columnWidth = '200px'
    const { queryAllByTestId } = render(
      <table>
        <tbody>
          <TableContentSkeleton
            rows={rows}
            columns={columns}
            columnWidth={columnWidth}
            skeletonWidth={skeletonWidth}
          />
        </tbody>
      </table>
    )
    const skeletons = queryAllByTestId('skeleton')
    const cells = queryAllByTestId('skeleton-cell')

    expect(skeletons[0]).toHaveStyle('width: 100%')
    expect(skeletons[1]).toHaveStyle('width: 100%')
    expect(skeletons[2]).toHaveStyle('width: 100%')

    expect(cells[0]).toHaveStyle('width: 200px')
    expect(cells[1]).toHaveStyle('width: 200px')
    expect(cells[2]).toHaveStyle('width: 200px')
  })
})
