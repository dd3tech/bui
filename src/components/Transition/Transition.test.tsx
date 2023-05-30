import { it, describe, vi } from 'vitest'
import { render } from '@testing-library/react'

import Transition from './Transition'

describe('<Transition/>', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should be render', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toBeDefined()
  })

  it('should not be render', () => {
    const { queryByRole } = render(<Transition show={false}>Text</Transition>)

    expect(queryByRole('transition')).toBeNull()
  })

  it('should be render when show is false and property alwaysRender is true', () => {
    const { getByRole } = render(
      <Transition show={false} alwaysRender>
        Text
      </Transition>
    )

    expect(getByRole('transition')).toBeDefined()
  })

  it('should render the children', () => {
    const { getByText } = render(
      <Transition show={false} alwaysRender>
        <span>Dummy text</span>
      </Transition>
    )

    expect(getByText('Dummy text')).toBeDefined()
  })

  it('should have fade in as default start animation', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toHaveClass('fade-in')
  })

  it('should change the start animation', () => {
    const { getByRole } = render(
      <Transition animationStart="heartBeat">Text</Transition>
    )

    expect(getByRole('transition')).toHaveClass('heart-beat')
  })

  it('should have fade out as default end animation', () => {
    const { getByRole } = render(
      <Transition show={false} alwaysRender>
        Text
      </Transition>
    )
    vi.advanceTimersByTime(300)

    expect(getByRole('transition')).toHaveClass('fade-out')
  })

  it('should change the end animation', () => {
    const { getByRole } = render(
      <Transition show={false} alwaysRender animationEnd="lightSpeedInRight">
        Text
      </Transition>
    )
    vi.advanceTimersByTime(300)

    expect(getByRole('transition')).toHaveClass('light-speed-in-right')
  })

  it('should have 300ms as default duration', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({ animationDuration: '300ms' })
    expect(getByRole('transition')).toHaveStyle({ transitionDuration: '300ms' })
  })

  it('should change the duration', () => {
    const { getByRole } = render(<Transition duration={800}>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({ animationDuration: '800ms' })
    expect(getByRole('transition')).toHaveStyle({ transitionDuration: '800ms' })
  })

  it('should have 0ms as default delay', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({ animationDelay: '0ms' })
    expect(getByRole('transition')).toHaveStyle({ transitionDelay: '0ms' })
  })

  it('should change the delay', () => {
    const { getByRole } = render(<Transition delay={700}>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({ animationDelay: '700ms' })
    expect(getByRole('transition')).toHaveStyle({ transitionDelay: '700ms' })
  })

  it('should have the default animation fill mode as both', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({ animationFillMode: 'both' })
  })

  it('should change the animation fill mode', () => {
    const { getByRole } = render(
      <Transition fillMode="backwards">Text</Transition>
    )

    expect(getByRole('transition')).toHaveStyle({
      animationFillMode: 'backwards'
    })
  })

  it('should have the default animation timing function as linear', () => {
    const { getByRole } = render(<Transition>Text</Transition>)

    expect(getByRole('transition')).toHaveStyle({
      animationTimingFunction: 'linear'
    })
    expect(getByRole('transition')).toHaveStyle({
      transitionTimingFunction: 'linear'
    })
  })

  it('should change the timing function', () => {
    const { getByRole } = render(
      <Transition timingFunction="ease-in">Text</Transition>
    )

    expect(getByRole('transition')).toHaveStyle({
      animationTimingFunction: 'ease-in'
    })
    expect(getByRole('transition')).toHaveStyle({
      transitionTimingFunction: 'ease-in'
    })
  })
})
