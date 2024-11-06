export interface HeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   *  Header content
   */
  children?: React.ReactNode
}

const Header = (props: HeaderProps) => {
  return <thead {...props}>{props.children}</thead>
}

export default Header
