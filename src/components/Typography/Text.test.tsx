import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Text, { TextProps } from './Text'

const defProps: TextProps = {}

describe('<Text/>', () => {
  it('should be render correctly', () => {
    const { container } = render(<Text {...defProps} />)
    expect(container).toBeDefined()
  })
  it('should be responsive', () => {
    const { container } = render(
      <Text
        children="Responsive"
        size={{ sm: 'xs', md: '2xl', lg: '6xl', xl: '9xl', '2xl': 'sm' }}
      />
    )
    expect(container.children[0]).toHaveClass(
      'text-xs md:text-2xl lg:text-6xl xl:text-9xl 2xl:text-sm'
    )
  })
  it('should have a number class', () => {
    const { container } = render(<Text children="Responsive" size={20} />)
    expect(container.children[0]).toHaveClass('text-[20px]')
  })
  it('should have a string class', () => {
    const { container } = render(<Text children="Responsive" size={'sm'} />)
    expect(container.children[0]).toHaveClass('text-sm')
  })
  it('should display the default text when showDefaultValue is true and content is empty', () => {
    const { container } = render(<Text showDefaultValue />)
    expect(container.children[0]).toHaveTextContent('-')
  })
  it('should display the defaultValue text when content is empty and showDefaultValue is true', () => {
    const { container } = render(<Text showDefaultValue defaultValue="..." />)
    expect(container.children[0]).toHaveTextContent('...')
  })
})
