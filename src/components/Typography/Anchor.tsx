import React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string
    LinkComponent?: React.ComponentType<any>
}

export function Anchor({ children, to, className, LinkComponent }: LinkProps) {
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
