import { ReactNode } from 'react'

export interface IListIcon extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

const Icon = ({ children, ...props }: IListIcon) => {
  return (
    <span role="list-icon" style={{ ...props.style }} {...props}>
      {children}
    </span>
  )
}

export default Icon
