import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import Avatar from './Avatar'

const baseOptions = {
    src: 'https://picsum.photos/50/50',
    width: '50px',
    height: '50px',
    alt: 'Profile Photo',
    children: 'TB',
    style: { backgroundColor: 'red', width: '50px', height: '50px', color: 'white' }
}

describe('Avatar component works properly', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Avatar src={baseOptions.src} width={baseOptions.width} height={baseOptions.height} alt={baseOptions.alt} />)
    })

    afterEach(cleanup)

    it('can render', () => {
        expect(renderResult.getByRole('avatar')).toBeDefined()
        expect(renderResult.container).toBeDefined()
    })

    it('renders an image with the specifications ', () => {
        const avatar = renderResult.getByAltText(baseOptions.alt)

        /* Checking if the attributes are the same */
        expect(avatar).toBeDefined()
        expect(avatar.getAttribute('src')).toBe(baseOptions.src)

        expect(avatar.getAttribute('width')).toBe('50px')
        expect(avatar.getAttribute('height')).toBe('50px')

        expect(avatar.className).toContain('rounded-full')
    })

    it('avatar rendering without image, only with background color and children', () => {
        renderResult.rerender(
            <Avatar style={baseOptions.style} alt={baseOptions.alt}>
                {baseOptions.children}
            </Avatar>
        )
        const avatar = renderResult.getByText(baseOptions.children)

        expect(avatar).toBeDefined()
        expect(avatar.getAttribute('src')).toBeNull()

        expect(avatar.style.width).toBe('50px')
        expect(avatar.style.height).toBe('50px')
        expect(avatar.className).toContain('rounded-full')
    })
})
