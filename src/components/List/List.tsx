/*
 * Copyright (c) DD360 and its affiliates.
*/

import { Children, ReactNode, cloneElement, forwardRef, useMemo } from 'react'
import { composeClasses } from 'lib/classes'
import Item, { ListItemProps } from './Item'
import Icon from './Icon'

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Specifies whether the list should be ordered (numbered)
   * or unordered (bulleted). Default value is false (unordered).
   */
  ordered?: boolean
  /**
   * Specifies the gap between list items in pixels. Default value is 5px.
   */
  gap?: number
  /**
   * Specifies the gap between the icon and the content of each list item in pixels.
   * Default value is 0px.
   */
  gapItem?: number
  /**
   * Specifies the label to be displayed before each list number in an order list. Default value is an empty string ('').
   */
  prefixLabel?: string
  /**
   * Specifies the label to be displayed after each list item. Default value is a dot ('.').
   */
  suffixLabel?: string
  /**
   * Specifies the color of the icon. This can be any valid CSS color value. Default value is black ('#000').
   */
  iconColor?: string
  /**
   * Specifies the icon element to be displayed before each list item. This can be a character,
   * emoji, or any valid React node. The default value is a bullet point ('•').
   * It could be replaced by the List.Icon component used inside the List.Item.
   * If both are provided, the List.Icon component will be used.
   */
  icon?: ReactNode
  /**
   * Specifies the size of the icon in pixels. Default value is 16px for an order list and 25px for an unorder list.
   */
  iconSize?: number
  /**
   * Specifies the line height of the icon in pixels. Default value is 25px.
   */
  iconLineHeight?: number
  /**
   * The content of the list component. This should be a List.Item component.
   */
  children: ReactNode
}

export interface ListPropsCompounded
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof Item
  Icon: typeof Icon
}

const processChildren = (
  children: ReactNode,
  ordered?: boolean,
  prefixLabel?: string,
  suffixLabel?: string,
  gapItem?: number,
  icon?: ReactNode,
  iconSize?: number,
  defaultIconSize?: number,
  iconLineHeight?: number,
  iconColor?: string
) => {
  return Children.map(children, (child, index) => {
    const listItemElement = child as React.ReactElement<ListItemProps>
    return cloneElement(listItemElement, {
      icon: ordered ? `${prefixLabel}${index + 1}${suffixLabel}` : icon,
      gapItem: listItemElement?.props?.gapItem || gapItem,
      iconSize: listItemElement?.props?.iconSize || iconSize || defaultIconSize,
      iconLineHeight: listItemElement?.props?.iconLineHeight || iconLineHeight,
      iconColor: listItemElement?.props?.iconColor || iconColor
    })
  })
}

const List = forwardRef<HTMLDivElement, ListProps>(
  (
    {
      ordered,
      gap = 5,
      gapItem = 0,
      prefixLabel = '',
      suffixLabel = '.',
      iconColor = '#000',
      icon = '•',
      iconSize,
      iconLineHeight = 25,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIconSize = useMemo(() => {
      return ordered ? 16 : 25
    }, [ordered])

    const Wrapper = ({ children, ...props }: { children: ReactNode }) => {
      return ordered ? (
        <ol role="order-list" {...props}>
          {children}
        </ol>
      ) : (
        <ul role="unorder-list" {...props}>
          {children}
        </ul>
      )
    }

    return (
      <div ref={ref}>
        <Wrapper
          className={composeClasses('flex flex-col list-none', props.className)}
          style={{
            gap: `${gap}px`,
            ...props.style
          }}
          {...props}
        >
          {processChildren(
            children,
            ordered,
            prefixLabel,
            suffixLabel,
            gapItem,
            icon,
            iconSize,
            defaultIconSize,
            iconLineHeight,
            iconColor
          )}
        </Wrapper>
      </div>
    )
  }
) as ListPropsCompounded

List.Item = Item
List.Icon = Icon

export default List
