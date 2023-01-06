import { render } from '@testing-library/react'
import { it, describe } from 'vitest'
import { CheckBoxIcon, SVGIcon, CheckBoxOutlineBlankIcon, IndeterminateCheckBoxIcon } from './icons'

describe('<SVGIcon />', () => {
    it('there is a children element', () => {
        const { getByTestId } = render(
            <SVGIcon data-testid="icon">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1"></path>
            </SVGIcon>
        )

        expect(getByTestId('icon').firstChild).toBeDefined()
    })

    describe('icons are rendered correctly', () => {
        it('<CheckBoxIcon />', () => {
            const { getByTestId } = render(<CheckBoxIcon />)

            expect(getByTestId('CheckBoxIcon')).toBeDefined()
        })

        it('<CheckBoxOutlineBlankIcon />', () => {
            const { getByTestId } = render(<CheckBoxOutlineBlankIcon />)

            expect(getByTestId('CheckBoxOutlineBlankIcon')).toBeDefined()
        })

        it('<IndeterminateCheckBoxIcon />', () => {
            const { getByTestId } = render(<IndeterminateCheckBoxIcon />)

            expect(getByTestId('IndeterminateCheckBoxIcon')).toBeDefined()
        })
    })
})
