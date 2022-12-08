import React from 'react'
import { it, describe, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { HomeIcon, ChartBarIcon } from '@heroicons/react/outline'

import { Breadcrumbs, BreadcrumbsProps } from '../../src/components'

const breadCrumbsOptions: BreadcrumbsProps['options'] = [
    {
        name: 'Home',
        icon: () => <HomeIcon data-icon="HomeIcon" width={15} />,
        to: vi.fn()
    },
    {
        name: 'Projects',
        icon: () => <HomeIcon data-icon="HomeIcon" width={15} />,
        to: vi.fn()
    }
]

describe('<Breadcumbs/>', () => {
    afterEach(cleanup)

    it('should be render', () => {
        const { container, getByText } = render(<Breadcrumbs options={breadCrumbsOptions} />)
        expect(container).toBeDefined()
        breadCrumbsOptions.map((item) => {
            expect(getByText(item.name as string)).toBeDefined()
        })
    })

    it('should be render with seperators', () => {
        const { container, rerender } = render(<Breadcrumbs options={breadCrumbsOptions} />)
        const chevRightIcon = '[data-icon=ChevronRightIcon]'

        /* Checking that the number of elements with separators is equal to the number of options we are passing to it */
        expect(container.querySelectorAll(chevRightIcon)).toHaveLength(1)

        rerender(
            <Breadcrumbs
                options={[
                    ...breadCrumbsOptions,
                    {
                        name: 'Sales',
                        icon: () => <ChartBarIcon data-icon="ChartBarIcon" />,
                        to: vi.fn()
                    }
                ]}
            />
        )

        expect(container.querySelectorAll(chevRightIcon)).toHaveLength(2)
    })

    it('should be render with custom separator', () => {
        const { getAllByText } = render(<Breadcrumbs options={breadCrumbsOptions} separator="+" />)
        expect(getAllByText('+')).toHaveLength(1)
    })

    it('should be render with icons', () => {
        const { container } = render(<Breadcrumbs options={breadCrumbsOptions} />)
        expect(container.querySelectorAll('[data-icon]')).toHaveLength(3)
    })

    it('verifying that it is rendered without icons', () => {
        breadCrumbsOptions[1] = { ...breadCrumbsOptions[1], icon: undefined }
        const { container } = render(<Breadcrumbs options={breadCrumbsOptions} />)

        expect(container.querySelectorAll('[data-icon]')).toHaveLength(2)
    })

    it('the last element of options should be render with active', () => {
        const { getByText } = render(<Breadcrumbs options={breadCrumbsOptions} />)
        expect(getByText('Home').className).not.toContain('text-blue-700 font-bold')
        expect(getByText('Projects').className).toContain('text-blue-700 font-bold')
    })

    it('when we click on an option and the to function exists, it should be executed', () => {
        breadCrumbsOptions[0].to = undefined
        const { getByText, rerender } = render(<Breadcrumbs options={breadCrumbsOptions} />)

        fireEvent.click(getByText('Home'))

        expect(breadCrumbsOptions[0].to).toBeUndefined()

        breadCrumbsOptions[0].to = vi.fn()
        rerender(<Breadcrumbs options={breadCrumbsOptions} />)

        fireEvent.click(getByText('Home'))

        expect(breadCrumbsOptions[0].to).toHaveBeenCalledTimes(1)
    })
})
