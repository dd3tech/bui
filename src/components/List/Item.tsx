import { Children, ReactNode, isValidElement } from 'react'
import { IListIcon } from './Icon'
import List from './List'
import { composeClasses } from 'lib/classes'

export interface IListItem extends React.HTMLAttributes<HTMLLIElement> {
  icon?: ReactNode
  iconColor?: string
  gapItem?: number
  iconSize?: number
  iconLineHeight?: number
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

export default Item
