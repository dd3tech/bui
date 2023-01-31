import { render } from '@testing-library/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import Select, { getSelectStates } from './Select'

describe('<Select />', () => {
    const optionsList = {
        1: { label: 'Option 1', disabled: false },
        2: { label: 'Option 2', disabled: false },
        3: { label: 'Option 3', disabled: true }
    }

    it('getSelectStates should get the correct classes', () => {
        let classes = getSelectStates({ success: true })
        expect(classes.input.borderColor).toBe('border-green-500')
        expect(classes.text.color).toBe('text-green-500')

        classes = getSelectStates({ error: true })
        expect(classes.input.borderColor).toBe('border-red-500')
        expect(classes.text.color).toBe('text-red-500')

        classes = getSelectStates({ warning: true })
        expect(classes.input.borderColor).toBe('border-yellow-500')
        expect(classes.text.color).toBe('text-yellow-500')

        classes = getSelectStates({ disabled: true })
        expect(classes.input.borderColor).toBe('border-gray-400 bg-gray-100')
        expect(classes.text.color).toBe('text-gray-900')
    })

    it('should be rendered with label', () => {
        const label = 'Select Label'
        const { getByText } = render(<Select label={label} optionsList={optionsList} />)

        const labelElement = getByText(label)
        expect(labelElement).toBeInTheDocument()
    })

    it('should be rendered with start adornment', () => {
        const startAdornment = <ExclamationCircleIcon aria-label="icon" className="w-5" />
        const { getByTestId } = render(<Select startAdornment={startAdornment} optionsList={optionsList} />)
        const adornment = getByTestId('startAdornment')

        expect(adornment.firstChild).toHaveAttribute('aria-label', 'icon')
    })

    it('should be rendered option list', () => {
        const { getByText } = render(<Select optionsList={optionsList} />)

        Object.values(optionsList).forEach(({ label }) => {
            const optionElement = getByText(label)
            expect(optionElement).toBeInTheDocument()
        })
    })

    it('should be applied success styles when success prop is passed', () => {
        const { container } = render(<Select success optionsList={optionsList} />)
        const classes = getSelectStates({ success: true })
        const selectElement = container.querySelector('select')

        expect(selectElement).toHaveClass(classes.input.borderColor)
    })

    it('should be applied error styles when error prop is passed', () => {
        const { container } = render(<Select error optionsList={optionsList} />)
        const classes = getSelectStates({ error: true })
        const selectElement = container.querySelector('select')

        expect(selectElement).toHaveClass(classes.input.borderColor)
    })

    it('should be applied warning styles when warning prop is passed', () => {
        const { container } = render(<Select warning optionsList={optionsList} />)
        const classes = getSelectStates({ warning: true })
        const selectElement = container.querySelector('select')

        expect(selectElement).toHaveClass(classes.input.borderColor)
    })

    it('should be applied disabled styles when disabled prop is passed', () => {
        const { container } = render(<Select disabled optionsList={optionsList} />)
        const classes = getSelectStates({ disabled: true })
        const selectElement = container.querySelector('select')

        expect(selectElement).toHaveClass(classes.input.borderColor)
    })

    it('should be applied custom padding when padding prop is passed', () => {
        const padding = '6'
        const { getByRole } = render(<Select padding={padding} optionsList={optionsList} />)
        const selectElement = getByRole('group-select')

        expect(selectElement).toHaveClass(`p-${padding}`)
    })

    it('should be rendered the standard variant', () => {
        const { container } = render(<Select variant="standard" optionsList={optionsList} />)
        const selectElement = container.querySelector('select')

        expect(selectElement).toHaveClass('border-b-2')
    })

    it('should render a message', () => {
        const message = 'Lorem ipsum dolor'
        const { getByText } = render(<Select message={message} optionsList={optionsList} />)
        const labelElement = getByText(message)

        expect(labelElement).toBeInTheDocument()
    })
})
