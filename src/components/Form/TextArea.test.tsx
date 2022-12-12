import { it, describe } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { TextArea } from './TextArea'

describe('Component UI: TextArea', () => {
    it('TextArea is working', () => {
        render(<TextArea role="textarea" />)
        expect(screen.getByRole('textarea')).toBeDefined()
    })

    it('TextArea is disabled', () => {
        render(<TextArea role="textarea" disabled />)
        expect(screen.getByRole('textarea')).toBeDisabled()
    })

    it('TextArea is not disabled', () => {
        render(<TextArea role="textarea" />)
        expect(screen.getByRole('textarea')).not.toBeDisabled()
    })

    it('TextArea if we pass it the maxlength props', async () => {
        render(<TextArea role="textarea" maxlength={500} />)
        const textArea = screen.getByRole('textarea')
        expect(textArea.getAttribute('maxlength')).toBe('500')
    })

    it('TextArea if we pass it the value', async () => {
        render(<TextArea role="textarea" value={'Hello'} readOnly />)
        const textArea = screen.getByText('Hello')
        expect(textArea).toBeDefined()
    })

    it('It should allow a $ to be in the input when the value is changed', () => {
        render(<TextArea role="textarea" />)
        const textArea = screen.getByRole('textarea') as HTMLInputElement
        fireEvent.change(textArea, { target: { value: 'Welcome' } })
        expect(textArea.value).toBe('Welcome')
    })
})
