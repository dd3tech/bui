import { FC, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Size } from '../../interfaces/types'
import Text from '../Typography/Text'
import Anchor from '../Anchor/Anchor'

export interface BarLabelProps {
  children: ReactNode
  fontSizeBar?: Size
  href?: string
  textBarColor?: string
}

export const BarLabel: FC<BarLabelProps> = ({
  children,
  fontSizeBar,
  href,
  textBarColor
}) => {
  if (href) {
    return (
      <Anchor
        to={href}
        rel="noreferrer"
        style={{ color: textBarColor }}
        data-testid="label-link"
        className={composeClasses('hover:underline', `text-${fontSizeBar}`)}
        target="_blank"
      >
        {children}
      </Anchor>
    )
  }

  return (
    <Text
      size={fontSizeBar}
      data-testid="label-text"
      style={{ color: textBarColor }}
    >
      {children}
    </Text>
  )
}
