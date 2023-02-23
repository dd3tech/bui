import { composeClasses } from 'lib/classes'
import { StyleObject } from 'lib/styles'
import { useDropdownContext } from './DropdownContext'

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
    const dropdownContext = useDropdownContext()

    const animation = {
        transition: 'all 0.2s ease-out',
        transform: dropdownContext.toggle ? 'scale(1) translateY(0)' : 'scale(0) translateY(-15px)'
    }

    const styleBase: StyleObject = {
        visibility: dropdownContext.toggle ? 'visible' : 'hidden'
    }

    return (
        <div style={dropdownContext.disableAnimation ? styleBase : { ...styleBase, ...animation }}>
            <div {...props} className={composeClasses('absolute mt-2 right-0 w-64 bg-white border shadow-lg z-20 py-1 rounded-xl', props.className)}>
                {children}
            </div>
        </div>
    )
}

export default DropdownMenu
