/*
 * Copyright (c) DD360 and its affiliates.
 */

import { CSSProperties, FC } from 'react'
import { composeClasses } from 'lib/classes'
import { Size } from '../../interfaces/types'
import Text from '../Typography'
import Anchor from '../Anchor/Anchor'

export interface LabelProps {
  /**
   * Represents the label or title for a specific item in the `listData` property of `BarList`.
   */
  label: string
  /**
   * Defines the URL of a hyperlink that wraps the bar tag for a specific item in the `listData` property of `BarList`.
   */
  href?: string
  /**
   * Sets the color of the text in the bar label for a specific item in the `listData` property of `BarList`.
   */
  textBarColor?: CSSProperties['color']
}

export interface BarLabelProps extends LabelProps {
  /**
   * Allows to pass a value from the `Size` enumeration to set the font size of the text in the bar labels. The default value is ``base``.
   */
  size?: Size
}

const BarLabel: FC<BarLabelProps> = ({ label, size, href, textBarColor }) => {
  if (href) {
    return (
      <Anchor
        to={href}
        rel="noreferrer"
        style={{ color: textBarColor }}
        data-testid="label-link"
        className={composeClasses('hover:underline', size && `text-${size}`)}
        target="_blank"
      >
        {label}
      </Anchor>
    )
  }

  return (
    <Text size={size} data-testid="label-text" style={{ color: textBarColor }}>
      {label}
    </Text>
  )
}

export default BarLabel
