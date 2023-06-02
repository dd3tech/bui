import { ReactNode } from 'react'

export interface ListIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

const Icon = ({ children, ...props }: ListIconProps) => {
  return (
    <span role="list-icon" style={{ ...props.style }} {...props}>
      {children}
    </span>
  )
}

export default Icon
