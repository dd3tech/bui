import { composeClasses } from 'lib/classes'
import { useDropdownContext } from './DropdownContext'

export interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const DropdownTrigger = ({ children, ...props }: TriggerProps) => {
  const dropdownContext = useDropdownContext()

  return (
    <button
      {...props}
      className={composeClasses('flex items-center', props.className)}
      onClick={() => dropdownContext.setToggle((prev) => !prev)}
    >
      {children}
    </button>
  )
}

export default DropdownTrigger
