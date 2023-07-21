/*
 * Copyright (c) DD360 and its affiliates.
*/

import { ComponentType, ComponentProps } from 'react'

export interface AnchorProps extends ComponentProps<'a'> {
  to?: string
  as?: ComponentType<any>
}

export default function Anchor({
  children,
  to,
  className,
  as: LinkComponent,
  ...props
}: AnchorProps) {
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
