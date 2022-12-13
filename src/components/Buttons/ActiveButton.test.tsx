import { it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import ActiveButton, { ActiveButtonProps } from './ActiveButton'

const defProps: ActiveButtonProps = {
    active: false,
    children: 'Im Button',
    to: vi.fn()
}

const activeIsFalseClassName = 'bg-transparent border border-gray-300 text-gray-300'

describe('<ActiveButton/>', () => {
    it('should be render', () => {
        const { container } = render(<ActiveButton {...defProps} />)
        expect(container.firstChild).toBeDefined()
    })

    it('should render with children', () => {
        const { getByText } = render(<ActiveButton {...defProps} />)
        expect(getByText(defProps.children as string)).toBeDefined()
    })

    it('should render with a variant outline if active is false', () => {
        const { container } = render(<ActiveButton {...defProps} />)
        const btn = container.firstChild as HTMLButtonElement
        expect(btn.className).toContain(activeIsFalseClassName)
    })

    it('should render with a variant outline if active is true', () => {
        const { container } = render(<ActiveButton {...defProps} active={true} />)
        const btn = container.firstChild as HTMLButtonElement
        expect(btn.className).not.toContain(activeIsFalseClassName)
    })

    it('the to function should be able to function correctly as a callback', () => {
        const { container } = render(<ActiveButton {...defProps} active={true} />)
        const btn = container.firstChild as HTMLButtonElement

        fireEvent.click(btn)

        expect(defProps.to).toHaveBeenCalled()
        expect(defProps.to).toHaveBeenCalledTimes(1)
    })
})
