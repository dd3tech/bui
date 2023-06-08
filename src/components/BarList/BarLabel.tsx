import { FC, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Size } from 'interfaces'

interface IPropsBarLabel {
  children: ReactNode
  fontSizeBar?: Size
  href: string | undefined
  textBarColor?: string
}

export const BarLabel: FC<IPropsBarLabel> = ({
  children,
  fontSizeBar,
  href,
  textBarColor
}) => {
  if (href) {
    return (
      <a
        href={href}
        rel="noreferrer"
        style={{ color: textBarColor }}
        data-testid="label-link"
        className={composeClasses(
          'hover:underline',
          fontSizeBar && `text-${fontSizeBar}`
        )}
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <p
      data-testid="label-text"
      style={{ color: textBarColor }}
      className={fontSizeBar && `text-${fontSizeBar}`}
    >
      {children}
    </p>
  )
}
