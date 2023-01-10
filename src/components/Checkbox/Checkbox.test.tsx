import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { FormControlLabel } from '../FormControl'
import Checkbox from './Checkbox'

describe('<Checkbox /> ', () => {
    it('renders an unchecked `checkbox` by default', () => {
        const { getByRole } = render(<Checkbox />)

        expect(getByRole('checkbox')).toHaveProperty('checked', false)
    })

    it('renders an checked `checkbox` when `checked={true}`', () => {
        const { getByRole } = render(<Checkbox checked />)

        expect(getByRole('checkbox')).toHaveProperty('checked', true)
    })

    it('flips the checked property when clicked and calls onchange with the checked state', () => {
        const { getByRole } = render(<Checkbox />)

        fireEvent.click(getByRole('checkbox'))
        expect(getByRole('checkbox')).toHaveProperty('checked', true)

        fireEvent.click(getByRole('checkbox'))
        expect(getByRole('checkbox')).toHaveProperty('checked', false)
    })
})

describe('prop: indeterminate icon', () => {
    it('should render an indeterminate icon', () => {
        const { getByTestId } = render(<Checkbox indeterminate />)
        expect(getByTestId('IndeterminateCheckBoxIcon')).toBeDefined()
    })
})

describe('with FormControl', () => {
    describe('enabled', () => {
        it('should not have the disabled class', () => {
            const { getByRole } = render(<FormControlLabel control={<Checkbox />} label="disabledEmpty" />)

            expect(getByRole('checkbox')).not.toHaveAttribute('disabled')
        })

        it('should be overridden by props', () => {
            const { getByRole } = render(<FormControlLabel control={<Checkbox disabled />} label="CheckBox with Disabled" />)

            expect(getByRole('checkbox')).toHaveAttribute('disabled')
        })
    })

    describe('disabled', () => {
        it('should have the disabled class', () => {
            const { getByRole } = render(<FormControlLabel disabled control={<Checkbox />} label="Control Disabled" />)

            expect(getByRole('checkbox')).toHaveAttribute('disabled')
        })

        it('should be overridden by props', () => {
            const { getByRole } = render(
                <FormControlLabel disabled control={<Checkbox disabled={false} />} label="Control Disabled But Checkbook disabled='false'" />
            )

            expect(getByRole('checkbox')).not.toHaveAttribute('disabled')
        })
    })

    it('should allow custom icon font sizes', () => {
        const { getByTestId, getByRole } = render(<Checkbox fontSize="4xl" />)

        expect(getByTestId('CheckBoxOutlineBlankIcon').getAttribute('class')).toContain('4xl')
        fireEvent.click(getByRole('checkbox'))
        expect(getByTestId('CheckBoxIcon').getAttribute('class')).toContain('4xl')
    })

    it('should allow custom padding change', () => {
        const { getByRole } = render(<Checkbox padding="p-2" />)

        expect(getByRole('container').className).toContain('p-2')
    })

    it('should allow onChange event', () => {
        const onChange = () => vi.mock
        const { getByRole } = render(<Checkbox onChange={onChange} />)

        fireEvent.click(getByRole('checkbox'))
        expect(getByRole('checkbox')).toHaveProperty('checked', true)
    })
})
