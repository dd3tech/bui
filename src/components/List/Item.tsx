/*
 * Copyright (c) DD360 and its affiliates.
 */

import { Children, ReactNode, isValidElement } from 'react'
import Icon, { ListIconProps } from './Icon'
import { composeClasses } from 'lib/classes'

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Specifies the icon element to be displayed in the list item. This can be a character,
   * emoji, or any valid React node. The default value is a bullet point ('•').
   * It could be replaced by the List.Icon component used inside the List.Item.
   * If both are provided, the List.Icon component will be used.
   */
  icon?: ReactNode
  /**
   * Specifies the color of the icon. This can be any valid CSS color value. Default value is black ('#000').
   */
  iconColor?: string
  /**
   * Specifies the gap between the icon and the content of the list item in pixels.
   * Default value is 0px.
   */
  gapItem?: number
  /**
   * Specifies the size of the icon in pixels. Default value is 16px for an order list and 25px for an unorder list.
   */
  iconSize?: number
  /**
   * Specifies the line height of the icon in pixels. Default value is 25px.
   */
  iconLineHeight?: number
  /**
   * The content of the list item. This could be plain text, html element or a custom element. If you want to use a custom
   * icon, you should use the List.Icon component inside de List.Item before the content.
   */
  children: ReactNode
}

const Item = ({
  children,
  gapItem,
  icon,
  iconColor,
  iconSize,
  iconLineHeight,
  ...props
}: ListItemProps) => {
  let listIcon: React.ReactElement<ListIconProps> | null = null

  const renderedChildren = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child as React.ReactElement<ListIconProps>)?.type === Icon
    ) {
      listIcon = child as React.ReactElement<ListIconProps>
      return null
    }
    return child
  })

  return (
    <li
      role="list-item"
      className={composeClasses('flex', props.className)}
      style={{ gap: `${gapItem}px`, ...props.style }}
    >
      <span
        style={{
          color: iconColor,
          fontSize: `${iconSize}px`,
          lineHeight: `${iconLineHeight}px`
        }}
        className="w-5 flex-shrink-0 flex items-start justify-center text-center"
      >
        {listIcon ? listIcon : icon}
      </span>
      <span>{renderedChildren}</span>
    </li>
  )
}

export default Item
