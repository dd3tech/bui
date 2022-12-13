import { ReactNode } from 'react'
import Button from './Button'

export interface ActiveButtonProps {
    children: ReactNode
    active: boolean
    to?: () => void
}

const ActiveButton = ({ children, active, to, ...props }: ActiveButtonProps) => {
    return (
        <Button
            variant={active ? 'outlineBlue' : 'outline'}
            className={`${!active && 'bg-transparent border border-gray-300 text-gray-300 hover:border-blue-700 hover:text-blue-700'} text-sm`}
            paddingX={5}
            paddingY={2}
            onClick={() => {
                if (to) {
                    to()
                }
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ActiveButton
