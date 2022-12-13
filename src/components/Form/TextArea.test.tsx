import { it, describe } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import { TextArea } from './TextArea'

describe('<TextArea/>', () => {
    it('should be render', () => {
        const { getByRole } = render(<TextArea role="textarea" />)
        expect(getByRole('textarea')).toBeDefined()
    })

    it('should render with label', () => {
        const lbl = 'Im a label'
        const { getByText } = render(<TextArea role="textarea" label={lbl} />)
        expect(getByText(lbl)).toBeDefined()
    })

    it('should render disabled', () => {
        const { getByRole } = render(<TextArea role="textarea" disabled />)
        expect(getByRole('textarea')).toBeDisabled()
    })

    it('should render without disabled', () => {
        const { getByRole } = render(<TextArea role="textarea" />)
        expect(getByRole('textarea')).not.toBeDisabled()
    })

    it('should render with a custom maxLenght prop', async () => {
        const { getByRole } = render(<TextArea role="textarea" maxlength={500} />)
        const textArea = getByRole('textarea')
        expect(textArea.getAttribute('maxlength')).toBe('500')
    })

    it('should render with a custom value prop', async () => {
        const { getByText } = render(<TextArea role="textarea" value={'Hello'} />)
        const textArea = getByText('Hello')
        expect(textArea).toBeDefined()
    })

    it('should be able to be changed by event', () => {
        const { getByRole } = render(<TextArea role="textarea" />)
        const textArea = getByRole('textarea') as HTMLInputElement

        fireEvent.change(textArea, { target: { value: 'Welcome' } })

        expect(textArea.value).toBe('Welcome')
    })
})
