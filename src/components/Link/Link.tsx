import React, { ReactNode } from 'react'

interface Props {
    children?: JSX.Element | JSX.Element[] | ReactNode
    to?: string
    className?: string
    LinkComponent?: React.ComponentType<any>
}

function Link({ children, to, className, LinkComponent }: Props) {
    if (LinkComponent) {
        return (
            <LinkComponent to={to} className={className}>
                {children}
            </LinkComponent>
        )
    }
    return (
        <a href={to} className={className}>
            {children}
        </a>
    )
}

export default Link
