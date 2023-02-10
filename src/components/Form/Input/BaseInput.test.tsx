import { CheckCircleIcon, UserCircleIcon } from '@heroicons/react/outline'
import { fireEvent, render } from '@testing-library/react'
import { vi, describe, it } from 'vitest'
import BaseInput from './BaseInput'

describe('<BaseInput />', () => {
    it('the basic input as renderer', () => {
        const { getByTestId } = render(<BaseInput classNameAdornment="p-4" data-testid="input" />)

        expect(getByTestId('input')).toBeInTheDocument()
        expect(getByTestId('input')).toBeDefined()
    })

    it('renders correctly with label prop', () => {
        const { getByText } = render(<BaseInput label="Email" data-testid="input" />)
        const label = getByText('Email')
        expect(label).toBeInTheDocument()
    })

    it('renders correctly with inputBlank prop', () => {
        const { getByRole } = render(<BaseInput inputBlank type="text" />)
        const box = getByRole('input-container')
        expect(box.className).toContain('border-none')
    })

    it('handles focus and blur events correctly', () => {
        const { getByTestId, getByRole } = render(<BaseInput data-testid="input" />)
        const inputContainer = getByRole('input-container')
        const input = getByTestId('input')
        fireEvent.focus(input)
        expect(inputContainer).toHaveClass('border-blue-500')
        fireEvent.blur(input)
        expect(inputContainer).not.toHaveClass('border-blue-500')
    })

    it('handles onChange event correctly', () => {
        const onChangeMock = vi.fn()
        const { getByTestId } = render(<BaseInput onChange={onChangeMock} data-testid="input" />)
        const input = getByTestId('input')
        fireEvent.change(input, { target: { value: 'new value' } })
        expect(onChangeMock).toHaveBeenCalled()
    })

    it('renders message correctly', () => {
        const { getByText } = render(<BaseInput message="error message" data-testid="input" />)
        const message = getByText('error message')
        expect(message).toBeInTheDocument()
    })

    it('renders with default value correctly', () => {
        const { getByTestId } = render(<BaseInput defaultValue="default value" data-testid="input" />)
        const input = getByTestId('input') as HTMLInputElement
        expect(input.value).toBe('default value')
    })

    it('renders without default value correctly', () => {
        const { getByTestId } = render(<BaseInput data-testid="input" />)
        const input = getByTestId('input') as HTMLInputElement
        expect(input.value).toBe('')
    })

    describe('checking variant types', () => {
        it('it should display the "active" variant correctly', () => {
            const { container } = render(<BaseInput variant="active" />)
            expect(container.firstChild).toHaveClass('border-black')
        })

        it('it should display the "focus" variant correctly', () => {
            const { container } = render(<BaseInput variant="focus" />)
            expect(container.firstChild).toHaveClass('border-blue-500')
        })

        it('it should display the "success" variant correctly', () => {
            const { container } = render(<BaseInput variant="success" />)
            expect(container.firstChild).toHaveClass('border-green-500')
        })

        it('it should display the "warning" variant correctly', () => {
            const { container } = render(<BaseInput variant="warning" />)
            expect(container.firstChild).toHaveClass('border-yellow-500')
        })
    })

    describe('adornment props', () => {
        it('renders correctly with startAdornment prop', () => {
            const { getByTestId } = render(<BaseInput startAdornment={<CheckCircleIcon aria-label="check-icon" />} data-testid="input" />)
            const adornment = getByTestId('startAdornment')
            expect(adornment.firstChild).toHaveAttribute('aria-label', 'check-icon')
        })

        it('renders correctly with endAdornment prop', () => {
            const { getByTestId } = render(<BaseInput endAdornment={<UserCircleIcon aria-label="user-circle" />} data-testid="input" />)
            const adornment = getByTestId('endAdornment')
            expect(adornment.firstChild).toHaveAttribute('aria-label', 'user-circle')
        })
    })

    describe('endAdornment default by variant', () => {
        it('CheckCircleIcon was rendered when variant is success', () => {
            const { getByRole } = render(<BaseInput variant="success" />)
            expect(getByRole('defaultIcon').firstChild).toHaveAttribute('aria-label', 'check')
        })

        it('InformationCircleIcon was rendered when variant is warning', () => {
            const { getByRole } = render(<BaseInput variant="warning" />)
            expect(getByRole('defaultIcon').firstChild).toHaveAttribute('aria-label', 'warning')
        })

        it('XCircleIcon was rendered when variant is error', () => {
            const { getByRole } = render(<BaseInput variant="error" />)
            expect(getByRole('defaultIcon').firstChild).toHaveAttribute('aria-label', 'error')
        })
    })
})
