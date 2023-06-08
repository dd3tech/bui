import { it, describe, vi } from 'vitest'
import { render } from '@testing-library/react'

import Progress from './Progress'

describe('<Progress/>', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should be render', () => {
    const { container } = render(<Progress />)

    expect(container.firstChild).toBeDefined()
  })

  it('should render the progress circle component by default', () => {
    const { getByRole } = render(<Progress />)

    expect(getByRole('progress-circle')).toBeDefined()
  })

  it('should render the progress line component when type is linear', () => {
    const { getByRole } = render(<Progress type="linear" />)

    expect(getByRole('progress-line')).toBeDefined()
  })

  it('should render the progress circle component with default values', () => {
    const { getByRole } = render(<Progress />)

    expect(getByRole('progress-circle-svg')).toHaveStyle({
      width: '80px',
      height: '80px'
    })
    expect(getByRole('progress-circle-background')).toHaveStyle({
      strokeWidth: '8',
      stroke: '#e5e7eb'
    })
    expect(getByRole('progress-circle-line')).toHaveStyle({
      strokeWidth: '8',
      stroke: '#1d4ed8',
      strokeLinecap: 'butt'
    })
  })

  it('should render the progress line component with default values', () => {
    const { getByRole } = render(<Progress type="linear" />)

    expect(getByRole('progress-line-background')).toHaveStyle({
      width: '100%',
      height: '6px',
      backgroundColor: '#e5e7eb'
    })
    expect(
      getByRole('progress-line-background').className.includes('rounded-full')
    ).toBeTruthy()
    expect(getByRole('progress-line')).toHaveStyle({
      width: '0%',
      backgroundColor: '#1d4ed8'
    })
    expect(
      getByRole('progress-line').className.includes('rounded-full')
    ).toBeTruthy()
  })

  it('should change the value', () => {
    const { getByRole, rerender } = render(
      <Progress value={10} type="linear" />
    )
    rerender(<Progress value={50} type="linear" />)
    vi.advanceTimersByTime(20)
    rerender(<Progress value={20} type="linear" />)
    vi.advanceTimersByTime(300)

    expect(getByRole('progress-line')).toHaveStyle({ width: '20%' })
  })

  it('should not change the value when is less than 0 or greater than 100', () => {
    const { getByRole, rerender } = render(
      <Progress value={10} type="linear" />
    )
    rerender(<Progress value={101} type="linear" />)
    vi.advanceTimersByTime(10)

    expect(getByRole('progress-line')).toHaveStyle({ width: '10%' })

    rerender(<Progress value={-1} type="linear" />)
    vi.advanceTimersByTime(10)

    expect(getByRole('progress-line')).toHaveStyle({ width: '10%' })
  })

  it('should have the animation class in the progress circle component when indeterminate prop is true', () => {
    const { getByRole } = render(<Progress indeterminate />)

    expect(getByRole('progress-circle-line')).toHaveClass(
      'progress-circle-indeterminate'
    )
  })

  it('should have the animation class in the progress line component when indeterminate prop is true', () => {
    const { getByRole } = render(<Progress indeterminate type="linear" />)

    expect(getByRole('progress-line')).toHaveClass(
      'progress-linear-indeterminate'
    )
  })

  it('should change the progress circle size', () => {
    const { getByRole } = render(<Progress circleSize={150} />)

    expect(getByRole('progress-circle-svg')).toHaveStyle({
      width: '150px',
      height: '150px'
    })
  })

  it('should change the progress line size', () => {
    const { getByRole } = render(
      <Progress type="linear" width="450px" height="10px" />
    )

    expect(getByRole('progress-line-background')).toHaveStyle({
      width: '450px',
      height: '10px'
    })
  })

  it('should change the progress circle colors', () => {
    const { getByRole } = render(
      <Progress progressLineColor="#000" backgroundLineColor="#fff" />
    )

    expect(getByRole('progress-circle-background')).toHaveStyle({
      stroke: '#fff'
    })
    expect(getByRole('progress-circle-line')).toHaveStyle({
      stroke: '#000'
    })
  })

  it('should change the progress line colors', () => {
    const { getByRole } = render(
      <Progress
        type="linear"
        progressLineColor="#000"
        backgroundLineColor="#fff"
      />
    )

    expect(getByRole('progress-line-background')).toHaveStyle({
      backgroundColor: '#fff'
    })
    expect(getByRole('progress-line')).toHaveStyle({
      backgroundColor: '#000'
    })
  })

  it('should change the progress circle line size', () => {
    const { getByRole } = render(<Progress lineWidth={10} />)

    expect(getByRole('progress-circle-background')).toHaveStyle({
      strokeWidth: '10'
    })
    expect(getByRole('progress-circle-line')).toHaveStyle({
      strokeWidth: '10'
    })
  })

  it('should change the progress circle component line cap', () => {
    const { getByRole } = render(<Progress lineCap="round" />)

    expect(getByRole('progress-circle-line')).toHaveStyle({
      strokeLinecap: 'round'
    })
  })

  it('should change the progress line component line cap', () => {
    const { getByRole } = render(<Progress type="linear" lineCap="square" />)

    expect(
      getByRole('progress-line-background').className.includes('rounded-none')
    ).toBeTruthy()
    expect(
      getByRole('progress-line').className.includes('rounded-none')
    ).toBeTruthy()
  })

  it('should render the children in the progress circle component', () => {
    const { getByRole } = render(
      <Progress>
        <div role="progress-children">Hey</div>
      </Progress>
    )

    expect(getByRole('progress-children')).toBeDefined()
  })

  it('should render the children in the progress line component', () => {
    const { getByRole } = render(
      <Progress type="linear">
        <div role="progress-children">Hey</div>
      </Progress>
    )

    expect(getByRole('progress-children')).toBeDefined()
  })
})
