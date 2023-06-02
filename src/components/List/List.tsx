import { Children, ReactNode, cloneElement } from 'react'
import { composeClasses } from 'lib/classes'
import Item, { IListItem } from './Item'
import Icon from './Icon'

export interface IList extends React.HTMLAttributes<HTMLUListElement> {
  ordered?: boolean
  gap?: number
  gapItem?: number
  prefixLabel?: string
  suffixLabel?: string
  iconColor?: string
  icon?: ReactNode
  iconSize?: number
  iconLineHeight?: number
  children: ReactNode
}

const List = ({
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
}: IList) => {
  const defaultIconSize = ordered ? 16 : 25

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
    <Wrapper
      className={composeClasses('flex flex-col list-none', props.className)}
      style={{
        gap: `${gap}px`,
        ...props.style
      }}
      {...props}
    >
      {Children.map(children, (child, index) => {
        return cloneElement(child as React.ReactElement<IListItem>, {
          icon: ordered ? `${prefixLabel}${index + 1}${suffixLabel}` : icon,
          gapItem:
            (child as React.ReactElement<IListItem>)?.props?.gapItem || gapItem,
          iconSize:
            (child as React.ReactElement<IListItem>)?.props?.iconSize ||
            iconSize ||
            defaultIconSize,
          iconLineHeight:
            (child as React.ReactElement<IListItem>)?.props?.iconLineHeight ||
            iconLineHeight,
          iconColor:
            (child as React.ReactElement<IListItem>)?.props?.iconColor ||
            iconColor
        })
      })}
    </Wrapper>
  )
}

List.Item = Item
List.Icon = Icon

export default List
