import React from 'react'
import { it, describe, vi } from 'vitest'
import { fireEvent, prettyDOM, render } from '@testing-library/react'

import { ImageIcon, ImageIconProps } from '../../src/components'

const defaultProps: ImageIconProps = {
    src: 'https://picsum.photos/200/300.jpg',
    width: '200px',
    height: '300px',
    buttonOnClick: vi.fn()
}

function findImg(container) {
    return container.firstChild as HTMLImageElement
}

function findImgAsBtn(container) {
    return container.firstChild as HTMLButtonElement
}

describe('<Image/>', () => {
    it('should be render correctly', () => {
        const { container } = render(<ImageIcon {...defaultProps} />)
        expect(findImg(container)).toBeDefined()
    })

    it('should render with src attribute', () => {
        const { container } = render(<ImageIcon {...defaultProps} />)
        expect(findImg(container).src).toEqual('https://picsum.photos/200/300.jpg')
    })

    it('should render with height and width', () => {
        const { container } = render(<ImageIcon {...defaultProps} />)
        expect(findImg(container).getAttribute('height')).toEqual('300px')
        expect(findImg(container).getAttribute('width')).toEqual('200px')
    })

    describe('as Button', () => {
        it('should default button is false', () => {
            const { container } = render(<ImageIcon {...defaultProps} />)
            expect(findImg(container).tagName).toEqual('IMG')
        })

        it('should render as button', () => {
            const { container } = render(<ImageIcon {...defaultProps} button />)
            expect(findImgAsBtn(container).tagName).toEqual('BUTTON')
        })

        it('should render with an onClick function', () => {
            const { container } = render(<ImageIcon {...defaultProps} button />)
            fireEvent.click(findImgAsBtn(container))
            expect(defaultProps.buttonOnClick).toHaveBeenCalledTimes(1)
        })

        it('should render with a classNameButton', () => {
            const { container } = render(<ImageIcon {...defaultProps} button classNameButton="standar-class" />)
            expect(findImgAsBtn(container).className).toContain('standar-class')
        })
    })
})
