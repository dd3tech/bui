import { it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Language } from './Language'

describe('<Language/>', () => {
    it('should be render', () => {
        const { container } = render(<Language />)
        expect(container).toBeDefined()
    })

    it('should be active one of the elements', () => {
        const { getByTestId } = render(<Language data-testid="btn-lang" defaultLanguage="en" />)

        const btnLang = getByTestId('btn-lang')
        fireEvent.click(getByTestId('btn-lang'))

        const test = btnLang.getElementsByClassName('text-blue-700 uppercase mr-1')
        expect(test[0].innerHTML).toBe('ESP')
    })

    it('should call changeLanguage and getLangName functions when the component is clicked', () => {
        const onChangeLanguage = vi.fn(() => {})
        const onGetLangName = vi.fn((lan: string) => {
            return lan
        })

        const { getByTestId } = render(<Language data-testid="btn-lang" isNavbar changeLanguage={onChangeLanguage} getLangName={onGetLangName} />)

        fireEvent.click(getByTestId('btn-lang'))

        expect(onChangeLanguage).toHaveBeenCalled()
        expect(onGetLangName).toHaveBeenCalled()
    })
})
