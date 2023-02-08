import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './Button'
import Text from '../../components/Typography/Text'

describe('<Button/>', () => {
    it('should be render', () => {
        const { container } = render(<Button size="medium" />)
        expect(container.firstChild).toBeDefined()
    })

    describe('prop: disabled', () => {
        it('should render button disabled', () => {
            render(<Button disabled />)
            expect(screen.getByRole('button')).toBeDisabled()
        })

        it('should render button not disabled', () => {
            render(<Button disabled={false} />)
            expect(screen.getByRole('button')).not.toBeDisabled()
        })
    })

    describe('prop: padding', () => {
        it('should render button with padding in x', () => {
            render(<Button disabled paddingX="3" />)

            expect(screen.getByRole('button').className).toContain('px-3')
        })

        it('should render button with padding in y', () => {
            render(<Button disabled paddingY="4" />)

            expect(screen.getByRole('button').className).toContain('py-4')
        })

        it('should render button with padding 4', () => {
            render(<Button disabled padding="4" />)

            expect(screen.getByRole('button').className).toContain('p-4')
        })
    })

    describe('prop: renderLoading', () => {
        it('should render button with loading', () => {
            render(<Button disabled isLoading={true} />)
            expect(screen.getByRole('button')).toHaveTextContent('Cargando...')
        })

        it('should render button with component', () => {
            render(<Button disabled isLoading={true} renderLoading={{ component: <Text>Lorem...</Text> }} />)
            expect(screen.getByRole('button')).toHaveTextContent('Lorem...')
        })
    })
})
