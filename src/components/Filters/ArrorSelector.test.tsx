import { render } from '@testing-library/react'
import { vi } from 'vitest'
import ArrowSelector from './ArrowSelector'

const props = {
  label: 'label',
  onClickLeft: vi.fn(),
  onClickRight: vi.fn()
}

describe('<ArrowSelector/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    expect(getByRole('arrow-selector')).toBeDefined()
  })

  it('should display label', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    expect(getByRole('arrow-selector')).toBeDefined()
  })

  it('should call onClickLeft on left arrow click', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    getByRole('arrow-selector-left').click()

    expect(props.onClickLeft).toHaveBeenCalled()
  })

  it('should call onClickRight on right arrow click', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    getByRole('arrow-selector-right').click()

    expect(props.onClickRight).toHaveBeenCalled()
  })
})
