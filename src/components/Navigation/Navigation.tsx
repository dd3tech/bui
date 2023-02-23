import React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string
    LinkComponent?: any
}

export function Anchor({ children, to, className, LinkComponent, ...props }: LinkProps) {
    if (LinkComponent) {
        return (
            <LinkComponent to={to} className={className} {...props}>
                {children}
            </LinkComponent>
        )
    }

    return (
        <a href={to} className={className} {...props}>
            {children}
        </a>
    )
}
