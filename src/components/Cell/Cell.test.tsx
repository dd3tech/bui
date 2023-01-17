import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Cell, { getClassName } from './Cell'
import { MailIcon } from '@heroicons/react/outline'

describe('<Cell/>', () => {
    it('should be render', () => {
        const { container } = render(<Cell />)
        expect(container).toBeDefined()
    })

    describe('prop: disabled', () => {
        it('should render a cell disabled', () => {
            render(<Cell disabled />)
            const btn = screen.getByRole('button')
            expect(btn).toBeDisabled()
            expect(btn.className).not.toContain('bg-blue-500')
        })

        it('should render a cell not disabled', () => {
            render(<Cell disabled={false} />)
            expect(screen.getByRole('button')).not.toBeDisabled()
        })

        it('should call a function when the button is not disabled', () => {
            const onClick = vi.fn(() => 0)
            const { container } = render(<Cell onClick={onClick} disabled={false} />)
            const cell = container.firstChild as HTMLButtonElement

            fireEvent.click(cell)

            expect(onClick).toHaveBeenCalled()
            expect(onClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('prop: border', () => {
        it('should render a cell border', () => {
            const { container } = render(<Cell border />)
            const btn = container.firstChild as HTMLButtonElement
            expect(btn.className).toContain(getClassName(false, false, true))
        })

        it('should render a cell without border', () => {
            const { container } = render(<Cell border={false} />)
            const btn = container.firstChild as HTMLButtonElement

            expect(btn.className).toContain(getClassName(false, false, false))
        })
    })

    describe('prop: selected', () => {
        it('should render a cell selected', () => {
            const { container } = render(<Cell selected />)
            const btn = container.firstChild as HTMLButtonElement
            expect(btn.className).toContain(getClassName(true, false, false))
        })

        it('should render a cell not selected', () => {
            const { container } = render(<Cell border={false} />)
            const btn = container.firstChild as HTMLButtonElement
            expect(btn.className).toContain(getClassName(false, false, false))
        })
    })

    it('should render a cell with className w-full', () => {
        render(<Cell className="w-full" />)
        expect(screen.getByRole('button').className).toContain('w-full')
    })

    describe('props: icon, disabled, selected, border', () => {
        it('should render a cell with an icon and class text-gray-400', () => {
            const { container } = render(<Cell icon={<MailIcon id="MailIcon" />} disabled={false} selected={false} />)
            const div = container.querySelector('#cell-icon')
            const icon = div?.querySelector('#MailIcon')
            expect(div?.getAttribute('class')).toContain('text-gray-400')
            expect(icon).not.toBeNull()
        })

        it('should render a cell with an icon and without class text-gray-400', () => {
            const { container } = render(<Cell icon={<MailIcon id="MailIcon" />} disabled={true} selected={true} />)
            const gIcon = container.querySelector('#cell-icon')
            const icon = gIcon?.querySelector('#MailIcon')
            expect(gIcon?.getAttribute('class')).not.toContain('text-gray-400')
            expect(icon).not.toBeNull()
        })

        it('should render a cell without icon', () => {
            const { container } = render(<Cell />)
            expect(container.querySelectorAll('#MailIcon')).toHaveLength(0)
        })

        it('should render a cell selected with border', () => {
            const { container } = render(<Cell selected border />)
            const btn = container.firstChild as HTMLButtonElement
            expect(btn.className).toContain(getClassName(true, false, true))
        })
    })

    it('should render a cell with a span with class text-small', () => {
        const { container } = render(<Cell size="medium" />)
        expect(container.querySelectorAll('span.text-sm')).toHaveLength(1)
    })

    it('should render a cell with a icon with width 20px', () => {
        const { container } = render(<Cell icon={<MailIcon id="MailIcon" width={20} />} />)
        const gIcon = container.querySelector('#cell-icon') as HTMLDivElement
        expect(gIcon?.style.width).toBe('20px')
    })
})
