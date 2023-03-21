import { vi } from 'vitest'
import { render } from '@testing-library/react'
import Radio, { getClasses } from './Radio'

const onChangeMock = vi.fn()

describe('<Radio/>', () => {
  it('should be render with custom value', () => {
    const { container } = render(
      <Radio value="a" checked onChange={onChangeMock} />
    )

    const input = container.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement

    expect(input?.value).toEqual('a')
  })

  it('should be render with prop error=true', () => {
    const classes = getClasses(true, false, true, 'bg-blue-700')

    const { container, getByRole } = render(
      <Radio value="a" checked error color="primary" onChange={onChangeMock} />
    )

    const label = getByRole('label')
    const radio = getByRole('radioCustom')
    const mark = getByRole('mark')
    const input = container.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement

    expect(input.disabled).toBe(false)
    expect(label?.getAttribute('class')).toContain(classes.label)
    expect(radio?.getAttribute('class')).toContain(classes.radio)
    expect(mark?.getAttribute('class')).toContain(classes.mark.color)
    expect(mark?.getAttribute('class')).toContain(classes.mark.size)
  })

  it('should be render with prop disabled=true', () => {
    const classes = getClasses(true, true, false, 'primary')

    const { getByRole } = render(<Radio value="a" checked disabled />)

    const label = getByRole('label')
    const radio = getByRole('radioCustom')
    const mark = getByRole('mark')
    const input = label.querySelector('input[type="radio"]') as HTMLInputElement

    expect(input.disabled).toBe(true)
    expect(label?.getAttribute('class')).toContain(classes.label)
    expect(radio?.getAttribute('class')).toContain(classes.radio)
    expect(mark?.getAttribute('class')).toContain(classes.mark.color)
    expect(mark?.getAttribute('class')).toContain(classes.mark.size)
  })
})
