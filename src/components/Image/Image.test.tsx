import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Image from './Image'

function findImg(container: HTMLElement) {
  return container.firstChild as HTMLImageElement
}

const defaultProps = {
  src: 'https://picsum.photos/200/300.jpg',
  width: 200,
  height: 300
}

describe('<Image/>', () => {
  it('should be render correctly', () => {
    const { container } = render(<Image {...defaultProps} />)
    expect(findImg(container)).toBeDefined()
  })

  it('should render with src attribute', () => {
    const { container } = render(<Image {...defaultProps} />)
    expect(findImg(container).src).toEqual('https://picsum.photos/200/300.jpg')
  })

  it('should render with height and width', () => {
    const { container } = render(<Image {...defaultProps} />)
    expect(findImg(container).style.height).toEqual('300px')
    expect(findImg(container).style.width).toEqual('200px')
  })

  describe('prop: circle', () => {
    it('should default to false', () => {
      const { container } = render(<Image {...defaultProps} />)
      expect(findImg(container).className).not.toContain('rounded-50')
    })

    it('should render with rounded-50 when circle is true', () => {
      const { container } = render(<Image {...defaultProps} circle />)
      expect(findImg(container).className).toContain('rounded-50')
    })
  })

  describe('prop: rounded', () => {
    it('should default to lg', () => {
      const { container } = render(<Image {...defaultProps} />)
      expect(findImg(container).className).toContain('rounded-lg')
    })

    it('should render with the rounded-sm class when rounded="sm"', () => {
      const { container } = render(<Image {...defaultProps} rounded="sm" />)
      expect(findImg(container).className).toContain('rounded-sm')
    })

    it('should render with the rounded-sm class when rounded="md"', () => {
      const { container } = render(<Image {...defaultProps} rounded="md" />)
      expect(findImg(container).className).toContain('rounded-md')
    })

    it('should render with the rounded-sm class when rounded="lg"', () => {
      const { container } = render(<Image {...defaultProps} rounded="lg" />)
      expect(findImg(container).className).toContain('rounded-lg')
    })
  })
})
