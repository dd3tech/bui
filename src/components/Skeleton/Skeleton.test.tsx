import { render } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('<Skeleton />', () => {
  it('should render correctly with default props', () => {
    const { getByTestId } = render(<Skeleton />)

    expect(getByTestId('skeleton')).toBeDefined()
  })

  it('should render correctly with custom props', () => {
    const { getByTestId } = render(
      <Skeleton
        className="my-class"
        style={{ backgroundColor: 'red' }}
        rounded="full"
        inFlex
      />
    )
    const skeleton = getByTestId('skeleton')
    expect(skeleton.style.backgroundColor).toBe('red')
  })
})
