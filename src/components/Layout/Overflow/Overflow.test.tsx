import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Overflow from './Overflow'
import Text from '../../Typography'

describe('<Overflow/>', () => {
  it('should be render', () => {
    render(
      <Overflow role="overflow">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toBeDefined()
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('should have a auto overflow', () => {
    render(
      <Overflow role="overflow" overflow="auto">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toHaveClass('overflow-auto')
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('should have a scroll overflow', () => {
    render(
      <Overflow role="overflow" overflow="scroll">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toHaveClass('overflow-scroll')
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('should have a x-hidden overflow', () => {
    render(
      <Overflow role="overflow" overflow="x-hidden">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toHaveClass('overflow-x-hidden')
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('should have a y-visible overflow', () => {
    render(
      <Overflow role="overflow" overflow="y-visible">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toHaveClass('overflow-y-visible')
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('should have a auto overflow by default', () => {
    render(
      <Overflow role="overflow">
        <Text>{'Hello'}</Text>
      </Overflow>
    )
    expect(screen.getByRole('overflow')).toHaveClass('overflow-auto')
    expect(screen.getByText('Hello')).toBeDefined()
  })
})
