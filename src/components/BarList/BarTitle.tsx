import { FC, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Size } from 'interfaces'

interface IPropsTitleBar {
  children: ReactNode
  fontSizeBar?: Size
  href: string | undefined
  textBarColor?: string
}

export const TitleBar: FC<IPropsTitleBar> = ({
  children,
  fontSizeBar,
  href,
  textBarColor = '#1D4ED8'
}) => {
  if (href) {
    return (
      <a
        href={href}
        rel="noreferrer"
        style={{ color: textBarColor }}
        data-testid="title-link"
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
      data-testid="title-text"
      style={{ color: textBarColor }}
      className={fontSizeBar && `text-${fontSizeBar}`}
    >
      {children}
    </p>
  )
}
