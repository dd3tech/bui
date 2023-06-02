import { Children, ReactNode, cloneElement, forwardRef, useMemo } from 'react'
import { composeClasses } from 'lib/classes'
import Item, { ListItemProps } from './Item'
import Icon from './Icon'

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
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
    return cloneElement(child as React.ReactElement<ListItemProps>, {
      icon: ordered ? `${prefixLabel}${index + 1}${suffixLabel}` : icon,
      gapItem:
        (child as React.ReactElement<ListItemProps>)?.props?.gapItem || gapItem,
      iconSize:
        (child as React.ReactElement<ListItemProps>)?.props?.iconSize ||
        iconSize ||
        defaultIconSize,
      iconLineHeight:
        (child as React.ReactElement<ListItemProps>)?.props?.iconLineHeight ||
        iconLineHeight,
      iconColor:
        (child as React.ReactElement<ListItemProps>)?.props?.iconColor ||
        iconColor
    })
  })
}

const List = forwardRef<HTMLDivElement, ListProps>(
  ({
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
  }: ListProps) => {
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
    )
  }
) as ListPropsCompounded

List.Item = Item
List.Icon = Icon

export default List
