import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../../src/components'
import { it, describe, vi } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { HomeIcon, ChartBarIcon } from '@heroicons/react/outline'

const fnMocked = vi.fn()

const breadCrumbsOptions: Array<{ name: string; icon?: () => ReactNode; to(): void }> = [
    {
        name: 'Home',
        icon: () => <HomeIcon data-icon="HomeIcon" width={15} />,
        to: fnMocked
    },
    {
        name: 'Projects',
        icon: () => <HomeIcon data-icon="HomeIcon" width={15} />,
        to: fnMocked
    }
]

describe('Breadcumbs component works properly', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Breadcrumbs options={breadCrumbsOptions} />)
    })

    afterEach(cleanup)

    it('can render', () => {
        expect(renderResult.container).toBeDefined()
        breadCrumbsOptions.map((item) => {
            expect(renderResult.getByText(item.name)).toBeDefined()
        })
    })

    it('verifying the rendering of separators', () => {
        /* Checking that the number of elements with separators is equal to the number of options we are passing to it */
        expect(renderResult.container.querySelectorAll('[data-icon=ChevronRightIcon]')).toHaveLength(1)
        renderResult.rerender(
            <Breadcrumbs
                options={[
                    ...breadCrumbsOptions,
                    {
                        name: 'Sales',
                        icon: () => <ChartBarIcon data-icon="ChartBarIcon" />,
                        to: fnMocked
                    }
                ]}
            />
        )
        expect(renderResult.container.querySelectorAll('[data-icon=ChevronRightIcon]')).toHaveLength(2)
    })

    it('by passing a different separator', () => {
        renderResult.rerender(<Breadcrumbs options={breadCrumbsOptions} separator="+" />)
        expect(renderResult.getAllByText('+')).toHaveLength(1)
    })

    it('verifying that it is rendered with icons', () => {
        expect(renderResult.container.querySelectorAll('[data-icon]')).toHaveLength(3)
    })

    it('verifying that it is rendered without icons', () => {
        expect(renderResult.container.querySelectorAll('[data-icon]')).toHaveLength(3)
        breadCrumbsOptions[1] = { ...breadCrumbsOptions[1], icon: undefined }
        renderResult.rerender(<Breadcrumbs options={breadCrumbsOptions} />)
        expect(renderResult.container.querySelectorAll('[data-icon]')).toHaveLength(2)
    })

    it('verifying that the last element of the options is active', () => {
        expect(renderResult.getByText('Home').className).not.toContain('text-blue-700 font-bold')
        expect(renderResult.getByText('Projects').className).toContain('text-blue-700 font-bold')
    })
})
