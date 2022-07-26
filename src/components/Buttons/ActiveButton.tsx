import { ReactNode } from 'react'
import { Button } from './Button'

export const ActiveButton = ({ children, active, to }: { children: ReactNode; active: boolean; to?: () => void }) => {
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
        >
            {children}
        </Button>
    )
}
