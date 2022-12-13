import React, { forwardRef, ReactNode, FC } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'

export interface BreadcrumbsProps extends React.HTMLProps<HTMLDivElement> {
    options: Array<{ name?: string; icon?: () => ReactNode; to?: () => void }>
    separator?: any
}

export type InsertSeparatorsProps = {
    separator: BreadcrumbsProps['separator']
}

const InsertSeparators: FC<InsertSeparatorsProps> = ({ separator }: InsertSeparatorsProps) => {
    if (separator) {
        return <>{separator}</>
    }

    return <ChevronRightIcon data-icon="ChevronRightIcon" className="text-gray-500 bold" width={15} />
}

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(({ options, separator, className, ...props }: BreadcrumbsProps, ref) => {
    const isActiveLink = React.useCallback(
        (indexOfKey: number) => {
            return options.length - 1 === indexOfKey
        },
        [options]
    )

    return (
        <div className={`${className ?? ''} flex gap-4 items-center absolute`} ref={ref} {...props}>
            {options.map(({ name, icon, to }, indexKey) => (
                <React.Fragment key={`${name}-${to}-${indexKey}`}>
                    {icon && icon()}
                    <p
                        onClick={() => {
                            if (!to) return
                            to()
                        }}
                        className={`${isActiveLink(indexKey) ? 'text-blue-700 font-bold' : 'text-gray-500 font-medium'} cursor-pointer text-sm`}
                    >
                        {name && name.charAt(0).toLocaleUpperCase() + name.slice(1)}
                    </p>
                    {!isActiveLink(indexKey) && <InsertSeparators separator={separator} />}
                </React.Fragment>
            ))}
        </div>
    )
})

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
