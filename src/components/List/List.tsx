import { Children, ReactNode, cloneElement, isValidElement } from 'react'
import { composeClasses } from 'lib/classes'

interface IList extends React.HTMLAttributes<HTMLUListElement> {
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

interface IListItem extends React.HTMLAttributes<HTMLLIElement> {
  icon?: ReactNode
  iconColor?: string
  gapItem?: number
  iconSize?: number
  iconLineHeight?: number
  children: ReactNode
}

interface IListIcon extends React.HTMLAttributes<HTMLSpanElement> {
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

const Item = ({
  children,
  gapItem,
  icon,
  iconColor,
  iconSize,
  iconLineHeight,
  ...props
}: IListItem) => {
  let listIcon: React.ReactElement<IListIcon> | null = null

  const renderedChildren = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child as React.ReactElement<IListIcon>)?.type === List.Icon
    ) {
      listIcon = child as React.ReactElement<IListIcon>
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

const Icon = ({ children, ...props }: IListIcon) => {
  return (
    <span role="list-icon" style={{ ...props.style }} {...props}>
      {children}
    </span>
  )
}

List.Item = Item
List.Icon = Icon

export default List
