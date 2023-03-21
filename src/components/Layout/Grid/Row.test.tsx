import { it, describe } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Row, { RowProps } from './Row'

const defProps: RowProps = {
  cols: 1,
  sm: 2,
  md: 3,
  gap: 5,
  children: 'Row Component'
}

describe('<Row/>', () => {
  afterEach(cleanup)

  it('Row component is working', () => {
    const { container } = render(<Row {...defProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('Row component props are working', () => {
    const { container } = render(<Row {...defProps} />)
    const { className: rowClassName } = container.firstChild as HTMLDivElement

    expect(rowClassName).toContain('mt-2')
    expect(rowClassName).toContain('grid-cols-1')
    expect(rowClassName).toContain('sm:grid-cols-2')
    expect(rowClassName).toContain('md:grid-cols-3')
    expect(rowClassName).toContain('gap-5')
  })
})
